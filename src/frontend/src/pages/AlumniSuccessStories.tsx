import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Briefcase, GraduationCap, Star } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";
import { useGetAllAlumniProfiles } from "../hooks/useQueries";

const staticStories = [
  {
    name: "Dr. Priya Sharma",
    batch: "2010",
    dept: "Medicine",
    profession: "Chief Medical Officer, Apollo Hospitals",
    story:
      "From a small town to leading one of India's largest hospital networks, Dr. Priya's journey is an inspiration to all aspiring medical professionals.",
    achievement: "Healthcare Leadership Award 2023",
  },
  {
    name: "Rahul Mehta",
    batch: "2008",
    dept: "Computer Science",
    profession: "Co-founder & CEO, TechVentures",
    story:
      "Rahul turned his final year project into a startup that now employs 500+ people and serves clients in 30 countries.",
    achievement: "Forbes 30 Under 30",
  },
  {
    name: "Ananya Patel",
    batch: "2012",
    dept: "Law",
    profession: "Senior Partner, Global Law Associates",
    story:
      "Ananya has argued landmark cases before the Supreme Court and is a champion for environmental justice and human rights.",
    achievement: "Legal Excellence Award 2022",
  },
  {
    name: "Vikram Singh",
    batch: "2005",
    dept: "Engineering",
    profession: "Director of Engineering, NASA JPL",
    story:
      "Vikram's work on Mars rover navigation systems has contributed to some of humanity's greatest space exploration achievements.",
    achievement: "NASA Distinguished Service Medal",
  },
  {
    name: "Meera Krishnan",
    batch: "2015",
    dept: "Business",
    profession: "Founder, GreenEarth Foundation",
    story:
      "Meera left a high-paying corporate job to found a non-profit that has planted 2 million trees across 15 states.",
    achievement: "UN Environment Champion 2024",
  },
  {
    name: "Arjun Nair",
    batch: "2011",
    dept: "Arts",
    profession: "Award-winning Filmmaker",
    story:
      "Arjun's debut film won the National Film Award and has been screened at 50+ international film festivals.",
    achievement: "National Film Award 2023",
  },
];

export default function AlumniSuccessStories() {
  const { data: alumniProfiles = [], isLoading } = useGetAllAlumniProfiles();
  const notableAlumni = alumniProfiles.filter((a) => a.notable);
  const stories = notableAlumni.length > 0 ? notableAlumni : null;

  return (
    <div className="pt-16">
      <HeroSection
        title="Alumni Success Stories"
        subtitle="Celebrating the extraordinary achievements of our graduates who are making a difference across the globe."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[50vh]"
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Inspiring Journeys
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Our Distinguished Alumni
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These remarkable individuals have gone on to achieve extraordinary
              things, embodying the spirit and values of Greenfield University.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((k) => (
                <Skeleton key={k} className="h-64 rounded-2xl" />
              ))}
            </div>
          ) : stories ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((alumni) => (
                <Card
                  key={alumni.id}
                  className="card-hover shadow-card border-0 overflow-hidden"
                >
                  <div className="h-3 bg-forest" />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-14 h-14 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-forest font-bold text-xl">
                          {alumni.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-serif font-bold text-foreground">
                            {alumni.name}
                          </h3>
                          <Star className="w-4 h-4 text-gold fill-gold" />
                        </div>
                        <p className="text-xs text-forest font-medium">
                          {alumni.profession}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Batch {String(alumni.batchYear)} · {alumni.department}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {alumni.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticStories.map((story) => (
                <Card
                  key={story.name}
                  className="card-hover shadow-card border-0 overflow-hidden"
                >
                  <div className="h-3 bg-forest" />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-14 h-14 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-forest font-bold text-xl">
                          {story.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-serif font-bold text-foreground">
                            {story.name}
                          </h3>
                          <Star className="w-4 h-4 text-gold fill-gold" />
                        </div>
                        <p className="text-xs text-forest font-medium">
                          {story.profession}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Batch {story.batch} · {story.dept}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {story.story}
                    </p>
                    <div className="flex items-center gap-2 bg-gold/10 rounded-lg px-3 py-2">
                      <Award className="w-4 h-4 text-gold-dark flex-shrink-0" />
                      <span className="text-xs font-medium text-gold-dark">
                        {story.achievement}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
