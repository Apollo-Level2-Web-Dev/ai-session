import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardNav } from "./DashboardNav";
import { Sidebar } from "./Sidebar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = true; // Assuming the user is logged in for this example

  if (!user) {
    return <p>Loading...</p>;
  }

  // Fetch user role from Clerk metadata (static role for now)
  const userRole = "admin"; // "user" or "admin"

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        role={userRole}
      />

      <div className="flex-1 flex flex-col ml-0 lg:ml-64 transition-all duration-300">
        {/* Navbar */}
        <DashboardNav setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
