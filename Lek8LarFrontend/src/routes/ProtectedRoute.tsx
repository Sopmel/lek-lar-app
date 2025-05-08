import { Navigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return authService.token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
