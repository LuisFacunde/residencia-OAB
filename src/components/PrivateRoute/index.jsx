import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? <Outlet /> : <Navigate to="/" />;
};