import { ButtonHTMLAttributes } from "react";

type RemoveButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function RemoveButton({
  children,
  className,
  ...rest
}: RemoveButtonProps) {
  return (
    <button
      className={
        "flex flex-row justify-center items-center rounded-full transition-colors hover:bg-slate-400 disabled:text-gray-500 min-w-[30px] min-h-[30px]" +
        " " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}
