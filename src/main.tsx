import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "./index.css";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Library from "./pages/Library";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";
import { SettingsProvider } from "./contexts/SettingsContext";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Book from "./pages/Book";
import Read from "./pages/Read";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/*" element={<NotFound />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute>
                <Ranking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <Book />
            </ProtectedRoute>
          }
        />
        <Route
          path="/read/:id"
          element={
            <ProtectedRoute>
              <Read />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <SettingsProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </SettingsProvider>
    </UserProvider>
  </StrictMode>
);
