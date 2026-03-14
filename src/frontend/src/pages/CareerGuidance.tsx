import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

const resources = [
  {
    icon: TrendingUp,
    title: "Resume & LinkedIn Optimization",
    desc: "Learn how to craft a compelling resume and optimize your LinkedIn profile to attract top employers.",
    tags: ["Resume", "LinkedIn", "Personal Branding"],
  },
  {
    icon: Target,
    title: "Interview Preparation",
    desc: "Master common interview techniques, behavioral questions, and technical assessments with our curated guides.",
    tags: ["Interviews", "Soft Skills", "Technical"],
  },
  {
    icon: Lightbulb,
    title: "Career Transition Guide",
    desc: "Thinking of switching industries? Our alumni share their experiences and tips for successful career pivots.",
    tags: ["Career Change", "Networking", "Upskilling"],
  },
  {
    icon: BookOpen,
    title: "Industry Insights",
    desc: "Stay ahead with the latest trends, salary benchmarks, and growth opportunities across various industries.",
    tags: ["Trends", "Salary", "Growth"],
  },
];

const tips = [
  "Build a strong professional network early in your career",
  "Continuously upskill with online courses and certifications",
  "Seek mentorship from experienced professionals in your field",
  "Set clear short-term and long-term career goals",
  "Develop both technical and soft skills equally",
  "Stay updated with industry trends and emerging technologies",
  "Attend networking events and alumni meetups regularly",
  "Maintain a strong online presence on professional platforms",
];

export default function CareerGuidance() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Career Guidance"
        subtitle="Navigate your career path with confidence using resources, insights, and advice from our alumni community."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      {/* Resources */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Resources
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
              Career Development Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Curated guides and resources to help you at every stage of your
              career journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resources.map((r) => (
              <Card key={r.title} className="card-hover shadow-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <r.icon className="w-6 h-6 text-forest" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {r.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {r.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Pro Tips
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                Career Success Tips from Our Alumni
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our most successful alumni share the habits and strategies that
                helped them build outstanding careers.
              </p>
              <ul className="space-y-3">
                {tips.map((tip, i) => (
                  <li
                    key={tip.substring(0, 20)}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <Card className="shadow-card border-0 bg-forest text-white">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-3">
                    Looking for a Mentor?
                  </h3>
                  <p className="text-green-100 text-sm mb-4">
                    Connect with experienced alumni who can provide personalized
                    career guidance and support.
                  </p>
                  <Link to="/career/mentorship">
                    <Button className="bg-gold hover:bg-gold-dark text-forest-dark font-semibold rounded-full">
                      Find a Mentor
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    Explore Opportunities
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Browse job openings and internships posted by fellow alumni
                    and partner companies.
                  </p>
                  <div className="flex gap-3">
                    <Link to="/career/jobs">
                      <Button
                        variant="outline"
                        className="border-forest text-forest hover:bg-forest hover:text-white rounded-full text-sm"
                      >
                        Job Portal
                      </Button>
                    </Link>
                    <Link to="/career/internships">
                      <Button
                        variant="outline"
                        className="border-forest text-forest hover:bg-forest hover:text-white rounded-full text-sm"
                      >
                        Internships
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
