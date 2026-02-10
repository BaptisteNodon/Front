import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContractById, updateContract } from "../services/contractService";
import "../App.css";

export default function ContractEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: ""
  });

  // Chargement des données existantes (Step 6.2)
  useEffect(() => {
    getContractById(id)
      .then((data) => {
        // ce qu'on a le droit de modifier
        setFormData({
          title: data.title,
          description: data.description,
          reward: data.reward
        });
      })
      .catch((err) => alert("Erreur chargement : " + err.message));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Envoi des modifications (Step 6.3)
    updateContract(id, formData)
      .then(() => {
        // Redirection vers le détail du contrat
        navigate(`/contracts/${id}`);
      })
      .catch((err) => alert("Erreur modification : " + err.message));
  };

  return (
    <div className="container">
      <h2>📝 Modifier le contrat</h2>

      {/* Formulaire de modification du contrat */}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre</label>
          <input 
            type="text" 
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            rows="5"
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Récompense</label>
          <input 
            type="string"
            required
            value={formData.reward}
            onChange={(e) => setFormData({...formData, reward: e.target.value})}
          />
        </div>

        <button type="submit">Sauvegarder les modifications</button>
        <button 
          type="button" 
          onClick={() => navigate(`/contracts/${id}`)}
          className="secondary" 
          style={{ marginLeft: "10px" }}
        >
          Annuler
        </button>
      </form>
    </div>
  );
}