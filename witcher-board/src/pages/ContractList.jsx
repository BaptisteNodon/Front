import { useEffect, useState } from "react";
import { getAllContracts } from "../services/contractService";
import "../App.css";

export default function ContractList() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    getAllContracts()
      .then((data) => setContracts(data))
  }, []);

  return (
    <div className="container">
      <h1>⚔️ Tableau des Contrats</h1>
      
      <div className="contract-grid">
        {contracts.map((contract) => ( // parcours les contrats pour affichers les données
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
      </div>
    </div>
  );
}
