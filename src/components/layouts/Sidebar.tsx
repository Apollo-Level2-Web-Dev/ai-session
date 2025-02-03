/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Bot,
  BrainCircuit,
  ChevronDown,
  Home,
  ImagePlus,
  List,
  Settings,
  User,
  Users,
} from "lucide-react"; // Import ChevronDown for the arrow
import { useState } from "react";
import { Link } from "react-router-dom";

type Route = {
  path: string;
  label: string;
  icon: JSX.Element;
  children?: Route[];
};

const adminRoutes: Route[] = [
  {
    path: "/dashboard/admin",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    path: "/dashboard/admin/manage-users",
    label: "Manage Users",
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        path: "/dashboard/admin/manage-users/create",
        label: "Create User",
        icon: <User className="w-5 h-5" />,
      },
      {
        path: "/dashboard/admin/manage-users/list",
        label: "User List",
        icon: <List className="w-5 h-5" />,
      },
    ],
  },
  {
    path: "/dashboard/admin/settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const userRoutes: Route[] = [
  {
    path: "/dashboard/user",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    path: "/dashboard/user/profile",
    label: "Profile",
    icon: <User className="w-5 h-5" />,
  },
  {
    path: "/dashboard/user/ai/gpt",
    label: "AI",
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        path: "/dashboard/user/ai/gpt",
        label: "Chat GPT",
        icon: <Bot className="w-5 h-5" />,
      },
      {
        path: "/dashboard/user/ai/deepseek",
        label: "deepseek",
        icon: <BrainCircuit className="w-5 h-5" />,
      },
      {
        path: "/dashboard/user/ai/midjourney",
        label: "midjourney",
        icon: <ImagePlus className="w-5 h-5" />,
      },
    ],
  },
  {
    path: "/dashboard/user/orders",
    label: "Orders",
    icon: <List className="w-5 h-5" />,
  },
];

export function Sidebar({
  isOpen,
  setIsOpen,
  role,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  role: string;
}) {
  const routes = role === "user" ?  userRoutes : adminRoutes;

  // State to track which parent route is expanded
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

  const toggleSubRoutes = (routePath: string) => {
    setExpandedRoute((prev) => (prev === routePath ? null : routePath)); // Toggle expansion
  };

  const renderSubRoutes = (children: any[]) => {
    return (
      <div className="ml-4">
        {children.map((child) => (
          <Link
            key={child.path}
            to={child.path}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            {child.icon}
            {child.label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="lg:w-64 fixed top-0 left-0 h-full z-50">
      {/* Mobile version of the sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="lg:hidden absolute top-4 left-4 z-50"
          >
            ☰
          </Button>
        </SheetTrigger>

        {/* Sidebar content (visible only on mobile) */}
        <SheetContent side="left" className="w-64 p-4 lg:hidden block">
          <h2 className="text-xl font-bold mb-4">
            {role === "admin" ? "Admin Panel" : "User Dashboard"}
          </h2>
          <nav className="flex flex-col space-y-2">
            {routes.map((route) => (
              <div key={route.path}>
                <Link
                  to={route.path}
                  onClick={
                    route.children
                      ? () => toggleSubRoutes(route.path)
                      : undefined
                  }
                  className="flex items-center gap-2 p-2 rounded"
                >
                  {route.icon}
                  {route.label}
                  {route.children && (
                    <ChevronDown className="ml-2 w-4 h-4" /> // Add arrow for sub-routes
                  )}
                </Link>
                {route.children &&
                  expandedRoute === route.path &&
                  renderSubRoutes(route.children)}
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop version of the sidebar (fixed) */}
      <div className="lg:block hidden w-64 p-4 border fixed top-0 left-0 h-full">
        <h2 className="text-xl font-bold mb-4">
          {role === "admin" ? "Admin Panel" : "User Dashboard"}
        </h2>
        <nav className="flex flex-col space-y-2">
          {routes.map((route) => (
            <div key={route.path}>
              <Link
                to={route.path}
                onClick={
                  route.children ? () => toggleSubRoutes(route.path) : undefined
                }
                className="flex items-center gap-2 p-2 rounded hover:bg-black hover:text-white"
              >
                {route.icon}
                {route.label}
                {route.children && (
                  <ChevronDown className="ml-2 w-4 h-4" /> // Add arrow for sub-routes
                )}
              </Link>
              {route.children &&
                expandedRoute === route.path &&
                renderSubRoutes(route.children)}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
