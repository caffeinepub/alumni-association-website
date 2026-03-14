import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import React, { useState } from "react";
import AlumniCard from "../components/AlumniCard";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import { useGetAllAlumniProfiles } from "../hooks/useQueries";

function BatchContent() {
  const { data: alumni = [], isLoading } = useGetAllAlumniProfiles();
  const [openBatches, setOpenBatches] = useState<Set<string>>(new Set());

  const grouped = alumni.reduce<Record<string, typeof alumni>>((acc, a) => {
    const year = String(a.batchYear);
    if (!acc[year]) acc[year] = [];
    acc[year].push(a);
    return acc;
  }, {});

  const sortedYears = Object.keys(grouped).sort(
    (a, b) => Number(b) - Number(a),
  );

  const toggleBatch = (year: string) => {
    setOpenBatches((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="space-y-4">
            {["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => (
              <Skeleton key={k} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : sortedYears.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-12 h-12 text-forest/30 mx-auto mb-3" />
            <p className="text-muted-foreground">
              No alumni data available yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedYears.map((year) => {
              const isOpen = openBatches.has(year);
              return (
                <Card
                  key={year}
                  className="shadow-card border-0 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleBatch(year)}
                    className="w-full flex items-center justify-between p-5 hover:bg-cream-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-forest" />
                      </div>
                      <div className="text-left">
                        <div className="font-serif font-bold text-foreground">
                          Batch of {year}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {grouped[year].length} alumni
                        </div>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-forest" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-cream-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                        {grouped[year].map((a) => (
                          <AlumniCard key={a.id} alumni={a} />
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default function BatchwiseList() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Batch-wise Alumni List"
        subtitle="Browse alumni organized by their graduation year. Find your batchmates and reconnect."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <BatchContent />
      </ApprovalGuard>
    </div>
  );
}
