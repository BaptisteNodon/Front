import { BrowserRouter, Routes, Route } from 'react-router-dom';

// étape 1.3 composant de test
function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>⚔️ Witcher Board</h1>
      <p>Bienvenue sur le tableau des contrats (Page de test).</p>
    </div>
  );
}

// étape 1.3 configuration des routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
