import React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export interface AlertProps {
  variant?: "error" | "success" | "info";
  title?: string;
  children: React.ReactNode;
}

export function Alert({ variant = "info", title, children }: AlertProps) {
  const styles = {
    error: "bg-red-50 border-red-200 text-red-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
    info: "bg-indigo-50/80 border-indigo-200 text-indigo-900",
  };

  const icons = {
    error: <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />,
    info: <Info className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />,
  };

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 shadow-sm ${styles[variant]}`}
    >
      {icons[variant]}
      <div className="flex-1 text-sm">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
