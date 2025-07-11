import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface TranslateState {
  userText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

const initialState: TranslateState = {
  userText: "",
  translatedText: "",
  sourceLanguage: "auto",
  targetLanguage: "",
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setUserText: (state, action: PayloadAction<string>) => {
      state.userText = action.payload;
    },
    setTranslatedText: (state, action: PayloadAction<string | null>) => {
      state.translatedText = action.payload || "";
    },
    setSourceLanguage: (state, action: PayloadAction<string>) => {
      state.sourceLanguage = action.payload;
    },
    setTargetLanguage: (state, action: PayloadAction<string>) => {
      state.targetLanguage = action.payload;
    },
    swap: (state) => {
      [state.userText, state.translatedText] = [
        state.translatedText,
        state.userText,
      ];
    },
    resetTranslation: (state) => {
      state.userText = "";
      state.translatedText = "";
      state.sourceLanguage = "auto";
      state.targetLanguage = "en";
    },
  },
});

export const {
  setUserText,
  setSourceLanguage,
  setTranslatedText,
  setTargetLanguage,
  swap,
} = translateSlice.actions;
export default translateSlice.reducer;
