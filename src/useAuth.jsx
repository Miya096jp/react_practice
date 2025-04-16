import { useState, createContext, useContext } from "react";
const LoginContext = createContext(null);

export const useAuth = () => {
  return useContext(LoginContext);
};

export function Provider({ children }) {
  const [login, setLogin] = useState(false);
  return (
    <LoginContext.Provider value={[login, setLogin]}>
      {children}
    </LoginContext.Provider>
  );
}
