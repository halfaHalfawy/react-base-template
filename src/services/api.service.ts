// Need to use the React-specific entry point to import createApi
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { Mutex } from "async-mutex";
import {
  AuthResult,
  JWTData,
  LoginRequest,
  RegistrationRequest,
} from "../types/auth";
import { logOut, refreshToken } from "../features/auth/auth.slice";
import { User } from "../types/user";

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders(headers, api) {
    const token = (api.getState() as RootState).auth.tokenData?.token;
    if (token) {
      // include token in req header
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    }
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          "auth/refreshToken",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(refreshToken(refreshResult.data as JWTData));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
// Define a service using a base URL and expected endpoints
export const mainApi = createApi({
  reducerPath: "mainApi",
  // global configuration for the api
  //keepUnusedDataFor: 60*60,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, undefined>({
      //keepUnusedDataFor: 60 * 60,
      query: () => `Users/me`,
    }),
    login: builder.mutation<AuthResult, LoginRequest>({
      query: (body) => ({
        method: "POST",
        url: "Users/auth/login",
        body: loginToFormData(body),
      }),
    }),
    register: builder.mutation<AuthResult, RegistrationRequest>({
      query: (body) => ({ method: "POST", url: "auth/register", body }),
    }),
  }),
});
function loginToFormData(lr:LoginRequest){
const fd= new FormData();
fd.append('Email',lr.email);
fd.append('Password',lr.password);
return fd;
}
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation,
} = mainApi;
