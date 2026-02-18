import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PÁGINA PÚBLICA: Get Started */}
        <Route path="/welcome" element={<Welcome />} />
        {/*<Route path="/login" element={<Login />} />*/}

        {/* RUTA PROTEGIDA: Solo si hay token */}
        <Route 
          path="/tareas" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        {/* REDIRECCIÓN POR DEFECTO */}
        {/* Si entra a "/", comprobamos si tiene token para mandarlo a un sitio u otro */}
        <Route path="/" element={
          localStorage.getItem('token_usuario') 
            ? <Navigate to="/tareas" /> 
            : <Navigate to="/welcome" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
