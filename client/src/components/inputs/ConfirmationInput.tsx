import { ReactNode, useState } from "react";
import Input from "./Input";
import TextButton from "../buttons/TextButton";

type ConfirmationInputProps = {
  name: string;
  label?: string;

  confirm?: ReactNode;
  onConfirm?: (value: string) => void;
  clear?: ReactNode;
  onClear?: () => void;
};

export default function ConfirmationInput({
  name,
  label,

  confirm = <span>Confirm</span>,
  onConfirm = () => {},
  clear = <span>Clear</span>,
  onClear = () => {},
}: ConfirmationInputProps) {
  const [value, setValue] = useState("");

  const handleConfirm = () => {
    onConfirm(value);
    setValue("");
  };

  const handleClear = () => {
    onClear();
    setValue("");
  };

  return (
    <div className="flex flex-row gap-4 items-end">
      <Input
        className="flex-grow"
        name={name}
        label={label}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <TextButton
        preset="good"
        type="button"
        onClick={handleConfirm}
        disabled={!value}
      >
        {confirm}
      </TextButton>

      <TextButton preset="bad" type="button" onClick={handleClear}>
        {clear}
      </TextButton>
    </div>
  );
}
