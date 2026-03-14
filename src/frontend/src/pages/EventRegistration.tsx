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
import { Calendar, CheckCircle } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import { useGetAllEvents } from "../hooks/useQueries";

function RegistrationForm() {
  const { data: events = [] } = useGetAllEvents();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", eventId: "" });

  const upcomingEvents = events.filter((e) => {
    const typeKey =
      typeof e.eventType === "object"
        ? Object.keys(e.eventType)[0]
        : String(e.eventType);
    return (
      typeKey === "upcoming" || typeKey === "reunion" || typeKey === "webinar"
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventId) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Registration successful!");
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <Card className="shadow-card border-0">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-forest" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Registration Confirmed!
            </h2>
            <p className="text-muted-foreground mb-6">
              You have successfully registered for the event. A confirmation
              will be sent to {form.email}.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="border-forest text-forest hover:bg-forest hover:text-white rounded-full"
            >
              Register for Another Event
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <Card className="shadow-card border-0">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-forest" />
            </div>
            <h2 className="font-serif text-xl font-bold text-foreground">
              Event Registration
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
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
              <Label>Select Event *</Label>
              <Select
                value={form.eventId}
                onValueChange={(v) => setForm((p) => ({ ...p, eventId: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an event..." />
                </SelectTrigger>
                <SelectContent>
                  {upcomingEvents.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No upcoming events
                    </SelectItem>
                  ) : (
                    upcomingEvents.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-forest hover:bg-forest-dark text-white rounded-full"
            >
              Register for Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EventRegistration() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Event Registration"
        subtitle="Register for upcoming events, reunions, and workshops organized by the alumni association."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <RegistrationForm />
      </ApprovalGuard>
    </div>
  );
}
