import { Link } from "react-router-dom";
import "../App.css"; // Pour le style de nav
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div>
        <Link to="/">⚔️ Accueil</Link>
        <Link to="/contracts">Contrats</Link>
      </div>
      
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px", color: "var(--accent-color)" }}>
              👤 {user.name}
            </span>
            <button onClick={logout} className="secondary" style={{ padding: "5px 10px" }}>
              Déco
            </button>
          </>
        ) : (
          <Link to="/login">Se connecter</Link>
        )}
      </div>
    </nav>
  );
}
