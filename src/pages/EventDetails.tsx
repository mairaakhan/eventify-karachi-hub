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
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/events")}
          className="mb-4 md:mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          {event.image_url && (
            <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-4 md:mb-6 rounded-lg overflow-hidden">
              <img
                src={event.image_url}
                alt={event.event_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4 md:space-y-6">
            <div>
              <span className="text-xs md:text-sm px-2 md:px-3 py-1 bg-secondary rounded-md">
                {event.event_type}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 md:mt-4">{event.event_name}</h1>
            </div>

            <div className="grid gap-3 md:gap-4">
              <div className="flex items-center text-sm md:text-base lg:text-lg">
                <User className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
                <span className="break-words">Organized by {event.organizer_name}</span>
              </div>
              <div className="flex items-center text-sm md:text-base lg:text-lg">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
                <span>{format(new Date(event.date), "PPP")}</span>
              </div>
              <div className="flex items-center text-sm md:text-base lg:text-lg">
                <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-start text-sm md:text-base lg:text-lg">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0 mt-1" />
                <span className="break-words">{event.location}</span>
              </div>
            </div>

            <div className="pt-4 md:pt-6 border-t">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">About this event</h2>
              <p className="text-sm md:text-base text-muted-foreground whitespace-pre-wrap break-words">
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
