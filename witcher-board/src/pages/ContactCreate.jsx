import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContract } from "../services/contractService";
import "../App.css";

export default function ContractCreate() {
  const navigate = useNavigate();
  
  // État pour gérer les champs du formulaire
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // conversion récompense en nombre
    const payload = {
      ...formData,
      reward: String(formData.reward)
    };

    createContract(payload)
      .then(() => {
        // redirige vers la liste
        navigate("/contracts");
      })
      .catch((err) => alert("Erreur : " + err.message));
  };

  return (
    <div className="container">
      <h2>📜 Publier un nouveau contrat</h2>

      {/* Formulaire de création de contrat */}

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="form-group">
          <label>Titre de la requête</label>
          <input 
            type="text" 
            required 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Ex: Basilic dans la grange..."
          />
        </div>

        <div className="form-group">
          <label>Description détaillée</label>
          <textarea 
            rows="5"
            required 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Détails sur le monstre et le lieu..."
          />
        </div>

        <div className="form-group">
          <label>Récompense (Couronnes)</label>
          <input 
            type="number" 
            required 
            min="1"
            value={formData.reward}
            onChange={(e) => setFormData({...formData, reward: e.target.value})}
          />
        </div>

        <button type="submit">Publier l'annonce</button> {/* boutton pour submit */}
      </form>
    </div>
  );
}