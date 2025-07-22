"use client";

import React from "react";

const ToTranslate = ({
  userText,
  setUserText,
  onTranslate,
  sourceLanguage,
  items,
}: {
  userText: string;
  setUserText: (val: string) => void;
  sourceLanguage: string;
  onTranslate: () => void;
  items: { code: string; name: string }[];
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onTranslate();
    }
  };

  const selectedSourceLang = items.find(item => item.code === sourceLanguage);

  return (
    <div className="card p-6 w-full flex flex-col gap-0 h-[350px]">
      <div className="mb-4 pt-6 pb-8 text-md text-green">
          <span className="text-[color:var(--accent-400)]">Source language:{selectedSourceLang ? ` ${selectedSourceLang.name}` : sourceLanguage}</span>
      </div>
      <textarea
        name="user_input"
        value={userText?.charAt(0).toUpperCase() + userText?.slice(1)}
        onChange={(e) => setUserText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your text here..."
        maxLength={500}
        className="border border-gray-300 rounded-md p-3 min-h-[200px] resize-none focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />
      <div className="mb-4 pt-6 pb-8 text-md text-green">
        <span>{`${userText.length}/500`}</span>
      </div>
    </div>
    
  );
};

export default ToTranslate;