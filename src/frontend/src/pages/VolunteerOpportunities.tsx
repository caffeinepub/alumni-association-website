import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Heart } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";

const opportunities = [
  {
    title: "Event Coordinator",
    desc: "Help organize and manage alumni events, reunions, and workshops.",
    commitment: "5–10 hrs/month",
    skills: ["Organization", "Communication"],
  },
  {
    title: "Mentor",
    desc: "Guide recent graduates and current students in their career journeys.",
    commitment: "2–4 hrs/month",
    skills: ["Leadership", "Industry Expertise"],
  },
  {
    title: "Content Creator",
    desc: "Create engaging content for our newsletter, social media, and website.",
    commitment: "3–5 hrs/month",
    skills: ["Writing", "Design"],
  },
  {
    title: "Career Counselor",
    desc: "Provide career advice and resume reviews to alumni seeking guidance.",
    commitment: "2–3 hrs/month",
    skills: ["HR", "Career Coaching"],
  },
  {
    title: "Chapter Lead",
    desc: "Lead an alumni chapter in your city and organize local networking events.",
    commitment: "8–12 hrs/month",
    skills: ["Leadership", "Networking"],
  },
  {
    title: "Tech Volunteer",
    desc: "Help maintain and improve the alumni portal and digital infrastructure.",
    commitment: "4–6 hrs/month",
    skills: ["Technology", "Development"],
  },
];

function VolunteerContent() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    opportunity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.opportunity) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Volunteer application submitted!");
  };

  return (
    <div>
      {/* Opportunities Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
              Volunteer Opportunities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Give back to the community that shaped you. Choose from a variety
              of volunteer roles that match your skills and availability.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <Card key={opp.title} className="card-hover shadow-card border-0">
                <CardContent className="p-5">
                  <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center mb-3">
                    <Heart className="w-5 h-5 text-forest" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                    {opp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {opp.desc}
                  </p>
                  <div className="text-xs text-forest font-medium mb-2">
                    ⏱ {opp.commitment}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {opp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-up Form */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <Card className="shadow-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-forest" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Application Received!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your interest in volunteering! Our team will
                  review your application and get in touch within 3–5 business
                  days.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="border-forest text-forest hover:bg-forest hover:text-white rounded-full"
                >
                  Submit Another Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-card border-0">
              <CardContent className="p-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Sign Up to Volunteer
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="v-name">Full Name *</Label>
                    <Input
                      id="v-name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="v-email">Email Address *</Label>
                    <Input
                      id="v-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label>Volunteer Role *</Label>
                    <Select
                      value={form.opportunity}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, opportunity: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a volunteer role..." />
                      </SelectTrigger>
                      <SelectContent>
                        {opportunities.map((opp) => (
                          <SelectItem key={opp.title} value={opp.title}>
                            {opp.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="v-message">
                      Why do you want to volunteer?
                    </Label>
                    <Textarea
                      id="v-message"
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="Tell us about your motivation and relevant experience..."
                      rows={4}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-forest hover:bg-forest-dark text-white rounded-full py-3"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

export default function VolunteerOpportunities() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Volunteer Opportunities"
        subtitle="Give back to the community that shaped you. Make a difference through meaningful volunteer work."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <VolunteerContent />
      </ApprovalGuard>
    </div>
  );
}
