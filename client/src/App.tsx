import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { RequireAuth } from "./components/requireAuth";
import { RequireUnAuth } from "./components/requireUnAuth";
import { Signup } from "./components/signup";
import { Login } from "./components/login";
import { GlobalTL } from "./components/globalTimeline";
import { HomeTL } from "./components/homeTimeline";
import { UserPage } from "./components/userPage";
import { NotFound } from "./components/notFound";
import { ProfileEdit } from "./components/profileEdit";
import { WithNavigation } from "./components/withNavigation";
import { Logout } from "./components/logout";

export const App: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<RequireUnAuth />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={<WithNavigation element={<HomeTL />} />}
          />
          <Route
            path="/global"
            element={<WithNavigation element={<GlobalTL />} />}
          />
          <Route
            path="/:userId"
            element={<WithNavigation element={<UserPage />} />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/settings/profile" element={<ProfileEdit />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
