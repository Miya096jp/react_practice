import { useState, createContext, useContext } from "react";

export const LoginContext = createContext(false);
export const useLogin = () => {
  return useContext(LoginContext);
};

// export const LoginContext = () => {
//   const [login, setLogin] = useState(false);
//   return createContext([ login, setLogin ])
// }

// export const useLogin = () => {
//   return useContext(LoginContext)
// }



