import { useEffect, useState } from "react";
import { getAllContracts } from "../services/contractService";
import "../App.css";

export default function ContractList() {
  const [contracts, setContracts] = useState([]);
  
  // États pour les filtres (3.1)
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    // On passe les filtres actuels au service (Step 3.2)
    getAllContracts(titleFilter, statusFilter)
      .then((data) => setContracts(data))
      .catch((err) => console.error("Erreur filtre:", err));
      
  }, [titleFilter, statusFilter]); // le tableau de dépendances relance l'effet quand ces valeurs changent

  return (
    <div className="container">
      <h1>⚔️ Tableau des Contrats</h1>

      {/* zone de filtres (3.1) */}
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par titre..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      
      {/* Grille des contrats */}
      <div className="contract-grid">
        {contracts.map((contract) => (
          <div 
            key={contract.id} 
            className={`contract-card status-${contract.status}`} 
          >
            <h3>{contract.title}</h3>
            <p>{contract.description}</p>
            <p>
              <strong>Statut : </strong> 
              <span style={{color: 'var(--accent-color)'}}>{contract.status}</span>
            </p>
          </div>
        ))}
        
        {contracts.length === 0 && (
          <p>Aucun contrat ne correspond à votre recherche.</p>
        )}
      </div>
    </div>
  );
}
