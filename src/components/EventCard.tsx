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
  image_url
}: EventCardProps) => {
  return <Link to={`/event/${id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        {image_url && <div className="w-full h-40 sm:h-48 overflow-hidden">
            <img src={image_url} alt={event_name} className="w-full h-full object-cover" />
          </div>}
        <CardHeader className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs px-2 py-1 bg-secondary rounded-md truncate max-w-full">
              {event_type}
            </span>
          </div>
          <CardTitle className="line-clamp-1 text-lg md:text-xl">{event_name}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs md:text-sm">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 p-4 md:p-6 pt-0 my-0">
          <div className="flex items-center text-xs md:text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{format(new Date(date), "PPP")}</span>
          </div>
          <div className="flex items-center text-xs md:text-sm text-muted-foreground">
            <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
            <span>{time}</span>
          </div>
          <div className="flex items-start text-xs md:text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2 break-words">{location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>;
};
export default EventCard;