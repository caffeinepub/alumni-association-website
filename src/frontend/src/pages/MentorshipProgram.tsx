import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Star, Users } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import { useGetAllAlumniProfiles } from "../hooks/useQueries";

const howItWorks = [
  {
    step: "1",
    title: "Browse Mentors",
    desc: "Explore profiles of experienced alumni mentors across various industries.",
  },
  {
    step: "2",
    title: "Send a Request",
    desc: "Fill out the mentorship request form with your goals and expectations.",
  },
  {
    step: "3",
    title: "Get Matched",
    desc: "Our team reviews your request and connects you with the best-fit mentor.",
  },
  {
    step: "4",
    title: "Start Growing",
    desc: "Begin your mentorship journey with regular sessions and guidance.",
  },
];

function MentorshipContent() {
  const { data: alumni = [], isLoading } = useGetAllAlumniProfiles();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    mentorId: "",
  });

  const mentors = alumni.filter((a) => a.notable);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Mentorship request submitted successfully!");
  };

  return (
    <div>
      {/* How It Works */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Our mentorship program connects you with experienced alumni in
              just a few steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <Card
                key={item.step}
                className="shadow-card border-0 text-center"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {isLoading
                ? "Loading mentors..."
                : `${mentors.length} Available Mentors`}
            </h2>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["sk-1", "sk-2", "sk-3"].map((k) => (
                <Skeleton key={k} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : mentors.length === 0 ? (
            <div className="text-center py-10">
              <Users className="w-12 h-12 text-forest/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Mentor profiles coming soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card
                  key={mentor.id}
                  className="card-hover shadow-card border-0"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-forest font-bold text-lg">
                          {mentor.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-semibold text-foreground">
                            {mentor.name}
                          </h3>
                          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                        </div>
                        <p className="text-xs text-forest">
                          {mentor.profession}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {mentor.department} · Batch {String(mentor.batchYear)}
                        </p>
                      </div>
                    </div>
                    {mentor.bio && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {mentor.bio}
                      </p>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-forest text-forest hover:bg-forest hover:text-white rounded-full text-xs"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          mentorId: mentor.id,
                          message: `I would like to connect with ${mentor.name} for mentorship.`,
                        }))
                      }
                    >
                      Request Mentorship
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <Card className="shadow-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-forest" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Request Submitted!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your mentorship request. We'll review it and
                  connect you with a suitable mentor within 3–5 business days.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="border-forest text-forest hover:bg-forest hover:text-white rounded-full"
                >
                  Submit Another Request
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-card border-0">
              <CardContent className="p-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Request a Mentor
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="m-name">Your Name *</Label>
                    <Input
                      id="m-name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="m-email">Email Address *</Label>
                    <Input
                      id="m-email"
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
                    <Label htmlFor="m-message">Your Goals & Message *</Label>
                    <Textarea
                      id="m-message"
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="Describe your career goals and what you hope to gain from mentorship..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-forest hover:bg-forest-dark text-white rounded-full"
                  >
                    Submit Mentorship Request
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

export default function MentorshipProgram() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Mentorship Program"
        subtitle="Connect with experienced alumni mentors who can guide you through your career journey."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <MentorshipContent />
      </ApprovalGuard>
    </div>
  );
}
