import { Card, CardContent } from "@/components/ui/card";
import { Play, Youtube } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

const staticVideos = [
  {
    title: "Annual Alumni Meet 2024 Highlights",
    duration: "12:34",
    thumbnail: null,
    category: "Events",
  },
  {
    title: "Convocation Ceremony 2023",
    duration: "45:20",
    thumbnail: null,
    category: "Ceremonies",
  },
  {
    title: "Alumni Panel Discussion: Future of Tech",
    duration: "1:02:15",
    thumbnail: null,
    category: "Webinars",
  },
  {
    title: "Campus Tour & Nostalgia Walk",
    duration: "8:45",
    thumbnail: null,
    category: "Campus",
  },
  {
    title: "Mentorship Program Success Stories",
    duration: "15:30",
    thumbnail: null,
    category: "Programs",
  },
  {
    title: "Greenfield University 40th Anniversary",
    duration: "28:10",
    thumbnail: null,
    category: "Special",
  },
];

export default function VideoGallery() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Video Gallery"
        subtitle="Watch highlights from our events, ceremonies, webinars, and special programs."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {staticVideos.length} Videos
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticVideos.map((video) => (
              <Card
                key={video.title}
                className="card-hover shadow-card border-0 overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-forest/20 to-forest/40 flex items-center justify-center relative">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2 bg-forest/80 text-white text-xs px-2 py-0.5 rounded">
                    {video.category}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm text-foreground line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Youtube className="w-3 h-3 text-red-500" />
                    <span>Alumni Association Channel</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
