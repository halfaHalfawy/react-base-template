import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useContext, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SpinnerButton from "../../components/spinnerButton";
import { useLoginMutation } from "../../services/api.service";
import { AuthResult } from "../../types/auth";
import { authSelector, logIn } from "./auth.slice";
import { Error } from "../../components/Error";
import { LoginValidationSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { LanguageContext } from "../../context/language.context";
function Login() {
  const language = useContext(LanguageContext);
  const auth = useSelector(authSelector);
  const [login, { isLoading, data, error }] = useLoginMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(LoginValidationSchema),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(logIn(error as FetchBaseQueryError));
    } else if (data) {
      dispatch(logIn(data as AuthResult));
    }
  }, [error, data, dispatch]);
  const onSubmit = (e: FieldValues) => {
    console.log(e);
    login({ email: e["email"], password: e["password"] });
  };

  return (
    <div className="h-full flex flex-col bg-div items-center">
      <form
        className="flex transition-all duration-700 my-auto  md:min-w-[350px]   mx-10 gap-3 rounded-md flex-col p-5  border-[1px] border-b-4 border-l-4 border-gray-700 shadow-md "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 text-2xl">
          Welcome <span className="underline">back</span> to the{" "}
          <span className="animate-pulse font-semibold shadow-inner dark:shadow-md text-gray-500 px-1 rounded-sm shadow-red-900 dark:shadow-white">
            bit
          </span>
        </h1>
        {auth.errorKey && <Error msg={auth.errorKey} />}
        <input
          id="email"
          placeholder={language.t("Email")}
          {...register("email")}
          type={"email"}
        />
        {errors.email && <Error msg={errors.email.message as string} />}
        <input
          id="password"
          placeholder={language.t("Password")}
          type={"password"}
          {...register("password")}
        />
        {errors.password && <Error msg={errors.password.message as string} />}

        <SpinnerButton
          type="submit"
          className="ml-0 mr-auto"
          lable={language.t("Login")}
          isBusy={isLoading}
        />
      </form>
    </div>
  );
}

export default Login;
