import {forwardRef, ReactNode} from 'react'

type DropdownContentProps = {
    children: ReactNode;
    open: boolean;
    top?: number;
  };

  const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
    ({ children, open, top }, ref) => {
      if (!open) return null;
      return (
        <div
        className={`absolute min-w-full flex flex-col items-center p-4 mt-2 bg-inherit rounded-lg shadow-[0px_8px_24px_rgba(149,157,165,0.2)] max-h-[40vh] overflow-y-auto`} // <-- use overflow-y-auto
        style={{ top: top !== undefined ? `${top}px` : "100%" }}
        ref={ref}
        >
          {children}
        </div>
      );
    }
  );
  
  DropdownContent.displayName = "DropdownContent";
  
  export default DropdownContent;
