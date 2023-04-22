import { Navigate } from "react-router";

export default function ProtectedRoute(props) {
  return props.isLogged ? (
    <props.component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
