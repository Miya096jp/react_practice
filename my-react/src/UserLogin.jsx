import { LoginContext } from "./LoginContext.jsx";

export default function UserLogin({ login, children }) {
  return (
    <div class="body">
      <LoginContext.Provider value={login}>
        {children}
      </LoginContext.Provider>
    </div>
  );
}
