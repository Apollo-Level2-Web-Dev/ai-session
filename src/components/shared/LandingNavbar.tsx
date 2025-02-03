import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingNavbar() {
  const { isSignedIn } = useUser();
 
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard"); // ✅ Redirect immediately if logged in
    }
  };

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <h1>Kopa Samsu AI</h1>
      </Link>

      <div className="flex items-center gap-x-4">
        {/* If NOT logged in, show the Clerk SignInButton */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Get Started
            </button>
          </SignInButton>
        </SignedOut>

        {/* If already logged in, redirect on click */}
        <SignedIn>
          <button
            onClick={handleGetStarted}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Get Started
          </button>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
