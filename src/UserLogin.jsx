import { LoginContext } from "./LoginContext.js";

export function UserLogin({ login, children }) {
  return (
    <div class="body">
      <LoginContext.Provider value={login}>{children}</LoginContext.Provider>
    </div>
  );
}
