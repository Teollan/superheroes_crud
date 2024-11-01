import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  preset: "good" | "bad";
};

export default function TextButton({
  className,
  preset,
  children,
  ...rest
}: TextButtonProps) {
  const commonClasses =
    "rounded px-2 py-1 w-max disabled:text-slate-400 transition-colors";

  const goodPresetClasses =
    "bg-green-300 hover:bg-green-500 disabled:bg-green-300";

  const badPresetClasses = "bg-red-300 hover:bg-red-500 disabled:bg-red-300";

  return (
    <button
      className={cn(commonClasses, className, {
        [goodPresetClasses]: preset === "good",
        [badPresetClasses]: preset === "bad",
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
