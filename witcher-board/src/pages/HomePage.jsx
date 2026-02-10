import { Link } from "react-router-dom";

// étape 1.3 composant de test (page d'accueil)
export default function HomePage() {
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>⚔️ Bienvenue sur le Witcher Board ⚔️</h1>
      
      <p style={{ fontSize: "1.2rem", margin: "20px 0", lineHeight: "1.6" }}>
        Apprentis Sorceleurs, villageois et notables,<br />
        cette plateforme rassemble toutes les requêtes de chasse aux monstres du continent.
      </p>

      <div style={{ marginTop: "30px" }}>
        {/* lien vers la page contrat */}
        <Link to="/contracts">
          <button style={{ padding: "15px 30px", fontSize: "1rem" }}>
            📜 Voir les contrats disponibles
          </button>
        </Link>
      </div>
    </div>
  );
}