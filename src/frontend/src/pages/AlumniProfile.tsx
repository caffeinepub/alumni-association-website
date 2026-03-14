import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import {
  Briefcase,
  GraduationCap,
  Mail,
  MessageSquare,
  Star,
} from "lucide-react";
import React from "react";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import { useGetAllAlumniProfiles } from "../hooks/useQueries";

function ProfileContent({ id }: { id: string }) {
  const { data: alumni = [], isLoading } = useGetAllAlumniProfiles();
  const profile = alumni.find((a) => a.id === id);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Skeleton className="h-64 rounded-2xl mb-6" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          Alumni profile not found.
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-card border-0 overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-forest to-forest-light" />
          <CardContent className="p-6 -mt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-6">
              <div className="w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-forest font-bold text-4xl">
                  {profile.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif text-2xl font-bold text-foreground">
                    {profile.name}
                  </h1>
                  {profile.notable && (
                    <Star className="w-5 h-5 text-gold fill-gold" />
                  )}
                  {profile.isApproved && (
                    <Badge className="bg-forest/10 text-forest border-forest/20">
                      Approved
                    </Badge>
                  )}
                </div>
                <p className="text-forest font-medium">{profile.profession}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="w-4 h-4 text-forest" />
                <span>Batch {String(profile.batchYear)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="w-4 h-4 text-forest" />
                <span>{profile.department}</span>
              </div>
              {profile.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-forest" />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>

            {profile.bio && (
              <div className="bg-cream-100 rounded-xl p-4">
                <h3 className="font-semibold text-sm text-foreground mb-2">
                  About
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {profile.testimonials && profile.testimonials.length > 0 && (
          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-forest" />
                <h3 className="font-serif font-semibold text-lg text-foreground">
                  Testimonials
                </h3>
              </div>
              <div className="space-y-3">
                {profile.testimonials.map((t) => (
                  <div
                    key={t.substring(0, 20)}
                    className="bg-cream-100 rounded-xl p-4"
                  >
                    <p className="text-sm text-muted-foreground italic">
                      "{t}"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

export default function AlumniProfile() {
  const { id } = useParams({ from: "/alumni/profile/$id" });

  return (
    <div className="pt-16">
      <ApprovalGuard>
        <ProfileContent id={id} />
      </ApprovalGuard>
    </div>
  );
}
