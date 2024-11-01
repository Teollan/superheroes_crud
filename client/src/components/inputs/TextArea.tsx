import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  placeholder?: string;
};

export default function TextArea({
  name,
  label,
  placeholder,
  className,
  ...rest
}: TextAreaProps) {
  return (
    <div className={"flex flex-col" + " " + className}>
      <label htmlFor={name}>{label}</label>

      <textarea
        className="px-2 py-1 rounded outline-0"
        name={name}
        id={name}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
