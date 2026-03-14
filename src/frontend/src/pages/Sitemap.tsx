import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Map as MapIcon } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

const sitemapData = [
  {
    category: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About Alumni Association", href: "/about" },
      { label: "Mission & Vision", href: "/mission-vision" },
      { label: "Message from Principal", href: "/principal-message" },
      { label: "Alumni Success Stories", href: "/success-stories" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    category: "Alumni Community",
    links: [
      { label: "Alumni Directory", href: "/alumni/directory" },
      { label: "Search Alumni", href: "/alumni/search" },
      { label: "Batch-wise Alumni List", href: "/alumni/batches" },
      { label: "Notable Alumni", href: "/alumni/notable" },
      { label: "Alumni Testimonials", href: "/alumni/testimonials" },
      { label: "Discussion Forum", href: "/forum" },
    ],
  },
  {
    category: "Events & Activities",
    links: [
      { label: "Upcoming Events", href: "/events/upcoming" },
      { label: "Past Events", href: "/events/past" },
      { label: "Reunion Meet Details", href: "/events/reunions" },
      { label: "Event Registration", href: "/events/register" },
      { label: "Photo Gallery", href: "/gallery/photos" },
      { label: "Video Gallery", href: "/gallery/videos" },
      { label: "Webinars & Workshops", href: "/events/webinars" },
    ],
  },
  {
    category: "Career & Opportunities",
    links: [
      { label: "Job Portal", href: "/career/jobs" },
      { label: "Internship Opportunities", href: "/career/internships" },
      { label: "Mentorship Program", href: "/career/mentorship" },
      { label: "Career Guidance", href: "/career/guidance" },
      { label: "Post a Job", href: "/career/post-job" },
    ],
  },
  {
    category: "Contributions & Updates",
    links: [
      { label: "Donations", href: "/contributions/donate" },
      { label: "Fundraising Campaigns", href: "/contributions/campaigns" },
      { label: "Newsletter", href: "/contributions/newsletter" },
      { label: "News & Announcements", href: "/news" },
      { label: "Volunteer Opportunities", href: "/contributions/volunteer" },
    ],
  },
  {
    category: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Join Alumni (Register)", href: "/register" },
    ],
  },
  {
    category: "Legal & Info",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Feedback Form", href: "/feedback" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Sitemap"
        subtitle="A complete overview of all pages and sections available on the Greenfield Alumni Association website."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
              <MapIcon className="w-5 h-5 text-forest" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              All Pages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sitemapData.map((section) => (
              <Card key={section.category} className="shadow-card border-0">
                <CardContent className="p-5">
                  <h3 className="font-serif font-bold text-foreground mb-3 pb-2 border-b border-cream-200 flex items-center gap-2">
                    <span className="w-2 h-5 bg-forest rounded-full" />
                    {section.category}
                  </h3>
                  <ul className="space-y-1.5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-forest transition-colors group"
                        >
                          <ChevronRight className="w-3 h-3 text-forest/40 group-hover:text-forest transition-colors" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
