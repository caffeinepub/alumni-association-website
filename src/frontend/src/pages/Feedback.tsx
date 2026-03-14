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
import { CheckCircle, MessageSquare } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import HeroSection from "../components/HeroSection";
import { useSubmitFeedback } from "../hooks/useQueries";

const categories = [
  "General Feedback",
  "Website Issue",
  "Event Feedback",
  "Career Portal",
  "Alumni Directory",
  "Membership",
  "Suggestion",
  "Other",
];

export default function Feedback() {
  const submitFeedback = useSubmitFeedback();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.subject) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitFeedback.mutateAsync({
        id: `feedback-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setSubmitted(true);
      toast.success("Feedback submitted successfully!");
    } catch {
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="pt-16">
      <HeroSection
        title="Share Your Feedback"
        subtitle="Your feedback helps us improve the alumni experience for everyone. We value every opinion."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <Card className="shadow-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-forest" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Thank You!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your feedback has been submitted successfully. We appreciate
                  you taking the time to share your thoughts with us.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  variant="outline"
                  className="border-forest text-forest hover:bg-forest hover:text-white rounded-full"
                >
                  Submit More Feedback
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-card border-0">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground">
                      Feedback Form
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Help us serve you better
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fb-name">Full Name *</Label>
                      <Input
                        id="fb-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fb-email">Email Address *</Label>
                      <Input
                        id="fb-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Category *</Label>
                    <Select
                      value={form.subject}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, subject: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fb-message">Your Feedback *</Label>
                    <Textarea
                      id="fb-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Share your thoughts, suggestions, or report an issue..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitFeedback.isPending}
                    className="w-full bg-forest hover:bg-forest-dark text-white rounded-full py-3"
                  >
                    {submitFeedback.isPending
                      ? "Submitting..."
                      : "Submit Feedback"}
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
