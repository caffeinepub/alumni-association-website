import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { GraduationCap, Heart, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { toast } from "sonner";
import { useSubscribeToNewsletter } from "../hooks/useQueries";

export default function Footer() {
  const [email, setEmail] = useState("");
  const subscribeMutation = useSubscribeToNewsletter();
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    window.location.hostname || "alumni-association",
  );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await subscribeMutation.mutateAsync(email.trim());
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer className="bg-forest-dark text-white">
      {/* Newsletter Banner */}
      <div className="bg-forest border-b border-forest-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                Stay Connected
              </h3>
              <p className="text-green-200 text-sm">
                Subscribe to our newsletter for the latest alumni news and
                events.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 w-full md:w-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-green-300 focus:border-gold min-w-64"
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
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-forest-dark" />
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-white">
                  Greenfield
                </div>
                <div className="text-green-300 text-xs">Alumni Association</div>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-4">
              Connecting generations of graduates, fostering lifelong bonds, and
              building futures together since 1985.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: SiFacebook, href: "#" },
                { Icon: SiX, href: "#" },
                { Icon: SiLinkedin, href: "#" },
                { Icon: SiInstagram, href: "#" },
                { Icon: SiYoutube, href: "#" },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-green-200 hover:bg-gold hover:text-forest-dark transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Mission & Vision", href: "/mission-vision" },
                { label: "Alumni Directory", href: "/alumni/directory" },
                { label: "Upcoming Events", href: "/events/upcoming" },
                { label: "Job Portal", href: "/career/jobs" },
                { label: "News & Announcements", href: "/news" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-green-200 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2">
              {[
                { label: "FAQs", href: "/faqs" },
                { label: "Contact Us", href: "/contact" },
                { label: "Feedback", href: "/feedback" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Sitemap", href: "/sitemap" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-green-200 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-green-200 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                <span>
                  123 University Avenue, Greenfield Campus, State 400001
                </span>
              </li>
              <li className="flex items-center gap-2 text-green-200 text-sm">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-green-200 text-sm">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>alumni@greenfield.edu</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-green-300 text-xs">
            © {year} Greenfield Alumni Association. All rights reserved.
          </p>
          <p className="text-green-300 text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-gold fill-gold" /> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
