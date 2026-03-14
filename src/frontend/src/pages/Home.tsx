import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  Globe,
  Users,
} from "lucide-react";
import React from "react";
import { EventType } from "../backend";
import EventCard from "../components/EventCard";
import HeroSection from "../components/HeroSection";
import TestimonialCard from "../components/TestimonialCard";
import { useGetAllEvents } from "../hooks/useQueries";
import { useGetAllAlumniProfiles } from "../hooks/useQueries";

const services = [
  {
    icon: Users,
    title: "Alumni Network",
    desc: "Connect with thousands of graduates across the globe and build lasting professional relationships.",
    href: "/alumni/directory",
  },
  {
    icon: Briefcase,
    title: "Career Portal",
    desc: "Explore job opportunities, internships, and mentorship programs posted by fellow alumni.",
    href: "/career/jobs",
  },
  {
    icon: Calendar,
    title: "Events & Reunions",
    desc: "Stay updated on upcoming events, reunions, webinars, and workshops organized by the association.",
    href: "/events/upcoming",
  },
  {
    icon: BookOpen,
    title: "Knowledge Hub",
    desc: "Access career guidance resources, industry insights, and professional development materials.",
    href: "/career/guidance",
  },
  {
    icon: Award,
    title: "Notable Alumni",
    desc: "Celebrate the achievements of distinguished graduates who have made a mark in their fields.",
    href: "/alumni/notable",
  },
  {
    icon: Globe,
    title: "Discussion Forum",
    desc: "Engage in meaningful conversations, share experiences, and collaborate with the alumni community.",
    href: "/forum",
  },
];

const staticTestimonials = [
  {
    text: "The alumni network helped me land my dream job at a Fortune 500 company. The connections I made here are invaluable.",
    author: "Priya Sharma",
    role: "Software Engineer",
    batch: "2018",
  },
  {
    text: "Being part of this association has opened doors I never imagined. The mentorship program changed my career trajectory completely.",
    author: "Rahul Mehta",
    role: "Entrepreneur",
    batch: "2015",
  },
  {
    text: "The events and reunions keep me connected to my roots. It's wonderful to see how far we've all come together.",
    author: "Ananya Patel",
    role: "Doctor",
    batch: "2012",
  },
];

const stats = [
  { value: "15,000+", label: "Alumni Members" },
  { value: "50+", label: "Countries" },
  { value: "200+", label: "Events Annually" },
  { value: "95%", label: "Employment Rate" },
];

export default function Home() {
  const { data: events = [] } = useGetAllEvents();
  const { data: alumniProfiles = [] } = useGetAllAlumniProfiles();

  const upcomingEvents = events
    .filter((e) => {
      const typeKey =
        typeof e.eventType === "object"
          ? Object.keys(e.eventType)[0]
          : String(e.eventType);
      return typeKey === "upcoming";
    })
    .slice(0, 3);

  const testimonialAlumni = alumniProfiles
    .filter((a) => a.testimonials && a.testimonials.length > 0)
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Building Futures Together"
        subtitle="Join a vibrant community of 15,000+ alumni across 50+ countries. Connect, grow, and give back to the institution that shaped your journey."
        ctaText="Join Alumni Network"
        ctaHref="/register"
        secondaryCtaText="Explore Community"
        secondaryCtaHref="/alumni/directory"
      />

      {/* Stats Bar */}
      <section className="bg-forest py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-serif font-bold text-gold">
                  {stat.value}
                </div>
                <div className="text-green-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                About Us
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6 leading-tight">
                A Legacy of Excellence, A Community of Leaders
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Greenfield Alumni Association has been the cornerstone of
                our graduates' professional and personal growth since 1985. We
                bring together brilliant minds from diverse fields, fostering a
                culture of collaboration, mentorship, and lifelong learning.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our mission is to strengthen the bond between the institution
                and its graduates, creating opportunities for alumni to
                contribute to the next generation of leaders while advancing
                their own careers.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Exclusive networking events and reunions",
                  "Career development and mentorship programs",
                  "Scholarship and funding opportunities",
                  "Global alumni chapters in 50+ countries",
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
              <Link to="/about">
                <Button className="bg-forest hover:bg-forest-dark text-white rounded-full px-6">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-hero">
                <img
                  src="/assets/generated/about-alumni.dim_800x500.png"
                  alt="Alumni Community"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gold rounded-xl p-4 shadow-lg">
                <div className="text-forest-dark font-serif font-bold text-2xl">
                  40+
                </div>
                <div className="text-forest-dark text-xs font-medium">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Our Services
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Everything You Need to Thrive
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From career opportunities to community events, we provide
              comprehensive support for every stage of your professional
              journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} to={service.href}>
                <Card className="card-hover shadow-card border-0 h-full group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-forest group-hover:text-white transition-colors">
                      <service.icon className="w-6 h-6 text-forest group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-white/10 text-green-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Our Mission
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            "Empowering Alumni to Lead, Inspire, and Transform the World"
          </h2>
          <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
            We are committed to fostering a lifelong connection between our
            graduates and their alma mater, creating a powerful network that
            drives innovation, supports community development, and celebrates
            the achievements of every member.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mission-vision">
              <Button className="bg-gold hover:bg-gold-dark text-forest-dark font-semibold rounded-full px-8">
                Read Our Mission
              </Button>
            </Link>
            <Link to="/contributions/donate">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-forest-dark rounded-full px-8"
              >
                Support Our Cause
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Alumni Voices
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              What Our Alumni Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our graduates about how the alumni association has
              impacted their lives and careers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialAlumni.length > 0
              ? testimonialAlumni.map((alumni) => (
                  <TestimonialCard
                    key={alumni.id}
                    text={alumni.testimonials[0]}
                    author={alumni.name}
                    role={alumni.profession}
                    batch={String(alumni.batchYear)}
                  />
                ))
              : staticTestimonials.map((t) => (
                  <TestimonialCard
                    key={t.author}
                    text={t.text}
                    author={t.author}
                    role={t.role}
                    batch={t.batch}
                  />
                ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/alumni/testimonials">
              <Button
                variant="outline"
                className="border-forest text-forest hover:bg-forest hover:text-white rounded-full px-6"
              >
                View All Testimonials
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Upcoming Events
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                Don't Miss Out
              </h2>
            </div>
            <Link to="/events/upcoming">
              <Button
                variant="outline"
                className="border-forest text-forest hover:bg-forest hover:text-white rounded-full"
              >
                View All Events
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <Calendar className="w-12 h-12 text-forest/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                No upcoming events at the moment. Check back soon!
              </p>
              <Link to="/events/upcoming" className="mt-4 inline-block">
                <Button
                  variant="outline"
                  className="border-forest text-forest hover:bg-forest hover:text-white rounded-full mt-4"
                >
                  Browse All Events
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Get In Touch
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                We'd Love to Hear From You
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Have questions about the alumni association? Want to reconnect
                with old friends or explore opportunities? Reach out to us and
                we'll get back to you promptly.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: "📍",
                    label: "Address",
                    value: "123 University Avenue, Greenfield Campus",
                  },
                  { icon: "📞", label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: "✉️", label: "Email", value: "alumni@greenfield.edu" },
                  {
                    icon: "🕐",
                    label: "Office Hours",
                    value: "Mon–Fri, 9:00 AM – 5:00 PM",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-forest uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ContactFormInline />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactFormInline() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="shadow-card border-0">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-forest" />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-2">
            Message Sent!
          </h3>
          <p className="text-muted-foreground text-sm">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="mt-4 border-forest text-forest hover:bg-forest hover:text-white rounded-full"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card border-0">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className="text-sm font-medium text-foreground mb-1 block"
              >
                Name *
              </label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 bg-background"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="text-sm font-medium text-foreground mb-1 block"
              >
                Email *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 bg-background"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="contact-subject"
              className="text-sm font-medium text-foreground mb-1 block"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              className="w-full px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 bg-background"
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="text-sm font-medium text-foreground mb-1 block"
            >
              Message *
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Your message..."
              className="w-full px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 bg-background resize-none"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-forest hover:bg-forest-dark text-white rounded-full"
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
