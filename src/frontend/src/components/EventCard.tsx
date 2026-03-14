import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin, Tag } from "lucide-react";
import React from "react";
import type { Event, EventType } from "../backend";

interface EventCardProps {
  event: Event;
}

const eventTypeColors: Record<string, string> = {
  upcoming: "bg-forest/10 text-forest border-forest/20",
  past: "bg-gray-100 text-gray-600 border-gray-200",
  reunion: "bg-gold/10 text-gold-dark border-gold/20",
  webinar: "bg-blue-50 text-blue-700 border-blue-200",
};

const eventTypeLabels: Record<string, string> = {
  upcoming: "Upcoming",
  past: "Past",
  reunion: "Reunion",
  webinar: "Webinar",
};

function getEventTypeKey(eventType: EventType): string {
  if (typeof eventType === "object") {
    return Object.keys(eventType)[0];
  }
  return String(eventType);
}

export default function EventCard({ event }: EventCardProps) {
  const typeKey = getEventTypeKey(event.eventType);
  const date = new Date(Number(event.date) / 1_000_000);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="card-hover shadow-card border-0 overflow-hidden group">
      {event.image && (
        <div className="h-40 overflow-hidden bg-cream-100">
          <img
            src={event.image.getDirectURL()}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {!event.image && (
        <div className="h-40 bg-gradient-to-br from-forest/10 to-forest/20 flex items-center justify-center">
          <Calendar className="w-12 h-12 text-forest/30" />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif font-semibold text-lg text-foreground leading-tight line-clamp-2">
            {event.title}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full border font-medium whitespace-nowrap ${eventTypeColors[typeKey] || eventTypeColors.upcoming}`}
          >
            {eventTypeLabels[typeKey] || typeKey}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 text-forest" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-forest" />
          <span>{event.location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
