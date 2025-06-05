import React from "react";

interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const EmailInput = ({ className, ...props }: DefaultInputProps) => {
  return (
    <input
      className={`h-12 rounded-3xl bg-gray-100 text-brand900 text-xs font-extraLight px-6 ${className}`}
      {...props}
    />
  );
};

export default EmailInput;
