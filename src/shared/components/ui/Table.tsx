import { cn } from "@shared/utils/cn";
import type { ComponentProps, ReactNode } from "react";
import { Spinner } from "./Spinner";

export type TableColumn = {
	key: string;
	label: string;
};

export function Table({ className, ...props }: ComponentProps<"table">) {
	return (
		<div className="overflow-x-auto rounded-xl border border-border">
			<table className={cn("min-w-full text-sm", className)} {...props} />
		</div>
	);
}

type TableHeaderProps = {
	columns: readonly TableColumn[];
};

export function TableHeader({ columns }: TableHeaderProps) {
	return (
		<thead className="border-border border-b">
			<tr className="text-xs">
				{columns.map((column) => (
					<th
						key={column.key}
						scope="col"
						className="px-5 py-3 text-start font-medium text-muted-foreground"
					>
						{column.label}
					</th>
				))}
			</tr>
		</thead>
	);
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
	return (
		<tbody className={cn("divide-y divide-border", className)} {...props} />
	);
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
	return <tr className={cn("hover:bg-muted/50", className)} {...props} />;
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
	return <td className={cn("px-5 py-4", className)} {...props} />;
}

type TableMessageRowProps = {
	colSpan: number;
	children: ReactNode;
};

export function TableMessageRow({ colSpan, children }: TableMessageRowProps) {
	return (
		<tr>
			<td colSpan={colSpan} className="p-5 text-center text-muted-foreground">
				{children}
			</td>
		</tr>
	);
}

type TableLoadingRowProps = {
	colSpan: number;
};

export function TableLoadingRow({ colSpan }: TableLoadingRowProps) {
	return (
		<TableMessageRow colSpan={colSpan}>
			<Spinner />
		</TableMessageRow>
	);
}
