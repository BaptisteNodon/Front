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
