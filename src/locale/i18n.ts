import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { DateTime } from "ts-luxon";
import i18next from "i18next";
import { localeService } from "../services/locale.service";

localeService.init("en");

i18next.on("languageChanged", (lng) => {
  localeService.setSavedlng(lng);
});

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(
    new Backend(null, {
      loadPath: (lng) =>
        import.meta.env.VITE_BASE_URL +
        "\\locales\\" +
        lng +
        "\\translation.json",
    })
  )
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    lng: localeService.getSavedlng(),
  });

// new usage
i18n.services.formatter?.add("DATE_HUGE", (value, lng) => {
  return DateTime.fromJSDate(value)
    .setLocale(lng ?? "en")
    .toLocaleString(DateTime.DATE_HUGE);
});

export default i18n;
