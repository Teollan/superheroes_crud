import { ReactNode } from "react";
import Button from "../buttons";

type DataTokenProps = {
  children: ReactNode;
  onRemove?: () => void;
};

export default function DataToken({ onRemove, children }: DataTokenProps) {
  return (
    <div className="flex flex-row items-center gap-2 bg-cyan-500 rounded w-max px-2 py-1">
      {children}
      <Button.Icon onClick={onRemove}>
        <i className="fa fa-close" />
      </Button.Icon>
    </div>
  );
}
