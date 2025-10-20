import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Calendar, Users, MapPin, Sparkles } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Eventify
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Find your next vibe
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover and share amazing events happening across Karachi — from concerts and workshops to cultural festivals and community gatherings. Your next experience is just a click away.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/events")}
            className="text-lg px-8 py-6"
          >
            Explore Events
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Events</h3>
              <p className="text-muted-foreground">
                Browse through a curated list of upcoming events in Karachi. Filter by type and find exactly what you're looking for.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Event</h3>
              <p className="text-muted-foreground">
                Organizing something amazing? List your event in minutes. No approval needed — just add and go live instantly.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with Community</h3>
              <p className="text-muted-foreground">
                Join a vibrant community of event-goers and organizers. Make every day in Karachi an adventure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center bg-secondary/20 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're looking for your next experience or want to share one with the community, Eventify is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/events")}
            >
              Browse Events
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/add-event")}
            >
              Add Your Event
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">
            © 2025 Eventify. Bringing Karachi together, one event at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
