import React from 'react';

type ButtonProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
};

const CustomButton = ({ icon, children, onClick,isActive = false }: ButtonProps) => {
  return (
    <button
      className={`card py-2 px-4 border rounded-md transition-colors ${
        isActive
          ? "bg-blue-50 border-[color:var(--accent-400)] text-[color:var(--accent-400)]"
          : "hover:bg-blue-100 border-transparent"
      }`}
      onClick={onClick}
    >
      <span className="flex flex-row gap-4 px-10 items-center">
        {icon}
        {children}
      </span>
    </button>
  );
};

export default CustomButton;

