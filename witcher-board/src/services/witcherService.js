const API_URL = "http://localhost:3000/api/witchers";


export const getAllWitchers = async () => {
  try {
    // Construction propre de l'URL avec les paramètres
    const url = new URL(API_URL);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur dans witcherService:", error);
    throw error;
  }
};

export const getWitcherById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Sorceleur introuvable");
  return await response.json();
};