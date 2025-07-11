import React, {MouseEventHandler, ReactNode, forwardRef}from 'react'
import { ChevronDown, ChevronUp} from "lucide-react";

interface DropdownButtonProps {
  children: ReactNode;
  toggle: MouseEventHandler<HTMLDivElement>;
  open: boolean;
}
  

const DropdownButton = forwardRef<HTMLDivElement, DropdownButtonProps>(
  ({ children, toggle, open }, ref) => {
    return (
      <div
        onClick={toggle}
        className={`card flex items-center w-fit py-2 px-4  gap-2 bg-inherit rounded-lg shadow-[0px_8px_24px_rgba(149,157,165,0.2)] cursor-pointer ${open ? 'border-2 border-green-300' : ''}`}
        ref={ref}
      >
        {children}
        <span className="flex items-center justify-center ml-4">
          {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
    );
  }
);


DropdownButton.displayName = "DropdownButton";
export default DropdownButton;


