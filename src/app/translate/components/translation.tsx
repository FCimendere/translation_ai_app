"use client";
// This file is a React component that displays the translated text in a textarea.
import React, { useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import DropdownItem from "./DropdownItem/DropdownItem";


const Translation = ({
  translated_text,
  targetLanguage,
  setTargetLanguage,
  onTranslate,
  userText,
  items
}: {
  translated_text: string;
  targetLanguage: string;
  setTargetLanguage: (code: string) => void;
  onTranslate: () => void;
  userText: string;
  items: { code: string; name: string }[];
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (code: string) => {
    setTargetLanguage(code);
    if (userText.trim()) {
      onTranslate();
    }
    setDropdownOpen(false);
  };

  const selectedLang = items.find((item) => item.code === targetLanguage);
 

  return (
    <div className="card p-6 w-full flex flex-col gap-2 h-[350px]">
      <div className="flex flex-row gap-4 px-2 py-2 items-center">
        <span className="text-[color:var(--accent-400)]">Language: </span>
        <Dropdown
          buttonText={selectedLang ? selectedLang.name : "Select Language"}
          open={dropdownOpen}
          setOpen={setDropdownOpen}
          content={
            <>
              {items.map((item) => (
                <DropdownItem
                  key={item.code}
                  onClick={() => handleSelect(item.code)}
                  selected={item.code === targetLanguage}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </>
          }
        />
      </div>
      <textarea
        value={translated_text?.charAt(0).toUpperCase() + translated_text?.slice(1)}
        readOnly
        placeholder="Translation"
        maxLength={500}
        className="border border-gray-300 rounded-md p-4 min-h-[200px] resize-none focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />
      <div className="mb-4 pt-6 pb-8 text-md text-green">
        <span>{`${translated_text.length}/500`}</span>
      </div>
    </div>
  );
};

export default Translation;
