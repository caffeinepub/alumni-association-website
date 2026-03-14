import { Skeleton } from "@/components/ui/skeleton";
import { Quote } from "lucide-react";
import React from "react";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import TestimonialCard from "../components/TestimonialCard";
import { useGetAllAlumniProfiles } from "../hooks/useQueries";

const staticTestimonials = [
  {
    text: "The alumni network helped me land my dream job at a Fortune 500 company. The connections I made here are invaluable.",
    author: "Priya Sharma",
    role: "Software Engineer",
    batch: "2018",
  },
  {
    text: "Being part of this association has opened doors I never imagined. The mentorship program changed my career trajectory completely.",
    author: "Rahul Mehta",
    role: "Entrepreneur",
    batch: "2015",
  },
  {
    text: "The events and reunions keep me connected to my roots. It's wonderful to see how far we've all come together.",
    author: "Ananya Patel",
    role: "Doctor",
    batch: "2012",
  },
  {
    text: "I found my co-founder through the alumni forum. The community here is incredibly supportive and collaborative.",
    author: "Vikram Singh",
    role: "Startup Founder",
    batch: "2014",
  },
  {
    text: "The career guidance resources and job portal helped me transition into a completely new industry with confidence.",
    author: "Meera Krishnan",
    role: "Product Manager",
    batch: "2016",
  },
  {
    text: "Attending the annual reunion was one of the most memorable experiences. The bonds we formed in college are truly lifelong.",
    author: "Arjun Nair",
    role: "Filmmaker",
    batch: "2011",
  },
];

function TestimonialsContent() {
  const { data: alumni = [], isLoading } = useGetAllAlumniProfiles();

  const testimonialsFromBackend = alumni
    .filter((a) => a.testimonials && a.testimonials.length > 0)
    .flatMap((a) =>
      a.testimonials.map((t) => ({
        text: t,
        author: a.name,
        role: a.profession,
        batch: String(a.batchYear),
      })),
    );

  const displayTestimonials =
    testimonialsFromBackend.length > 0
      ? testimonialsFromBackend
      : staticTestimonials;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <Quote className="w-4 h-4" />
            Alumni Voices
          </div>
          <p className="text-muted-foreground">
            {isLoading
              ? "Loading testimonials..."
              : `${displayTestimonials.length} testimonials from our community`}
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((k) => (
              <Skeleton key={k} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTestimonials.map((t) => (
              <TestimonialCard
                key={t.author + t.batch}
                text={t.text}
                author={t.author}
                role={t.role}
                batch={t.batch}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function AlumniTestimonials() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Alumni Testimonials"
        subtitle="Hear from our graduates about how the alumni association has impacted their lives and careers."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <TestimonialsContent />
      </ApprovalGuard>
    </div>
  );
}
