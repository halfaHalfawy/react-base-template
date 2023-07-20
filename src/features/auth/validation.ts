import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("EmailRequired")
    .max(100, "EmailTooLong")
    .email("InvalidEmail"),
  password: yup
    .string()
    .required("PasswordRequired")
    .min(3, "PasswordTooShort")
    .max(32, "PasswordTooLong"),
});

export const RegisterValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("EmailRequired")
    .max(100, "EmailTooLong")
    .email("InvalidEmail"),
  password: yup
    .string()
    .required("PasswordRequired")
    .min(3, "PasswordTooShort")
    .max(32, "PasswordTooLong"),
  rePassword: yup
    .string()
    .test("PasswordMatch", "PasswordMismatch", (value, res) => {
      return value === res.parent.password;
    }),
});
