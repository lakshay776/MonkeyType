// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ResultContext } from '../assets/context/ResultContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(ResultContext);

  // If not logged in, go to /Auth
  if (!isLoggedIn) {
    return <Navigate to="/Auth" replace />;
  }

  // If logged in, go to requested route
  return children;
};

export default ProtectedRoute;
