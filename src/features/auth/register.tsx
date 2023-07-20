import { useContext, useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { FieldValues, useForm } from "react-hook-form";
import { FaSmileWink } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "../../components/Error";
import SpinnerButton from "../../components/spinnerButton";
import { useRegisterMutation } from "../../services/api.service";
import { AuthResult } from "../../types/auth";
import { authSelector, logIn } from "./auth.slice";
import { LanguageContext } from "../../context/language.context";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidationSchema } from "./validation";
const Register = () => {
  const language = useContext(LanguageContext);
  const auth = useSelector(authSelector);
  const [registerUser, { isLoading, data, error }] = useRegisterMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterValidationSchema),
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
    registerUser({
      email: e["email"],
      password: e["password"],
      role: "",
      passwordConfirm: e["rePassword"],
      id: 0,
      name: e["name"],
    });
  };

  return (
    <div className="h-full flex flex-col  items-center">
      <form
        className="flex transition-all duration-700 my-auto  md:min-w-[350px]   mx-10 gap-3 rounded-md flex-col p-5  border-[1px] border-b-4 border-l-4 border-gray-700 shadow-md "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 text-2xl">
          Wana take a look <span className="text-red-500">inside</span> ?{"  "}
          <FaSmileWink className="animate-bounce inline " />
        </h1>
        <input
          id="email"
          type={"email"}
          placeholder={language.t("Email")}
          {...register("email")}
        />
        {errors.email && <Error msg={errors.email.message as string} />}
        <input
          id="password"
          placeholder={language.t("Password")}
          type={"password"}
          {...register("password")}
        />
        {errors.password && <Error msg={errors.password.message as string} />}
        <input
          id="rePassword"
          placeholder={language.t("RePassword")}
          type={"password"}
          {...register("rePassword")}
        />
        {errors.rePassword && (
          <Error msg={errors.rePassword.message as string} />
        )}
        <SpinnerButton
          type="submit"
          className="ml-0 mr-auto"
          lable={language.t("Register")}
          isBusy={isLoading}
        />
      </form>
    </div>
  );
};

export default Register;
