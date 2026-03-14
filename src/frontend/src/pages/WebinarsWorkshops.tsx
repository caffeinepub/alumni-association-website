import { Skeleton } from "@/components/ui/skeleton";
import { Monitor } from "lucide-react";
import React from "react";
import EventCard from "../components/EventCard";
import HeroSection from "../components/HeroSection";
import { useGetAllEvents } from "../hooks/useQueries";

export default function WebinarsWorkshops() {
  const { data: events = [], isLoading } = useGetAllEvents();

  const webinars = events.filter((e) => {
    const typeKey =
      typeof e.eventType === "object"
        ? Object.keys(e.eventType)[0]
        : String(e.eventType);
    return typeKey === "webinar";
  });

  return (
    <div className="pt-16">
      <HeroSection
        title="Webinars & Workshops"
        subtitle="Expand your knowledge and skills through our curated online learning sessions led by industry experts."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {isLoading
                ? "Loading..."
                : `${webinars.length} Webinars & Workshops`}
            </h2>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["sk-1", "sk-2", "sk-3"].map((k) => (
                <Skeleton key={k} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : webinars.length === 0 ? (
            <div className="text-center py-16">
              <Monitor className="w-12 h-12 text-forest/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                No webinars scheduled at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinars.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
