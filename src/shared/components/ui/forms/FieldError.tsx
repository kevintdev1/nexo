type FieldErrorProps = {
	id: string;
	message?: string;
};

export function FieldError({ id, message }: FieldErrorProps) {
	return (
		<p id={id} role="alert" className="min-h-5 text-danger text-xs">
			{message}
		</p>
	);
}
