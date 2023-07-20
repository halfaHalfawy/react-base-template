import { useContext } from "react";
import { LanguageContext } from "../context/language.context";

export function Error(props: { msg?: string | null | undefined }) {
  const tr = useContext(LanguageContext);
  return (
    <span role="alert" className="text-xs dark:text-red-500 text-red-700">
      {tr.t(props.msg ?? "")}
    </span>
  );
}
