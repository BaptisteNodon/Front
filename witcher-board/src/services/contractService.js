const API_URL = "http://localhost:3000/api/contracts";

// On ajoute des paramètres optionnels title et status
export const getAllContracts = async (title = "", status = "") => {
  try {
    // Construction propre de l'URL avec les paramètres
    const url = new URL(API_URL);
    
    if (title) url.searchParams.append("title", title);
    if (status) url.searchParams.append("status", status);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur dans contractService:", error);
    throw error;
  }
};

export const getContractById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Contrat introuvable");
  return await response.json();
};


export const createContract = async (contractData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contractData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création du contrat");
  }
  return await response.json();
};

export const updateContract = async (id, contractData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contractData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la modification du contrat");
  }
  // L'API ne renvoie pas forcément de contenu au PUT, donc on peut renvoyer juste true ou le status
  return true; 
};
