import React from 'react';

type ButtonProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};

const CustomButton = ({ icon, children, onClick }: ButtonProps) => {
  return (
    <button className="card py-2 hover:bg-blue-100" onClick={onClick}>
      <span className="flex flex-row gap-4 px-10 items-center">
        {icon}
        {children}
      </span>
    </button>
  );
};

export default CustomButton;

