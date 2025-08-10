import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, sessionId, permissions } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuth = Boolean(isAuthenticated && sessionId && permissions?.length);

  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthGuard;
