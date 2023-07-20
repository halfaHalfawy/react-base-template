import { memo, useContext } from "react";
import { LanguageContext } from "../context/language.context";
import { ThemeContext, ThemeType } from "../context/theme.context";

const ThemeToggle = memo(() => {
  const themeData = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  return (
    <button
      className="justify-self-center
       self-center transition-all
        text-white bg-black 
        dark:bg-white dark:text-black
        active:bg-red-800
       dark:active:bg-red-200
        border-gray-600 rounded-lg dark:rounded-full 
        duration-100
        p-1"
      onClick={() => themeData.toggleTheme()}
    >
      {language.t(
        themeData.theme != ThemeType.dark
          ? "DarkTheme.Catch"
          : "LightTheme.Catch"
      )}
    </button>
  );
});

export default ThemeToggle;
