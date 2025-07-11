import { ReactNode, MouseEventHandler } from "react";

interface DropdownItemProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  selected?: boolean;
}

const DropdownItem = ({ children, onClick,selected }: DropdownItemProps) => {
  return (
    <div 
    className={`
      w-full px-4 py-2 cursor-pointer rounded-md
      transition
      ${selected
        ? "border-2 border-green-400 bg-green-50"
        : "border border-transparent hover:text-green-700 hover:border-green-300 hover:bg-green-50"}
    `}
    onClick={onClick}>
      {children}
    </div>
  );
};

export default DropdownItem;
