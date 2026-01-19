import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as auth from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const session = auth.getSession();
    if (session?.user) {
      setUser(session.user);
      setToken(session.token);
      setStatus("authenticated");
    }
    auth.upsertDemoUsers();
  }, []);

  const handleAuthSuccess = useCallback((session) => {
    setUser(session.user);
    setToken(session.token);
    setStatus("authenticated");
    setError(null);
    return session.user;
  }, []);

  const login = useCallback(async (payload) => {
    setStatus("submitting");
    setError(null);
    try {
      const session = await auth.login(payload);
      return handleAuthSuccess(session);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Unable to login.");
      throw err;
    }
  }, [handleAuthSuccess]);

  const register = useCallback(async (payload) => {
    setStatus("submitting");
    setError(null);
    try {
      const session = await auth.register(payload);
      return handleAuthSuccess(session);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Unable to register.");
      throw err;
    }
  }, [handleAuthSuccess]);

  const logout = useCallback(() => {
    auth.logout();
    setUser(null);
    setToken(null);
    setStatus("idle");
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      status,
      error,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, token, status, error, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

