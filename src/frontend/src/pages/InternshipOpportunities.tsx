import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Building, ExternalLink, MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import { useGetAllJobPosts } from "../hooks/useQueries";

function InternshipsContent() {
  const { data: jobs = [], isLoading } = useGetAllJobPosts();
  const [search, setSearch] = useState("");

  const internships = jobs.filter((j) => {
    const typeKey =
      typeof j.postType === "object"
        ? Object.keys(j.postType)[0]
        : String(j.postType);
    return j.isActive && typeKey === "internship";
  });

  const filtered = internships.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {isLoading
              ? "Loading..."
              : `${filtered.length} Internship Opportunities`}
          </h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search internships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {["sk-1", "sk-2", "sk-3"].map((k) => (
              <Skeleton key={k} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-forest/30 mx-auto mb-3" />
            <p className="text-muted-foreground">
              No internship opportunities found at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((job) => (
              <Card key={job.id} className="card-hover shadow-card border-0">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-serif font-semibold text-lg text-foreground">
                          {job.title}
                        </h3>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                          Internship
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-forest" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-forest" />
                          {job.location}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {job.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Posted by: {job.postedBy}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-forest hover:bg-forest-dark text-white rounded-full flex-shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function InternshipOpportunities() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Internship Opportunities"
        subtitle="Kickstart your career with internship opportunities posted by alumni and partner organizations."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <InternshipsContent />
      </ApprovalGuard>
    </div>
  );
}
