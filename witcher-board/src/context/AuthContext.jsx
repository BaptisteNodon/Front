import { useState } from "react";
import { AuthContext } from "./AuthContextValue";

export const AuthProvider = ({ children }) => {
  // On charge l'utilisateur depuis le sessionStorage au démarrage (Step 7.1 note)
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("witcherUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (witcherData) => {
    setUser(witcherData);
    sessionStorage.setItem("witcherUser", JSON.stringify(witcherData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("witcherUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
