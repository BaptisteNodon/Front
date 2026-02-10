import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContractList from './pages/ContractList';
import HomePage from './pages/HomePage';
import ContractDetail from './pages/ContractDetail';
import ContractCreate from './pages/ContactCreate'; 

// étape 1.3 configuration des routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contracts" element={<ContractList />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/contracts/:id" element={<ContractDetail />} />
        <Route path="/create" element={<ContractCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

