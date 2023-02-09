// PrivateRoute.tsx in v6
import { useEffect, useState } from 'react';
//import { Navigate, useLocation } from 'react-router-dom';
//import { useAppSelector, useAppDispatch } from '../hooks'
//import { loginFinish, loginSuccess } from '../store/slices/auth'
import DataService from '../services/data';

/**
 * Crea un componente privado, si no esta autenticado lo redirige al login
 * @todo este componente se debe reutilizar en el front alumnos(no implementado)
 * @param
 * @returns
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAppSelector(state => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      DataService.getLogin()
        .then(response => {
          dispatch(
            loginSuccess({ Id: response.data.id, role: response.data.role })
          );
        })
        .catch(() => {
          dispatch(loginFinish());
        });
    }
  }, []);

  if (loading) {
    return <p>Checking authenticaton..</p>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/evaluacionprotocolos/comite/login"
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
