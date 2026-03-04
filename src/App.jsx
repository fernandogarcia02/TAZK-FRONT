import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Registro from './pages/Registro';
import Login from './pages/Login';
import TasksProvider from './context/TasksProvider';
import UsersProvider from './context/UsersProvider';
import ListsProvider from './context/ListsProvider';
import './App.css';

const RootRedirect = () => {
  const token = localStorage.getItem('token_usuario');
  return token ? <Navigate to="/home" replace /> : <Navigate to="/welcome" replace />;
};

function App() {
  return (
    <BrowserRouter>
      {/* 1. Users siempre arriba */}
      <UsersProvider>
        {/* 2. Lists y Tasks aquí para que estén disponibles en toda la app 
               y no se monten/desmonten bruscamente al cambiar de ruta */}
        <ListsProvider>
          <TasksProvider>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro/>}/>

              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </TasksProvider>
        </ListsProvider>
      </UsersProvider>
    </BrowserRouter>
  );
}

export default App;
