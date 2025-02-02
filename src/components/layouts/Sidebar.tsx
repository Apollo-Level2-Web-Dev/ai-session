import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, List, Settings, User, Users } from "lucide-react";
import { Link } from "react-router-dom";

const adminRoutes = [
  {
    path: "/dashboard/admin",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    path: "/dashboard/admin/manage-users",
    label: "Manage Users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    path: "/dashboard/admin/settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const userRoutes = [
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
  const routes = role === "admin" ? adminRoutes : userRoutes;

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
        <SheetContent
          side="left"
          className="w-64 p-4 lg:hidden block"
        >
          <h2 className="text-xl font-bold mb-4">
            {role === "admin" ? "Admin Panel" : "User Dashboard"}
          </h2>
          <nav className="flex flex-col space-y-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="flex items-center gap-2 p-2 rounded"
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop version of the sidebar (fixed) */}
      <div className="lg:block hidden w-64 p-4  border   fixed top-0 left-0 h-full">
        <h2 className="text-xl font-bold mb-4">
          {role === "admin" ? "Admin Panel" : "User Dashboard"}
        </h2>
        <nav className="flex flex-col space-y-2">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="flex items-center gap-2 p-2 rounded hover:bg-black hover:text-white"
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
