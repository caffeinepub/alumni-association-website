import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, CheckCircle, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import HeroSection from "../components/HeroSection";
import { useSubscribeToNewsletter } from "../hooks/useQueries";

const pastIssues = [
  {
    title: "Alumni Spotlight: Class of 2020 Achievements",
    date: "January 2025",
    desc: "Celebrating the remarkable achievements of our 2020 batch alumni across various industries.",
  },
  {
    title: "Annual Reunion 2024 Highlights",
    date: "December 2024",
    desc: "Reliving the memories from our biggest reunion yet with 2,000+ alumni in attendance.",
  },
  {
    title: "Career Opportunities: Q4 2024 Edition",
    date: "November 2024",
    desc: "Exclusive job openings and internship opportunities from alumni-led companies.",
  },
  {
    title: "Campus Updates & New Initiatives",
    date: "October 2024",
    desc: "Latest news from the university including new programs, facilities, and research breakthroughs.",
  },
  {
    title: "Mentorship Program Success Stories",
    date: "September 2024",
    desc: "How our mentorship program has transformed careers and lives of young alumni.",
  },
  {
    title: "Global Alumni Chapter Updates",
    date: "August 2024",
    desc: "News and events from our alumni chapters across 50+ countries worldwide.",
  },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const subscribeMutation = useSubscribeToNewsletter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await subscribeMutation.mutateAsync(email.trim());
      setSubscribed(true);
      toast.success("Successfully subscribed!");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="pt-16">
      <HeroSection
        title="Alumni Newsletter"
        subtitle="Stay informed with the latest news, events, and opportunities from the Greenfield Alumni Association."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      {/* Subscribe Section */}
      <section className="py-16 bg-forest">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-green-100 mb-8">
            Get the latest alumni news, event announcements, and career
            opportunities delivered to your inbox monthly.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-3 bg-white/10 rounded-xl p-4">
              <CheckCircle className="w-6 h-6 text-gold" />
              <p className="text-white font-medium">
                You're subscribed! Welcome to the community.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-green-300 focus:border-gold flex-1"
                required
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="bg-gold hover:bg-gold-dark text-forest-dark font-semibold whitespace-nowrap"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Past Issues */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Past Issues
            </h2>
            <p className="text-muted-foreground mt-1">
              Browse our newsletter archive
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastIssues.map((issue) => (
              <Card
                key={issue.title}
                className="card-hover shadow-card border-0"
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs text-forest font-medium mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {issue.date}
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2 line-clamp-2">
                    {issue.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {issue.desc}
                  </p>
                  <button
                    type="button"
                    className="mt-3 text-xs text-forest font-medium hover:underline"
                  >
                    Read Issue →
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
