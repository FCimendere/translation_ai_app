"use client";

import React, { useState, useEffect } from "react";
import ToTranslate from "@/app/api/translate/components/toTranslate";
import Translation from "@/app/api/translate/components/translation";
import SwitchIcon from "@/app/api/translate/components/switchIcon";
import CustomButton from "@/app/api/translate/components/button";
import { Languages, FileInput } from "lucide-react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";

export default function Home() {
  const [userText, setUserText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");

  // useEffect(() => {
  //   if (!userText.trim() || !targetLanguage) return;

  //   const fetchTranslation = async () => {
  //     const response = await fetch("/api/translate", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ text: userText, targetLanguage }),
  //     });
  //     const data = await response.json();
  //     setSourceLanguage(data.sourceLanguage);
  //     setTranslatedText(data.translation);
  //   };
  //   fetchTranslation();
  // }, [targetLanguage, userText]);

  const handleTargetLanguageChange = async (newLang: string) => {
    setTargetLanguage(newLang);
  
    if (!userText.trim()) return; 
  
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userText, targetLanguage: newLang }),
    });
  
    const data = await response.json();
    setSourceLanguage(data.sourceLanguage);
    setTranslatedText(data.translation);
  };

  return (
    <div className="grid grid-cols-1 mt-[-80px]">
      <h1 className="text-4xl text-center text-bold text-[color:var(--accent-400)] my-12 mx-2 p-6">
        &#123; AI &#125; Translate
      </h1>
      <div className="flex flex-row gap-4 items-centers py-6 pl-10">
        <CustomButton icon={<Languages />}>Text</CustomButton>
        <CustomButton icon={<FileInput />}>Documents</CustomButton>
      </div>

      <div className="flex flex-row gap-4 items-center justify-center m-10 px-10 py-2">
      <ToTranslate
          userText={userText}
          setUserText={setUserText}
          sourceLanguage={sourceLanguage}
          onTranslate={() => {}}
        />
        {/* <SwitchIcon /> */}
        <Translation
          translated_text={translatedText}
          targetLanguage={targetLanguage}
          setTargetLanguage={handleTargetLanguageChange} 
          onTranslate={() => {}} 
          userText={userText}
        />
      </div>
    </div>
  );
}
