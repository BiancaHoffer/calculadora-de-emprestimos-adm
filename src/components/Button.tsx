import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<'button'> {
  title?: string;
  variant?: "blue" | "whatsapp" | "gray";
  icon?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = "blue",
  icon = false,
  title,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`
    ${variant == "blue" && "bg-primary"}
    ${variant == "whatsapp" && "bg-[#29A71A]"}
    ${variant == "gray" && "bg-zinc-400"}
    w-full max-w-[320px] rounded-md shadow-lg transition-all p-3 text-white font-medium hover:opacity-90 disabled:cursor-not-allowed  disabled:bg-[#69af6e74]
    `}
      {...props}
    >
      <div className="flex items-center justify-center ">
        {title}
        {children}
      </div>
    </button>
  )
}