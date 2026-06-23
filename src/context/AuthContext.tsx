import { createContext, useState, useContext, ReactNode } from "react";

const AuthContext = createContext<{
  name: string | null;
  token: string | null;
  login: (name: string, token: string) => void;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  function logout() {
    setName(null);
    setToken(null);
  }

  function login(name: string, token: string) {
    setName(name);
    setToken(token);
  }

  return (
    <AuthContext.Provider value={{ name, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
