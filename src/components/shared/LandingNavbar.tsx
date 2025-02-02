import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function LandingNavbar() {
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-5"></div>
        <h1>Kopa Samsu AI</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link to="/login">
          <Button className="rounded-full" variant="outline">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
