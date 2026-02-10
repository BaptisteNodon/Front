import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getContractById, assignContract, completeContract } from "../services/contractService";
import { getWitcherById } from "../services/witcherService";
import { useAuth } from "../hooks/useAuth";
import "../App.css";

export default function ContractDetail() {
  const { id } = useParams();
  const { user } = useAuth(); // récupère le sorceleur connecté
  
  const [contract, setContract] = useState(null);
  const [assignedWitcher, setAssignedWitcher] = useState(null);

  // charge les données
  const loadData = () => {
    getContractById(id).then((data) => {
      setContract(data);
      if (data.assignedTo) {
        getWitcherById(data.assignedTo).then(setAssignedWitcher);
      } else {
        setAssignedWitcher(null);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Action : S'assigner le contrat
  const handleAssign = () => {
    if (!user) return alert("Vous devez être connecté !");

    assignContract(id, user.id)
      .then(() => {
        alert("Mission acceptée ! Bonne chance sur la voie.");
        loadData();
      })
      .catch((err) => alert(err.message));
  };

  // Action : Terminer le contrat
  const handleComplete = () => {
    completeContract(id)
      .then(() => {
        alert("Contrat terminé ! Allez récupérer votre prime.");
        loadData();
      })
      .catch((err) => alert(err.message));
  };

  if (!contract) return <div className="container">Chargement...</div>;

  // 1. le user est le propriétaire du contrat ? 
  const isMyContract = user && contract.assignedTo && (user.id == contract.assignedTo);

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
            <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{contract.status}</span>
        </p>

        {assignedWitcher && (
          <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '5px' }}>
            <h4>🐺 Sorceleur sur le coup :</h4>
            <p>{assignedWitcher.name} ({assignedWitcher.school})</p>
          </div>
        )}

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            
            {/* Bouton Modifier */}
            <Link to={`/edit/${contract.id}`}>
                <button className="secondary">✏️ Modifier</button>
            </Link>

            {/* --- BOUTON ASSIGNATION --- */}
            {user && contract.status === "Available" && (
                <button onClick={handleAssign}>
                    ⚔️ S'attribuer la mission
                </button>
            )}

            {/* --- BOUTON TERMINER --- */}
            {user && contract.status === "Assigned" && isMyContract && (
                <button onClick={handleComplete} style={{ backgroundColor: "#27ae60" }}>
                    ✅ Terminer le contrat
                </button>
            )}

        </div>
      </div>
    </div>
  );
}