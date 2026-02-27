import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Registro from './pages/Registro';
import Login from './pages/Login';
import TasksProvider from './context/TasksProvider';
import UsersProvider from './context/UsersProvider';
import './App.css';

const RootRedirect = () => {
  const token = localStorage.getItem('token_usuario');
  return token ? <Navigate to="/tareas" replace /> : <Navigate to="/welcome" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <Routes>

          <Route path="/" element={<RootRedirect />} />

          {/* PÁGINA PÚBLICA: Get Started */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro/>}/>

          {/* RUTA PROTEGIDA: Solo si hay token */}
          <Route 
            path="/tareas" 
            element={
              <ProtectedRoute>
                <TasksProvider>
                  <Home />
                </TasksProvider>
              </ProtectedRoute>
            } 
          />

        </Routes>
      </UsersProvider>
    </BrowserRouter>
  );
}

export default App;
