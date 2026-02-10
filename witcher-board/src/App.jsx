import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContractList from './pages/ContractList';
import { AuthProvider } from './context/AuthContext'; 
import HomePage from './pages/HomePage';
import ContractDetail from './pages/ContractDetail';
import ContractCreate from './pages/ContactCreate'; 
import ContractEdit from './pages/ContractEdit'; 
import Login from './pages/Login';
import Navbar from './components/Navbar'; 

// étape 1.3 configuration des routes
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/contracts" element={<ContractList />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contracts/:id" element={<ContractDetail />} />
          <Route path="/create" element={<ContractCreate />} />
          <Route path="/edit/:id" element={<ContractEdit />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

