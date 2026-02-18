import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token_usuario');

  // Si no hay token, lo mandamos al "Get Started" (Landing)
  if (!token) {
    return <Navigate to="/welcome" />;
  }

  // Si hay token, dejamos que vea la aplicación (children)
  return children;
};

export default ProtectedRoute;