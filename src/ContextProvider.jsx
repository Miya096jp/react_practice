import { useState } from "react";
import { LoginContext } from "./LoginContext.js";

export function ContextProvider({ children }) {
  const [login, setLogin] = useState(false);
  return (
    <div class="body">
      <LoginContext.Provider value={[login, setLogin]}>
        {children}
      </LoginContext.Provider>
    </div>
  );
}
