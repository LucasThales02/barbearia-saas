import { Navigate } from 'react-router-dom';

import App from '../../App';
import { useAuth } from '../../contexts/AuthContext';

function HomeRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verificando autenticação...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <App />;
}

export default HomeRoute;
