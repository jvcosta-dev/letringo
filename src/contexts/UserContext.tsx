import { createContext, useContext, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type UserContextType = {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  request: (
    config: AxiosRequestConfig,
    protectedRoute?: boolean
  ) => Promise<any>;
  fetcher: (url: string) => Promise<any>;
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/`,
});

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post(`/auth/login`, { username, password });
      const jwtToken = response.data.token;

      setToken(jwtToken);
      localStorage.setItem("token", jwtToken);
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const request = async (
    config: AxiosRequestConfig,
    protectedRoute: boolean = false
  ) => {
    const headers = {
      ...Object.fromEntries(
        Object.entries(config.headers || {}).map(([key, value]) => [
          key,
          value ? String(value) : "",
        ])
      ),
    };
    if (protectedRoute && token) {
      headers["Authorization"] = `${token}`;
    }

    try {
      const response = await api({ ...config, headers });
      return response.data;
    } catch (error) {
      if (
        protectedRoute &&
        axios.isAxiosError(error) &&
        error.response?.status === 401
      ) {
        logout();
      }
      throw error;
    }
  };

  const fetcher = (url: string) =>
    request(
      {
        url,
      },
      true
    );

  return (
    <UserContext.Provider value={{ token, login, logout, request, fetcher }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
