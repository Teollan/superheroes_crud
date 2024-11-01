import { InputHTMLAttributes } from "react";

type ImageInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  onFileSelect?: (image: File) => void;
};

export default function ImageInput({
  name,
  label,
  className,
  onFileSelect = () => {},
  ...rest
}: ImageInputProps) {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className={"flex flex-col" + " " + className}>
      <label htmlFor={name}>{label}</label>

      <input
        type="file"
        onChange={handleFileInput}
        className="px-2 py-1 rounded outline-0"
        name={name}
        id={name}
        {...rest}
      />
    </div>
  );
}
