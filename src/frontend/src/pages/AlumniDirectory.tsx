import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import React, { useState } from "react";
import AlumniCard from "../components/AlumniCard";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import { useGetAllAlumniProfiles } from "../hooks/useQueries";

function DirectoryContent() {
  const { data: alumni = [], isLoading } = useGetAllAlumniProfiles();
  const [search, setSearch] = useState("");

  const filtered = alumni.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase()) ||
      String(a.batchYear).includes(search),
  );

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {isLoading ? "Loading..." : `${filtered.length} Alumni Members`}
            </h2>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, department, batch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
              <Skeleton key={k} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No alumni found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((a) => (
              <AlumniCard key={a.id} alumni={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function AlumniDirectory() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Alumni Directory"
        subtitle="Connect with fellow graduates from across the world. Browse our comprehensive alumni directory."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <DirectoryContent />
      </ApprovalGuard>
    </div>
  );
}
