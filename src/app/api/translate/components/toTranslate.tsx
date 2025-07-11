"use client";

import { useState} from "react";
import React from "react";
import Dropdown from "./Dropdown/Dropdown";


const ToTranslate = ({
  userText,
  setUserText,
  onTranslate,
  sourceLanguage,
}: {
  userText: string;
  setUserText: (val: string) => void;
  sourceLanguage: string;
  onTranslate: () => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onTranslate();
    }
  };

  return (
    <div className="card p-6 w-full flex flex-col gap-0 h-[350px]">
      <div className="mb-4 pt-6 pb-8 text-md text-green">
          <span className="text-[color:var(--accent-400)]">Source language:{sourceLanguage ? ` ${sourceLanguage}` : ""}</span>
      </div>
      <textarea
        name="user_input"
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 rounded-md p-3 min-h-[200px] resize-none focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />
    </div>
  );
};

export default ToTranslate;