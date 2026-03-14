import { Card, CardContent } from "@/components/ui/card";
import { Compass, Eye, Star, Target } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

const objectives = [
  "Foster lifelong connections among alumni and the institution",
  "Support career development through networking and mentorship",
  "Promote academic excellence and scholarship programs",
  "Encourage community service and social responsibility",
  "Celebrate and recognize alumni achievements globally",
  "Bridge the gap between industry and academia",
];

const visionPoints = [
  {
    icon: Star,
    title: "Global Leadership",
    desc: "To be recognized as the most impactful alumni network in the region, producing leaders who shape industries and communities.",
  },
  {
    icon: Compass,
    title: "Innovation Hub",
    desc: "To create an ecosystem where alumni collaborate on cutting-edge projects and entrepreneurial ventures.",
  },
  {
    icon: Target,
    title: "Social Impact",
    desc: "To leverage the collective power of our alumni to drive meaningful social change and community development.",
  },
  {
    icon: Eye,
    title: "Inclusive Growth",
    desc: "To ensure every alumnus, regardless of background, has access to the resources and opportunities they need to thrive.",
  },
];

export default function MissionVision() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Mission & Vision"
        subtitle="Guided by purpose, driven by passion — our mission and vision define who we are and where we're headed."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[50vh]"
      />

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Empowering Alumni to Lead, Inspire & Transform
              </h2>
              <div className="bg-forest/5 border-l-4 border-forest rounded-r-xl p-6 mb-6">
                <p className="text-lg text-foreground font-medium italic leading-relaxed">
                  "To build and sustain a vibrant alumni community that fosters
                  lifelong learning, professional growth, and meaningful
                  contributions to society — connecting graduates with their
                  alma mater and with each other across generations."
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our mission drives every program, event, and initiative we
                undertake. We are committed to creating tangible value for our
                members while honoring the legacy of our institution.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Strategic Objectives
              </h3>
              {objectives.map((obj, i) => (
                <div
                  key={obj.substring(0, 20)}
                  className="flex items-start gap-3 p-3 bg-cream-100 rounded-xl"
                >
                  <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Eye className="w-4 h-4" />
              Our Vision
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              A Future We're Building Together
            </h2>
            <div className="max-w-3xl mx-auto bg-forest text-white rounded-2xl p-8 mb-8">
              <p className="text-xl font-serif italic leading-relaxed">
                "To be the world's most connected and impactful alumni network —
                a community where every graduate finds purpose, opportunity, and
                belonging."
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {visionPoints.map((v) => (
              <Card key={v.title} className="card-hover shadow-card border-0">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <v.icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Banner */}
      <section className="py-16 bg-forest-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold mb-3">
              Our Core Values
            </h2>
            <p className="text-green-200">
              The principles that guide our every action
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {["Integrity", "Excellence", "Inclusivity", "Innovation"].map(
              (value) => (
                <div key={value} className="bg-forest/50 rounded-xl p-5">
                  <div className="text-gold font-serif text-xl font-bold mb-1">
                    {value}
                  </div>
                  <div className="w-8 h-0.5 bg-gold mx-auto" />
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
