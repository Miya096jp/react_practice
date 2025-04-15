import { createContext, useContext } from "react";

export const LoginContext = createContext(null);

export const useLogin = () => {
  return useContext(LoginContext)
}
