import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Briefcase, GraduationCap, Star } from "lucide-react";
import React from "react";
import type { AlumniProfile } from "../backend";

interface AlumniCardProps {
  alumni: AlumniProfile;
}

export default function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <Link to="/alumni/profile/$id" params={{ id: alumni.id }}>
      <Card className="card-hover shadow-card border-0 h-full group cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
              <span className="text-forest font-bold text-lg">
                {alumni.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground truncate">
                  {alumni.name}
                </h3>
                {alumni.notable && (
                  <Star className="w-4 h-4 text-gold fill-gold flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {alumni.department}
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <GraduationCap className="w-3.5 h-3.5 text-forest" />
              <span>Batch {String(alumni.batchYear)}</span>
            </div>
            {alumni.profession && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Briefcase className="w-3.5 h-3.5 text-forest" />
                <span className="truncate">{alumni.profession}</span>
              </div>
            )}
          </div>
          {alumni.bio && (
            <p className="mt-3 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {alumni.bio}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
