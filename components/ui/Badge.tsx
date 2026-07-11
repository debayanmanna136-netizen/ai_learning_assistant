import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "indigo" | "emerald" | "amber" | "slate" | "purple";
}

export function Badge({
  className = "",
  variant = "slate",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    indigo: "bg-indigo-50 text-indigo-800 border-indigo-200",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    slate: "bg-slate-100 text-slate-800 border-slate-200",
    purple: "bg-purple-50 text-purple-800 border-purple-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
