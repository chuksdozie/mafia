import React from "react";

interface AppCtaBtnProps extends React.HTMLAttributes<HTMLButtonElement> {}

const AppCtaBtn = ({ className, ...props }: AppCtaBtnProps) => {
  return (
    <button
      className={`h-9 rounded-3xl bg-accent700 text-[#0355C9] text-[0.9375rem] font-semibold px-7 ${className}`}
      {...props}
    />
  );
};

export default AppCtaBtn;
