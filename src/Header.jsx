import { useAuth } from "./useAuth.jsx";

export function Header() {
  const [isLoggedIn, setLogin] = useAuth();

  return (
    <div class="header">
      <button onClick={() => setLogin(!isLoggedIn)}>
        {isLoggedIn ? "ログアウト" : "ログイン"}
      </button>
    </div>
  );
}
