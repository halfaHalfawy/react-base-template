import { createContext } from "react";

export enum ThemeType {
  dark = "dark",
  light = "light",
}
export interface ThemeContextData {
  theme: ThemeType;
  setTheme: (type: ThemeType) => void;
  toggleTheme: () => void;
}
const textInit: ThemeContextData = {
  theme: ThemeType.dark,
  setTheme: function (): void {
    throw new Error("Function not implemented.");
  },
  toggleTheme: function (): void {
    throw new Error("Function not implemented.");
  },
};
export const ThemeContext = createContext(textInit);
