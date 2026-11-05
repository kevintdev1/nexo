import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	type StudentFormValues,
	type StudentInput,
	studentSchema,
} from "../schemas/students.schema";

type StudentFormOptions = {
	defaultValues: StudentFormValues;
	submit: (input: StudentInput) => Promise<boolean>;
	onDone: () => void;
};

export type StudentFormController = ReturnType<typeof useStudentForm>;

export function useStudentForm({
	defaultValues,
	submit,
	onDone,
}: StudentFormOptions) {
	const form = useForm<StudentFormValues, unknown, StudentInput>({
		resolver: zodResolver(studentSchema),
		defaultValues,
	});

	const close = () => {
		form.reset();
		onDone();
	};

	const onSubmit = form.handleSubmit(async (input) => {
		if (await submit(input)) close();
	});

	return {
		register: form.register,
		errors: form.formState.errors,
		isSubmitting: form.formState.isSubmitting,
		onSubmit,
		close,
	};
}
