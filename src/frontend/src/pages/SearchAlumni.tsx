import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Search, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { AlumniProfile } from "../backend";
import AlumniCard from "../components/AlumniCard";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import { useGetAllAlumniProfiles, useSearchAlumni } from "../hooks/useQueries";

function SearchContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [department, setDepartment] = useState("");
  const [results, setResults] = useState<AlumniProfile[] | null>(null);
  const searchMutation = useSearchAlumni();
  const { data: allAlumni = [] } = useGetAllAlumniProfiles();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await searchMutation.mutateAsync({
      searchTerm: searchTerm.trim(),
      batchYear: BigInt(batchYear || 0),
      department: department.trim(),
    });
    setResults(res);
  };

  const handleClear = () => {
    setSearchTerm("");
    setBatchYear("");
    setDepartment("");
    setResults(null);
  };

  const displayList = results !== null ? results : allAlumni;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-card border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-forest" />
              <h3 className="font-semibold text-foreground">Search Filters</h3>
            </div>
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div>
                <Label htmlFor="searchTerm">Name</Label>
                <Input
                  id="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name..."
                />
              </div>
              <div>
                <Label htmlFor="batchYear">Batch Year</Label>
                <Input
                  id="batchYear"
                  type="number"
                  value={batchYear}
                  onChange={(e) => setBatchYear(e.target.value)}
                  placeholder="e.g. 2015"
                  min="1950"
                  max="2030"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Computer Science"
                />
              </div>
              <div className="sm:col-span-3 flex gap-3">
                <Button
                  type="submit"
                  disabled={searchMutation.isPending}
                  className="bg-forest hover:bg-forest-dark text-white rounded-full"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {searchMutation.isPending ? "Searching..." : "Search Alumni"}
                </Button>
                {results !== null && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClear}
                    className="rounded-full border-forest text-forest hover:bg-forest hover:text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {results !== null
              ? `Found ${results.length} result(s)`
              : `Showing all ${allAlumni.length} alumni`}
          </p>
        </div>

        {searchMutation.isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => (
              <Skeleton key={k} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : displayList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No alumni found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayList.map((a) => (
              <AlumniCard key={a.id} alumni={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function SearchAlumni() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Search Alumni"
        subtitle="Find and connect with fellow graduates using our powerful search and filter tools."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <SearchContent />
      </ApprovalGuard>
    </div>
  );
}
