"use client"

import { useEffect, useState, useRef } from "react";
import DropdownButton from '../DropdownButton/DropdownButton'
import DropdownContent from '../DropdownContent/DropdownContent'

type DropdownProps = {
  buttonText: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  content: React.ReactNode;
  };


const Dropdown = ({ buttonText, open, setOpen, content }: DropdownProps) => {

  //  const [open, setOpen] = useState(false);
   const [dropdownTop, setDropdownTop] = useState<number | undefined>(undefined);

   const dropdownRef = useRef<HTMLDivElement>(null);
   const buttonRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
      if (!open && buttonRef.current && contentRef.current) {
        const spaceRemaining =
          window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
        const contentHeight = contentRef.current.clientHeight;
  
        const topPosition =
        spaceRemaining > contentHeight ? undefined : -(contentHeight - spaceRemaining);
        setDropdownTop(topPosition ?? undefined);
      }
  
      setOpen(!open);
    };

    useEffect(() => {
      const handler = (event: Event) => {
        if (
          dropdownRef.current &&
          event.target instanceof Node &&
          !dropdownRef.current.contains(event.target)
        ) {
          setOpen(false);
        }
      };
    
      document.addEventListener("click", handler);
    
      return () => {
        document.removeEventListener("click", handler);
      };
    }, [setOpen]);



  return (
    <div ref={dropdownRef} className="relative">
    <DropdownButton ref={buttonRef} toggle={toggleDropdown} open={open}>
      {buttonText}
    </DropdownButton>
    <DropdownContent top={dropdownTop ?? undefined} ref={contentRef} open={open}>
      {content}
    </DropdownContent>
  </div>
  )
}

export default Dropdown
