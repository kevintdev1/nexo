import {
	type QueryKey,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

type OptimisticListMutationOptions<TItem, TVariables> = {
	queryKey: QueryKey;
	mutationFn: (variables: TVariables) => Promise<void>;
	updateList: (items: readonly TItem[], variables: TVariables) => TItem[];
};

export function useOptimisticListMutation<TItem, TVariables>({
	queryKey,
	mutationFn,
	updateList,
}: OptimisticListMutationOptions<TItem, TVariables>) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onMutate: async (variables: TVariables) => {
			await queryClient.cancelQueries({ queryKey });
			const previousItems = queryClient.getQueryData<TItem[]>(queryKey);
			queryClient.setQueryData<TItem[]>(queryKey, (items = []) =>
				updateList(items, variables),
			);
			return { previousItems };
		},
		onError: (_error, _variables, context) => {
			queryClient.setQueryData(queryKey, context?.previousItems);
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey });
		},
	});
}
