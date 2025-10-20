import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  user_id: string;
  event_name: string;
  organizer_name: string;
  event_type: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string | null;
}

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
      toast.error("Failed to load event");
      navigate("/events");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/events")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          {event.image_url && (
            <div className="w-full h-96 mb-6 rounded-lg overflow-hidden">
              <img
                src={event.image_url}
                alt={event.event_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-6">
            <div>
              <span className="text-sm px-3 py-1 bg-secondary rounded-md">
                {event.event_type}
              </span>
              <h1 className="text-4xl font-bold mt-4">{event.event_name}</h1>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center text-lg">
                <User className="h-5 w-5 mr-3" />
                <span>Organized by {event.organizer_name}</span>
              </div>
              <div className="flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-3" />
                <span>{format(new Date(event.date), "PPP")}</span>
              </div>
              <div className="flex items-center text-lg">
                <Clock className="h-5 w-5 mr-3" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-lg">
                <MapPin className="h-5 w-5 mr-3" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-2xl font-bold mb-4">About this event</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
