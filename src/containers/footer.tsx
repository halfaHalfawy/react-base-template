import { memo, useContext } from "react";
import { Trans } from "react-i18next";
import { LanguageContext } from "../context/language.context";

const Footer = memo(() => {
  const language = useContext(LanguageContext);

  return (
    <div className="p-5 gap-5  self-center flex items-center text-center">
      <Trans values={{ date: new Date() }} i18nKey="DateNow"></Trans>
      <p className="text-gray-700"> &nbsp;|&nbsp; </p>
      {language.supportedLanguages?.map((lng) => (
        <a
          className="cursor-pointer mr-2"
          key={lng.code}
          style={{
            fontWeight:
              language.currentLanguage === lng.code ? "bold" : "normal",
          }}
          onClick={async () => await language.changeLanguage(lng.code)}
        >
          {lng.nativeName}
        </a>
      ))}
    </div>
  );
});

export default Footer;
