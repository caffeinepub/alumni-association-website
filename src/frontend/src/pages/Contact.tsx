import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import HeroSection from "../components/HeroSection";
import { useSubmitFeedback } from "../hooks/useQueries";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 University Avenue, Greenfield Campus, State 400001",
  },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: Mail, label: "Email", value: "alumni@greenfield.edu" },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Monday – Friday, 9:00 AM – 5:00 PM",
  },
];

export default function Contact() {
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
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitFeedback.mutateAsync({
        id: `contact-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || "General Inquiry",
        message: form.message.trim(),
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="pt-16">
      <HeroSection
        title="Contact Us"
        subtitle="Have questions or want to get in touch? We'd love to hear from you."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Get In Touch
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                We're Here to Help
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you have questions about membership, events, or just
                want to reconnect with the alumni community, our team is ready
                to assist you.
              </p>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-forest uppercase tracking-wider mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-cream-100 rounded-2xl">
                <h3 className="font-semibold text-foreground mb-2">
                  Quick Links
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "FAQs", href: "/faqs" },
                    { label: "Feedback Form", href: "/feedback" },
                    { label: "Join Alumni", href: "/register" },
                    { label: "Events", href: "/events/upcoming" },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm text-forest hover:underline"
                    >
                      → {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {submitted ? (
              <Card className="shadow-card border-0">
                <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-forest" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    variant="outline"
                    className="border-forest text-forest hover:bg-forest hover:text-white rounded-full"
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-5">
                    Send Us a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
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
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitFeedback.isPending}
                      className="w-full bg-forest hover:bg-forest-dark text-white rounded-full py-3"
                    >
                      {submitFeedback.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
