const API_URL = "http://localhost:3000/api/witchers";

export const getWitcherById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Sorceleur introuvable");
  return await response.json();
};