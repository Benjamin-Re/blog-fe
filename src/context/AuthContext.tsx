import { createContext, useState, useContext, ReactNode } from "react";

const AuthContext = createContext<{
  name: string | null;
  login: (name: string) => void;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(null);

  async function logout() {
    await fetch("http://localhost:3000/users/logout", {
      method: "GET",
      credentials: "include",
    });
    setName(null);
  }

  function login(name: string) {
    setName(name);
  }

  return (
    <AuthContext.Provider value={{ name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
