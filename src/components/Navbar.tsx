import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, LogOut, Plus, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Eventify
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link to="/">
              <Calendar className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link to="/events">
              <MapPin className="h-5 w-5" />
            </Link>
          </Button>
          {user && (
            <>
              <Button asChild variant="ghost" size="icon">
                <Link to="/add-event">
                  <Plus className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button onClick={handleLogout} variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}
          {!user && (
            <Button asChild variant="default" size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
