import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

export default function Input({
  name,
  label,
  placeholder,
  className,
  ...rest
}: InputProps) {
  return (
    <div className={"flex flex-col" + " " + className}>
      <label htmlFor={name}>{label}</label>

      <input
        className="px-2 py-1 rounded outline-0"
        name={name}
        id={name}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
