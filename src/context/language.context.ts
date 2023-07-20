import i18next, { t } from "i18next";
import { createContext } from "react";
import { localeService } from "../services/locale.service";
import { LanguageData } from "../types/language";

const testinit: LanguageData = {
  i18n: i18next,
  t: t,
  changeLanguage: (a) => {
    console.log(`language is set to ${a}`);
    return Promise.resolve();
  },
  currentLanguage: localeService.getSavedlng(),
};
export const LanguageContext = createContext<LanguageData>(testinit);
