import React from "react";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	onSubmit: (data: Record<string, FormDataEntryValue>) => void;
};

export function Form({ onSubmit, children, ...rest }: FormProps) {
	return (
		<form
			{...rest}
			onSubmit={(e) => {
				e.preventDefault();
				const fd = new FormData(e.currentTarget);
				const data: Record<string, FormDataEntryValue> = {};
				fd.forEach((v, k) => (data[k] = v));
				onSubmit(data);
			}}
		>
			{children}
		</form>
	);
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export function Input({ label, className, ...rest }: InputProps) {
	return (
		<label className="flex flex-col gap-1">
			{label && <span>{label}</span>}
			<input {...rest} className={`border rounded px-3 py-2 ${className ?? ""}`} />
		</label>
	);
}
