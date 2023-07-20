import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../app/store";
import { authService } from "../../services/auth.service";
import { AuthResult, JWTData } from "../../types/auth";
import { User } from "../../types/user";
import { isNetworkError } from "../../util/fetchErrorUtil";

export interface AuthState {
  user?: User | null;
  tokenData?: JWTData | null;
  errorKey?: string | null;
}

const initState: AuthState = {
  tokenData: authService.getJWTData(),
};
const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logOut: (state) => {
      authService.clearJWTData();
      state.tokenData = null;
      state.user = null;
    },
    logIn: (state, action: PayloadAction<AuthResult | FetchBaseQueryError>) => {
      const authD = action.payload as AuthResult;
      const error = action.payload as FetchBaseQueryError;
      if (typeof error?.status === "number") {
        state.errorKey = getErrorKey(error.status as number);
        return;
      } else if (isNetworkError(error)) {
        state.errorKey = "NetworkError";
        return;
      } else if (error.status) {
        state.errorKey = "UnkownError";
        return;
      }
      if (authD.code != 200) {
        state.errorKey = getErrorKey(authD.code);
        return;
      }
      console.log(authD);
      state.errorKey = null;
      state.user = authD.user;
      authService.saveJWTData({
        refreshToken: authD.refreshToken,
        token: authD.token,
      });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    refreshToken: (state, action: PayloadAction<JWTData>) => {
      state.tokenData = action.payload;
      authService.saveJWTData(action.payload);
    },
  },
});

export const authSelector = (state: RootState) => state.auth;

function getErrorKey(code: number): string {
  switch (code) {
    case 422:
      return "WrongPassword";
    case 404:
      return "AccountNotFound";
    default:
      return "UnkownError";
  }
}

export const { logIn, logOut, updateUser, refreshToken } = authSlice.actions;

export default authSlice.reducer;
