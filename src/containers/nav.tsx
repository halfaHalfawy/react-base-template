import { memo, useContext } from "react";
import { User } from "../types/user";
import ThemeToggle from "./themeToggle";
import { NavLink } from "react-router-dom";
import { Constants } from "../app/config/constants";
import { LanguageContext } from "../context/language.context";

const Nav = memo((props: { user: User | null }) => {
  const language = useContext(LanguageContext);
  
  return (
    <div className="flex shadow-md  z-30 dark:shadow-inner p-5 dark:shadow-white items-center justify-between">
      <NavLink to={Constants.home}>
        <h1 className="text-center my-3 uppercase    font-bold ">
          {language.t("Env")} ==={" "}
          <span className="animate-pulse">
            {import.meta.env.VITE_APP_TITLE}
          </span>
        </h1>
      </NavLink>
      <div className="flex items-center ">
        {props.user ? (
          <NavLink
            className={(isActive) =>
              isActive.isActive ? "hidden" : "block nav-link"
            }
            to={Constants.profile}
          >
            {props.user.name}
          </NavLink>
        ) : (
          <div className="flex gap-5">
            <NavLink
              className={(isActive) =>
                isActive.isActive ? "hidden" : "block nav-link"
              }
              to={Constants.login}
            >
              {language.t("Login")}
            </NavLink>
            <NavLink
              className={(isActive) =>
                isActive.isActive ? "hidden" : "block nav-link"
              }
              to={Constants.register}
            >
              {language.t("Register")}
            </NavLink>
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
});

export default Nav;
