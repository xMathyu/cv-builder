"use client";

import React, {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";

export type Language = "en" | "es";

interface UIContextType {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  language: Language;
  toggleLanguage: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "cv-language";
const DEFAULT_LANGUAGE: Language = "en";

// The language preference lives in localStorage, so it is external state. Reading
// it through useSyncExternalStore keeps the server render on DEFAULT_LANGUAGE
// without a hydration mismatch, and keeps open tabs in sync.
const languageListeners = new Set<() => void>();

const subscribeToLanguage = (onStoreChange: () => void) => {
  languageListeners.add(onStoreChange);
  // `storage` only fires in other tabs; same-tab writes notify listeners directly.
  window.addEventListener("storage", onStoreChange);
  return () => {
    languageListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
};

const getLanguageSnapshot = (): Language => {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved === "en" || saved === "es" ? saved : DEFAULT_LANGUAGE;
};

const getServerLanguageSnapshot = (): Language => DEFAULT_LANGUAGE;

const storeLanguage = (next: Language) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  languageListeners.forEach((listener) => listener());
};

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleLanguage = () => {
    storeLanguage(language === "en" ? "es" : "en");
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
