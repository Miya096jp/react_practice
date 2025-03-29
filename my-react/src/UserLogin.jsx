import { LoginContext } from "./LoginContext.jsx";

export function UserLogin({ login, children }) {
  return (
    <div class="body">
      <LoginContext.Provider value={login}>
        {children}
      </LoginContext.Provider>
    </div>
  );
}
