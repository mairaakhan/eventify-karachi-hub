import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EVENT_TYPES = [
  "All Events",
  "Concert",
  "Workshop",
  "Exhibition",
  "Festival",
  "Carnival",
  "Conference",
  "Seminar / Talk",
  "Meetup",
  "Art Show",
  "Theatre / Drama",
  "Comedy Show",
  "Food Festival",
  "Farmers Market",
  "Cultural Event",
  "Book Fair / Literature Event",
  "Sports Event / Match",
  "School / College Event",
  "Family Event",
  "Kids Activity",
  "Movie Screening",
  "Tech Expo / Startup Event",
  "Fashion Show",
  "Charity Event / Fundraiser",
  "Product Launch",
  "Pop-up Stall / Market",
  "Training / Bootcamp",
  "Cooking Class / Demo",
  "Open Mic",
  "Religious / Spiritual Gathering",
  "Other",
];

interface Event {
  id: string;
  event_name: string;
  description: string;
  date: string;
  time: string;
  event_type: string;
  location: string;
  image_url: string | null;
}

const Events = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedType, setSelectedType] = useState("All Events");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  useEffect(() => {
    if (selectedType === "All Events") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.event_type === selectedType));
    }
  }, [selectedType, events]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
      setFilteredEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Events in Karachi</h1>
          <p className="text-xl text-muted-foreground">Find your next vibe</p>
        </div>

        <div className="mb-6 max-w-xs">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by event type" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
