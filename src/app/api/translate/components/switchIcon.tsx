import React from "react";
import { ArrowLeftRight } from 'lucide-react';

const SwitchIcon = (
    ({
        translated_text,
        onClick,
        userText,
      }: {
        translated_text: string;
        onClick: () => void;
        userText: string;
      }) =>{
    return (
        <button 
            onClick={onClick}
            className="rounded-full bg-primary-200 p-4"
            style={{ position: 'relative', zIndex: 10 }}>
            <ArrowLeftRight size={32} color="hsl(93, 60%, 69%)" strokeWidth={2.25} absoluteStrokeWidth />
        </button>
        
      );
});

export default SwitchIcon;
