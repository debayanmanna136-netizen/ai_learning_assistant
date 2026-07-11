import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
}

export function Card({
  className = "",
  variant = "default",
  children,
  ...props
}: CardProps) {
  const baseStyles =
    "rounded-2xl border border-slate-200/80 bg-white text-slate-900 transition-all duration-200";

  const variants = {
    default: "shadow-sm",
    elevated: "shadow-md shadow-slate-100",
    interactive:
      "shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
