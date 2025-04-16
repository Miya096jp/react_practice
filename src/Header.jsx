import { useAuth } from "./useAuth.jsx";

export function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <div class="header">
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "ログアウト" : "ログイン"}
      </button>
    </div>
  );
}
