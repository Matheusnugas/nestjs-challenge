import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import eng from "./eng.json";
import ptbr from "./ptbr.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    lng: "english",
    fallbackLng: "portuguese",
    resources: {
      english: eng,
      portuguese: ptbr,
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;