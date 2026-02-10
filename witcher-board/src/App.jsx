import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContractList from './pages/ContractList';
import HomePage from './pages/HomePage';

// étape 1.3 configuration des routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contracts" element={<ContractList />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
