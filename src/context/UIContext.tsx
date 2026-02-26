"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "es";

interface UIContextType {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  language: Language;
  toggleLanguage: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "cv-language";

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  // Load language preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (saved === "en" || saved === "es") {
      setLanguage(saved);
    }
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleLanguage = () => {
    const newLang: Language = language === "en" ? "es" : "en";
    setLanguage(newLang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
  };

  const value: UIContextType = {
    isFullscreen,
    toggleFullscreen,
    language,
    toggleLanguage,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
