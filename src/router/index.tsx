import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import { Constants } from "../app/config/constants";
import ProtectedRoute from "../containers/ProtectedRoute";
import Login from "../features/auth/login";
import Register from "../features/auth/register";
import Home from "../features/home/home";
import ProfilePage from "../features/profile/profilePage";
import NotFoundPage from "../pages/notFoundPage";
import { User } from "../types/user";

export function getRouter(user: User | null, flowDirection: string) {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route
        path={Constants.home}
        element={<App user={user} flowDirection={flowDirection} />}
      >
        <Route index element={<Home />} />
        <Route
          path={Constants.login}
          element={
            <ProtectedRoute case="loggedIn" turnPath={Constants.profile}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={Constants.register}
          element={
            <ProtectedRoute case="loggedIn" turnPath={Constants.profile}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={Constants.profile}
          element={
            <ProtectedRoute case="loggedOut" turnPath={Constants.login}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    ),
    { basename: import.meta.env.VITE_BASE_URL }
  );
}
