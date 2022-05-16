import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./components/requireAuth";
import { RequireUnAuth } from "./components/requireUnAuth";
import { Signup } from "./components/signup";
import { Login } from "./components/login";
import { Home } from "./components/home";
import { Timeline } from "./components/timeline";
import { UserPage } from "./components/userPage";
import { NotFound } from "./components/notFound";

export const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<RequireUnAuth />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route index element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/:userId" element={<UserPage />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
