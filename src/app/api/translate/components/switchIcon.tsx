import React from "react";
import { ArrowLeftRight } from 'lucide-react';

const SwitchIcon = ({ onClick }: { onClick: () => void }) => {
    return (
        <button className="rounded-full bg-primary-200 p-4">
            <ArrowLeftRight size={32} color="hsl(93, 60%, 69%)" strokeWidth={2.25} absoluteStrokeWidth />
        </button>
        
      );
};

export default SwitchIcon;
