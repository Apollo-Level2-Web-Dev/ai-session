import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function DashboardNav({ setIsSidebarOpen }: { setIsSidebarOpen: (open: boolean) => void }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <Button variant="ghost" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
        <Menu className="w-6 h-6" />
      </Button>
      <h1 className="text-lg font-semibold">Dashboard</h1>
    </header>
  );
}
