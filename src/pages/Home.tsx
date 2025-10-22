import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Prism from "@/components/Prism";
import { Calendar, Sparkles } from "lucide-react";
const Home = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Prism height={3.5} baseWidth={5.5} animationType="3drotate" glow={1.2} noise={0.3} transparent={true} scale={3.6} colorFrequency={1} bloom={1.2} timeScale={0.3} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
      
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground drop-shadow-lg">
              Welcome to Eventify
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-foreground drop-shadow-md">
              Find your next vibe
            </p>
            <p className="text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto text-foreground/90 drop-shadow-sm bg-background/40 backdrop-blur-sm rounded-lg p-3 md:p-4">
              Discover and share amazing events happening across Karachi — from concerts and workshops to cultural festivals and community gatherings. Your next experience is just a click away.
            </p>
            <Button size="lg" onClick={() => navigate("/events")} className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-lg w-full sm:w-auto">
              Explore Events
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground drop-shadow-md">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-background/60 backdrop-blur-sm rounded-lg shadow-lg">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 mb-4">
                  <Calendar className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">Discover Events</h3>
                <p className="text-sm md:text-base text-foreground/80">
                  Browse through a curated list of upcoming events in Karachi. Filter by type and find exactly what you're looking for.
                </p>
              </div>

              <div className="text-center p-6 bg-background/60 backdrop-blur-sm rounded-lg shadow-lg">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 mb-4">
                  <Sparkles className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">Share Your Event</h3>
                <p className="text-sm md:text-base text-foreground/80">
                  Organizing something amazing? List your event in minutes. No approval needed — just add and go live instantly.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Footer */}
        <footer className="border-t border-border/50 mt-8 md:mt-16 bg-background/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <p className="text-center text-sm md:text-base text-foreground/70">
              © 2025 Eventify. Bringing Karachi together, one event at a time.
            </p>
          </div>
        </footer>
      </div>
    </div>;
};
export default Home;