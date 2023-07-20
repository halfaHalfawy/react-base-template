import { i18n } from "i18next";

export interface LanguageInfo {
  nativeName: string;
  code: string;
}
export interface LanguageData {
  currentLanguage: string;
  supportedLanguages?: LanguageInfo[];
  changeLanguage: (lang: string) => Promise<void>;
  t: (t:string)=>string;
  i18n: i18n;
}
