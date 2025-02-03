import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
    const { user } = useUser();
  // const user = true;
console.log(user)
  if (!user) return <p>Loading...</p>;

  // Check user role from metadata
  const userRole = "user";

  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
}
