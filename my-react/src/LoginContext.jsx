import { createContext, useContext } from "react";
export const LoginContext = createContext(false);
export const useLogin = () => {
  return useContext(LoginContext);
};
