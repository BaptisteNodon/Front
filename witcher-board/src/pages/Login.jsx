import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 

export default function Login() {
  const [witchers, setWitchers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const { login } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/witchers")
      .then((res) => res.json())
      .then((data) => setWitchers(data));
  }, []);

  const handleLogin = () => {
    if (!selectedId) return;

    // On convertit w.id en String pour être sûr que ça matche avec selectedId
    const witcher = witchers.find((w) => String(w.id) === selectedId);
    
    // log
    console.log("Tentative de connexion avec :", witcher);

    if (witcher) {
        login(witcher);
        navigate("/");
    } else {
        console.error("Sorceleur introuvable ! Problème d'ID ?");
    }
  };

  return (
    <div className="container">
      <h2>🐺 Connexion Sorceleur</h2>
      <div className="form-group">
        <label>Identité :</label>
        <select 
          onChange={(e) => setSelectedId(e.target.value)} 
          value={selectedId}
          style={{ width: "100%", padding: "10px" }}
        >
          <option value="">-- Choisir un sorceleur --</option>
          {witchers.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name} ({w.school})
            </option>
          ))}
        </select>
      </div>
      
      <button onClick={handleLogin} disabled={!selectedId}>
        Se connecter
      </button>
    </div>
  );
}