import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { RequireAuth } from "./components/Route/requireAuth";
import { RequireUnAuth } from "./components/Route/requireUnAuth";
import { Signup } from "./components/UserAuthentication/signup";
import { Login } from "./components/UserAuthentication/login";
import { Logout } from "./components/UserAuthentication/logout";
import { WithNavigation } from "./components/SideNavigation/withNavigation";
import { GlobalTL } from "./components/Timeline/globalTimeline";
import { HomeTL } from "./components/Timeline/homeTimeline";
import { UserPage } from "./components/UserPage/userPage";
import { ProfileEdit } from "./components/UserPage/profileEdit";
import { NotFound } from "./components/notFound";
import { FollowingList } from "./components/UserPage/followingList";
import { FollowersList } from "./components/UserPage/followersList";
import { FavoritesList } from "./components/Tweet/favoritesList";
import { TweetPage } from "./components/Tweet/tweetPage";

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
          <Route
            path="/:userId/following"
            element={<WithNavigation element={<FollowingList />} />}
          />
          <Route
            path="/:userId/followers"
            element={<WithNavigation element={<FollowersList />} />}
          />
          <Route
            path="/:userId/status/:tweetId"
            element={<WithNavigation element={<TweetPage />} />}
          />
          <Route
            path="/:userId/status/:tweetId/favorites"
            element={<FavoritesList />}
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
