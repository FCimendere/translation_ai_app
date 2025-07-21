import React, { useState } from "react";
import { ArrowLeftRight, ArrowRightLeft } from "lucide-react";

interface SwitchIconProps {
  onClick: () => void;
  isRight: boolean;
}

const SwitchIcon: React.FC<SwitchIconProps> = ({ onClick, isRight }) => {
  const [rotated, setRotated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setRotated(!rotated);
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 400);
  };

  const transformStyle = `
    ${rotated ? "rotate(180deg)" : "rotate(0deg)"}
    ${isAnimating ? " scale(1.1)" : ""}
  `;

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-primary-200 p-4 transition-transform duration-500 ease-in-out"
      style={{
        position: "relative",
        zIndex: 10,
        transform: transformStyle,
      }}
      aria-label="Swap languages"
    >
      {isRight ? (
        <ArrowLeftRight
          size={32}
          color="hsl(93, 60%, 69%)"
          strokeWidth={2.25}
          absoluteStrokeWidth
        />
      ) : (
        <ArrowRightLeft
          size={32}
          color="hsl(93, 60%, 69%)"
          strokeWidth={2.25}
          absoluteStrokeWidth
        />
      )}
    </button>
  );
};

export default SwitchIcon;
