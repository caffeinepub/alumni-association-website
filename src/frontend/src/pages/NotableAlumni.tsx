import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Star } from "lucide-react";
import React from "react";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import { useGetAllAlumniProfiles } from "../hooks/useQueries";

function NotableContent() {
  const { data: alumni = [], isLoading } = useGetAllAlumniProfiles();
  const notable = alumni.filter((a) => a.notable);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-muted-foreground">
            {isLoading
              ? "Loading..."
              : `${notable.length} distinguished alumni`}
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((k) => (
              <Skeleton key={k} className="h-56 rounded-2xl" />
            ))}
          </div>
        ) : notable.length === 0 ? (
          <div className="text-center py-16">
            <Star className="w-12 h-12 text-gold/30 mx-auto mb-3" />
            <p className="text-muted-foreground">
              No notable alumni listed yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notable.map((a) => (
              <Card
                key={a.id}
                className="card-hover shadow-card border-0 overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-gold to-gold-light" />
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-dark font-bold text-xl">
                        {a.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-serif font-bold text-foreground">
                          {a.name}
                        </h3>
                        <Star className="w-4 h-4 text-gold fill-gold" />
                      </div>
                      <p className="text-xs text-forest font-medium">
                        {a.profession}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Batch {String(a.batchYear)} · {a.department}
                      </p>
                    </div>
                  </div>
                  {a.bio && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {a.bio}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function NotableAlumni() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Notable Alumni"
        subtitle="Celebrating the extraordinary achievements of our most distinguished graduates."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <NotableContent />
      </ApprovalGuard>
    </div>
  );
}
