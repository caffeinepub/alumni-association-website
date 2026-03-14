import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Award, CheckCircle, Globe, Heart, Users } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

const milestones = [
  {
    year: "1985",
    event: "Alumni Association founded with 200 charter members",
  },
  {
    year: "1995",
    event: "Launched the first annual reunion meet with 500+ attendees",
  },
  { year: "2005", event: "Established the Alumni Scholarship Fund" },
  { year: "2010", event: "Expanded to international chapters in 20 countries" },
  { year: "2018", event: "Launched the digital alumni portal and job board" },
  {
    year: "2024",
    event: "Reached 15,000+ registered alumni members worldwide",
  },
];

const values = [
  {
    icon: Users,
    title: "Community",
    desc: "Building a strong, inclusive network that supports every member.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Celebrating and fostering the highest standards of achievement.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Connecting alumni across borders and cultures worldwide.",
  },
  {
    icon: Heart,
    title: "Giving Back",
    desc: "Inspiring alumni to contribute to the next generation.",
  },
];

export default function About() {
  return (
    <div className="pt-16">
      <HeroSection
        title="About Our Alumni Association"
        subtitle="Four decades of connecting graduates, fostering excellence, and building a legacy of leadership."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        ctaText="Join Us Today"
        ctaHref="/register"
        secondaryCtaText="Our Mission"
        secondaryCtaHref="/mission-vision"
        minHeight="min-h-[60vh]"
      />

      {/* About Content */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Who We Are
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                A Community Built on Shared Experiences
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Greenfield Alumni Association is the official organization
                representing graduates of Greenfield University. Founded in
                1985, we have grown from a small group of dedicated alumni into
                a vibrant global community of over 15,000 members.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our association serves as the bridge between the university and
                its graduates, facilitating meaningful connections, professional
                development opportunities, and community engagement initiatives
                that benefit both alumni and current students.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe that the bonds formed during one's academic journey
                are among the most powerful and enduring. Our programs and
                events are designed to nurture these connections and create new
                ones that span generations.
              </p>
              <ul className="space-y-2">
                {[
                  "Registered non-profit organization since 1985",
                  "Governed by an elected board of alumni representatives",
                  "Chapters in 50+ countries worldwide",
                  "Annual budget supporting scholarships and programs",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-forest flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-hero">
              <img
                src="/assets/generated/about-alumni.dim_800x500.png"
                alt="Alumni Community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do as an alumni community.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card
                key={v.title}
                className="card-hover shadow-card border-0 text-center"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-forest" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground">
              Key milestones in the history of our alumni association.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-forest/20" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-center gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}
                  >
                    <Card className="shadow-card border-0 inline-block">
                      <CardContent className="p-4">
                        <div className="text-forest font-bold text-sm mb-1">
                          {m.year}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {m.event}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-forest rounded-full border-4 border-background shadow-md flex-shrink-0 z-10" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Ready to Reconnect?
          </h2>
          <p className="text-green-100 mb-8">
            Join thousands of alumni who are already part of our growing
            community.
          </p>
          <Link to="/register">
            <Button className="bg-gold hover:bg-gold-dark text-forest-dark font-semibold rounded-full px-8 py-3">
              Join the Alumni Network
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
