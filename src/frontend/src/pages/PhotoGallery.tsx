import { Skeleton } from "@/components/ui/skeleton";
import { Image, X } from "lucide-react";
import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import { useGetAllEvents } from "../hooks/useQueries";

export default function PhotoGallery() {
  const { data: events = [], isLoading } = useGetAllEvents();
  const [selected, setSelected] = useState<string | null>(null);

  const eventsWithImages = events.filter((e) => e.image);

  return (
    <div className="pt-16">
      <HeroSection
        title="Photo Gallery"
        subtitle="Relive the memories from our events, reunions, and community gatherings."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {isLoading ? "Loading..." : `${eventsWithImages.length} Photos`}
            </h2>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "sk-1",
                "sk-2",
                "sk-3",
                "sk-4",
                "sk-5",
                "sk-6",
                "sk-7",
                "sk-8",
              ].map((k) => (
                <Skeleton key={k} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : eventsWithImages.length === 0 ? (
            <div className="text-center py-16">
              <Image className="w-12 h-12 text-forest/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No photos available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {eventsWithImages.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative block w-full p-0 border-0 bg-transparent"
                  onClick={() => setSelected(e.image!.getDirectURL())}
                >
                  <img
                    src={e.image!.getDirectURL()}
                    alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3">
                    <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity line-clamp-1">
                      {e.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          aria-label="Close lightbox"
          onClick={() => setSelected(null)}
          onKeyDown={(ev) => {
            if (ev.key === "Escape") setSelected(null);
          }}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelected(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selected}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-lg"
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
