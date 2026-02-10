import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getContractById } from "../services/contractService";
import { getWitcherById } from "../services/witcherService";
import "../App.css";

export default function ContractDetail() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [contract, setContract] = useState(null);
  const [witcher, setWitcher] = useState(null);

  useEffect(() => {
    getContractById(id).then((data) => {
      setContract(data);
      
      // Si un sorceleur est assigné, on va chercher ses infos (Step 4.3)
      if (data.assignedTo) {
        getWitcherById(data.assignedTo).then(setWitcher);
      }
    });
  }, [id]);

  if (!contract) return <div className="container">Chargement...</div>;

  return (
    <div className="container">
      <Link to="/contracts" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
        ← Retour à la liste
      </Link>
      
      <div className={`contract-card status-${contract.status}`} style={{ marginTop: '20px' }}>
        <h1>{contract.title}</h1>
        
        <p><strong>Description :</strong> {contract.description}</p>
        <p><strong>Récompense :</strong> {contract.reward} 💰</p>
        <p>
            <strong>Statut : </strong>
            <span style={{ color: 'var(--accent-color)' }}>{contract.status}</span>
        </p>

        {/* Affichage du sorceleur si assigné (Step 4.2) */}
        {contract.assignedTo && witcher && (
          <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(0,0,0,0.1)', borderRadius: '5px' }}>
            <h4>🐺 Sorceleur assigné :</h4>
            <p>{witcher.name} (École : {witcher.school})</p>
          </div>
        )}
      </div>
    </div>
  );
}