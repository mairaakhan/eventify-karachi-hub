import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";

interface EventCardProps {
  id: string;
  event_name: string;
  description: string;
  date: string;
  time: string;
  event_type: string;
  location: string;
  image_url?: string;
}

const EventCard = ({
  id,
  event_name,
  description,
  date,
  time,
  event_type,
  location,
  image_url,
}: EventCardProps) => {
  return (
    <Link to={`/event/${id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        {image_url && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={image_url}
              alt={event_name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs px-2 py-1 bg-secondary rounded-md">
              {event_type}
            </span>
          </div>
          <CardTitle className="line-clamp-1">{event_name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {format(new Date(date), "PPP")}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {time}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            {location}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
