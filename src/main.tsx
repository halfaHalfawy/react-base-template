import { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./locale/i18n";
import { store } from "./app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getRouter } from "./router";
import SplashScreen from "./components/splashScreen";
import { authSelector, logOut } from "./features/auth/auth.slice";
import { useLazyGetCurrentUserQuery } from "./services/api.service";
import { updateUser } from "./features/auth/auth.slice";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./context/language.context";
import { isNetworkError } from "./util/fetchErrorUtil";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { AiFillAlert } from "react-icons/ai";
import { LanguageInfo } from "./types/language";

const supportedLanguages: LanguageInfo[] = [
  { nativeName: "English", code: "en" },
  { nativeName: "العربية", code: "ar" },
];
function Index() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [loadUser, { data, isLoading, isError, error, isFetching }] =
    useLazyGetCurrentUserQuery();

  const auth = useSelector(authSelector);
  useEffect(() => {
    if (isError && !isNetworkError(error as FetchBaseQueryError)) {
      dispatch(logOut());
      return;
    } else if (!(isLoading && isFetching) && !isError && auth.tokenData) {
      loadUser(undefined, false);
    } else if (data) {
      dispatch(updateUser(data));
    }
  }, [
    auth.tokenData,
    data,
    dispatch,
    error,
    isError,
    isFetching,
    isLoading,
    loadUser,
  ]);

  const token = auth.tokenData;
  const user = auth.user;

  if (isError) {
    return (
      <div className="h-[100vh] w-full flex">
        <div className="m-auto flex rounded-2xl flex-col p-5 border-2 border-gray-600">
          <AiFillAlert className="inline mb-5 h-10 w-10" />

          <p>Something wrong happened </p>
          <p className="font-thin underline my-2 bg-gray-100 px-5 py-1">
            {` ${(error as FetchBaseQueryError).status} `}
          </p>
          <p className="max-w-[200px] text-sm">
            We are having trouble reaching our server please try again later or
            logout if this continues
          </p>
          <div className="flex gap-5 self-center">
            <button
              className="m-auto mt-10"
              onClick={() => loadUser(undefined, false)}
            >
              Retry
            </button>
            <button
              className="m-auto mt-10 bg-red-300"
              onClick={() => dispatch(logOut())}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user && token && (isLoading || isFetching)) {
    return <SplashScreen />;
  }

  const router = getRouter(user ?? null, t("FlowDirection"));
  return (
    <LanguageContext.Provider
      value={{
        changeLanguage: async (lan) => {
          await i18n.changeLanguage(lan);
        },
        currentLanguage: i18n.language,
        i18n,
        t,
        supportedLanguages,
      }}
    >
      <RouterProvider router={router} fallbackElement={<SplashScreen />} />
    </LanguageContext.Provider>
  );
}
document.getElementsByTagName("body")[0]?.classList?.add("bg-div");
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Suspense fallback={<SplashScreen />}>
      <Index />
    </Suspense>
  </Provider>
);
