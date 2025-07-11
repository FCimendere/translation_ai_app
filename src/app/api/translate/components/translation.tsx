"use client";
// This file is a React component that displays the translated text in a textarea.
import React, { useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import DropdownItem from "./DropdownItem/DropdownItem";

const items = [
  { code: "en", name: "English" },
  { code: "zh", name: "Chinese (Mandarin)" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
  { code: "bn", name: "Bengali" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "ur", name: "Urdu" },
  { code: "id", name: "Indonesian" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "sw", name: "Swahili" },
  { code: "mr", name: "Marathi" },
  { code: "te", name: "Telugu" },
  { code: "tr", name: "Turkish" },
  { code: "vi", name: "Vietnamese" },
  { code: "ko", name: "Korean" },
  { code: "ta", name: "Tamil" },
  { code: "it", name: "Italian" },
  { code: "fa", name: "Persian (Farsi)" },
  { code: "jv", name: "Javanese" },
  { code: "pl", name: "Polish" },
  { code: "nl", name: "Dutch" },
  { code: "uk", name: "Ukrainian" },
  { code: "ro", name: "Romanian" },
  { code: "el", name: "Greek" },
  { code: "sv", name: "Swedish" },
  { code: "hu", name: "Hungarian" },
];

const Translation = ({
  translated_text,
  targetLanguage,
  setTargetLanguage,
  onTranslate,
  userText,
}: {
  translated_text: string;
  targetLanguage: string;
  setTargetLanguage: (code: string) => void;
  onTranslate: () => void;
  userText: string;
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
        value={translated_text}
        readOnly
        className="border border-gray-300 rounded-md p-3 min-h-[200px] resize-none focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />
    </div>
  );
};

export default Translation;
