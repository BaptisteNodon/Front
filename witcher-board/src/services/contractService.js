const API_URL = "http://localhost:3000/api/contracts"; // je me suis dis qu'il n'y avait pas besoin de mettre l'URL en variable d'environnement car y a pas de prod (désolé si vous vouliez la changer)

export const getAllContracts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur dans contractService:", error);
    throw error;
  }
};
