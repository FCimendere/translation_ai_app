"use client";

import React, { useState, useEffect } from "react";
import ToTranslate from "@/app/translate/components/toTranslate";
import Translation from "@/app/translate/components/translation";
import SwitchIcon from "@/app/translate/components/switchIcon";
import CustomButton from "@/app/translate/components/button";
import { Languages, FileInput } from "lucide-react";
import { items } from "@/app/utils/languages";
import toast from "react-hot-toast";

export default function Home() {
  const [userText, setUserText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [activeTab, setActiveTab] = useState<"text" | "document">("text");
  const [isRight, setIsRight] = useState(true);

  const getLanguageCode = (name: string): string => {
    return (
      items.find((item) => item.name.toLowerCase() === name.toLowerCase())
        ?.code || name
    );
  };

  const handleTargetLanguageChange = async (newLang: string) => {
    setTargetLanguage(newLang);

    if (!userText.trim()) return;

    const toastId = toast.loading("Translating...");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText, targetLanguage: newLang }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`Error: ${errorText}`, { id: toastId });
        return;
      }

      const data = await response.json();
      setSourceLanguage(getLanguageCode(data.sourceLanguage));
      setTranslatedText(data.translation);

      toast.success("Translation successful!", { id: toastId });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error during translation.", { id: toastId });
    }
  };

  const handleSwap = () => {
    setUserText(translatedText);
    setTranslatedText(userText);
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    setIsRight((prev) => !prev);
  };

  useEffect(() => {
    if (userText.trim() === "") {
      setTranslatedText("");
      setSourceLanguage("");
      setTargetLanguage("");
    }
  }, [userText]);

  return (
    <div className="grid grid-cols-1 mt-[-80px]">
      <h1 className="text-4xl text-center text-bold text-[color:var(--accent-400)] my-12 mx-2 p-6">
        &#123; AI &#125; Translate
      </h1>
      <div className="flex flex-row gap-4 items-centers py-6 pl-10">
        <CustomButton
          icon={<Languages />}
          onClick={() => setActiveTab("text")}
          isActive={activeTab === "text"}
        >
          Text
        </CustomButton>
        <CustomButton
          icon={<FileInput />}
          onClick={() => setActiveTab("document")}
          isActive={activeTab === "document"}
        >
          Documents
        </CustomButton>
      </div>

      {activeTab === "text" && (
        <div className="flex flex-row gap-4 items-center justify-center m-10 px-10 py-2">
          <ToTranslate
            userText={userText}
            setUserText={setUserText}
            sourceLanguage={sourceLanguage}
            onTranslate={() => {}}
          />
          <SwitchIcon isRight={isRight} onClick={handleSwap} />
          <Translation
            translated_text={translatedText}
            targetLanguage={targetLanguage}
            setTargetLanguage={handleTargetLanguageChange}
            onTranslate={() => {}}
            userText={userText}
          />
        </div>
      )}

      {activeTab === "document" && (
        <div className="text-center text-gray-600 mt-12 justify-center items-center">
          <p className="flex flex-row gap-2 p-6 justify-center items-center text-[color:var(--accent-400)]">
            {" "}
            Document translation feature will be here soon! <FileInput />
          </p>
        </div>
      )}
      <div className="fixed bottom-4 right-8 p-2 text-sm text-[color:var(--primary-300)]">
        <a
          href="https://www.flaticon.com/free-icons/subject"
          title="subject icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subject icon/favicon created by ekays.dsgn - Flaticon
        </a>
      </div>
    </div>
  );
}
