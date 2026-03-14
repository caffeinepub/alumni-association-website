import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import React from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  minHeight?: string;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage = "/assets/generated/hero-bg.dim_1920x1080.png",
  ctaText,
  ctaHref = "/register",
  secondaryCtaText,
  secondaryCtaHref = "/about",
  minHeight = "min-h-screen",
}: HeroSectionProps) {
  return (
    <section
      className={`relative ${minHeight} flex items-center justify-center overflow-hidden`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Green tint overlay */}
      <div className="absolute inset-0 bg-forest-dark/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-sm font-medium">
              Greenfield Alumni Association
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaText && (
                <Link to={ctaHref}>
                  <Button className="bg-gold hover:bg-gold-dark text-forest-dark font-bold px-8 py-3 rounded-full text-base shadow-lg hover:shadow-xl transition-all">
                    {ctaText}
                  </Button>
                </Link>
              )}
              {secondaryCtaText && (
                <Link to={secondaryCtaHref}>
                  <Button
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-forest-dark font-semibold px-8 py-3 rounded-full text-base transition-all"
                  >
                    {secondaryCtaText}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
        >
          <path
            d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z"
            fill="oklch(0.98 0.005 150)"
          />
        </svg>
      </div>
    </section>
  );
}
