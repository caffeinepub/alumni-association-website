import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import React from "react";

interface TestimonialCardProps {
  text: string;
  author: string;
  role?: string;
  batch?: string;
}

export default function TestimonialCard({
  text,
  author,
  role,
  batch,
}: TestimonialCardProps) {
  return (
    <Card className="card-hover shadow-card border-0 bg-white h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="w-8 h-8 text-forest/20 mb-3 flex-shrink-0" />
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 italic">
          "{text}"
        </p>
        <div className="mt-4 pt-4 border-t border-cream-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
              <span className="text-forest font-semibold text-sm">
                {author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">{author}</p>
              {(role || batch) && (
                <p className="text-xs text-muted-foreground">
                  {role}
                  {role && batch ? " · " : ""}
                  {batch ? `Batch ${batch}` : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
