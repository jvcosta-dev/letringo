import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "./index.css";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/*  <Route path="/" element={<Home />} /> */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
