import React from "react";

interface Props {
	for: string;
	label: string;
	value: string;
	type: string;
	change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<Props> = (props) => {
	return (
		<div className="col">
			<label htmlFor={props.for}>{props.label}</label>
			<input
				type={props.type}
				name={props.for}
				className="w-72"
				value={props.value}
				onChange={(e) => props.change(e)}
				autoComplete="off"
			/>
		</div>
	);
};

export default FormInput;
