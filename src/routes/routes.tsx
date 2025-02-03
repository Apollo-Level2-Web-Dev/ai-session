import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ChatGpt from "@/pages/user/ChatGpt";
import Deepseek from "@/pages/user/Deepseek";
import Midjourney from "@/pages/user/Midjourney";
import UserDashboard from "@/pages/user/UserDashboard";
import { routeGenerator } from "@/utils/routeGenerator";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
const adminPaths = [
  { path: "", element: <AdminDashboard /> },
  { path: "manage-users", element: "<ManageUsers 4/>" },
];

const userPaths = [
  { path: "", element: <UserDashboard /> },
  { path: "profile", element: "<Profile /> " },
  { path: "ai/gpt", element: <ChatGpt /> },
  { path: "ai/deepseek", element: <Deepseek /> },
  { path: "ai/midjourney", element: <Midjourney /> },
  { path: "orders", element: "<Orders />" },
];
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: routeGenerator(adminPaths),
      },
      {
        path: "user",
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: routeGenerator(userPaths),
      },
    ],
  },
  { path: "/unauthorized", element: " <Unauthorized /> " },
]);

export default router;
