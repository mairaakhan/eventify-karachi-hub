import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
    setOpen(false);
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      <Button asChild variant="ghost" className={mobile ? "w-full justify-start" : ""} onClick={() => mobile && setOpen(false)}>
        <Link to="/">Home</Link>
      </Button>
      <Button asChild variant="ghost" className={mobile ? "w-full justify-start" : ""} onClick={() => mobile && setOpen(false)}>
        <Link to="/events">Events</Link>
      </Button>
      <Button asChild variant="ghost" className={mobile ? "w-full justify-start" : ""} onClick={() => mobile && setOpen(false)}>
        <Link to="/add-event">Add Event</Link>
      </Button>
      {user ? (
        <>
          <Button asChild variant="ghost" className={mobile ? "w-full justify-start" : ""} onClick={() => mobile && setOpen(false)}>
            <Link to="/profile">My Events</Link>
          </Button>
          <Button onClick={handleLogout} variant="ghost" className={mobile ? "w-full justify-start" : ""}>
            Logout
          </Button>
        </>
      ) : (
        <Button asChild variant="default" className={mobile ? "w-full justify-start" : ""} onClick={() => mobile && setOpen(false)}>
          <Link to="/auth">Sign In</Link>
        </Button>
      )}
    </>
  );

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Eventify
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
