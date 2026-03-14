import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

export default function MessageFromPrincipal() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Message from the Principal"
        subtitle="A heartfelt message from our institution's leader to the alumni community."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[50vh]"
      />

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Principal Photo & Info */}
            <div className="lg:col-span-1">
              <Card className="shadow-card border-0 overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-forest/20 to-forest/40 flex items-center justify-center">
                  <div className="w-32 h-32 bg-forest/20 rounded-full flex items-center justify-center">
                    <span className="text-forest font-serif font-bold text-5xl">
                      P
                    </span>
                  </div>
                </div>
                <CardContent className="p-5 text-center">
                  <h3 className="font-serif font-bold text-xl text-foreground">
                    Prof. Dr. James Anderson
                  </h3>
                  <p className="text-forest text-sm font-medium mt-1">
                    Principal & Vice-Chancellor
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Greenfield University
                  </p>
                  <div className="mt-3 pt-3 border-t border-cream-200">
                    <p className="text-xs text-muted-foreground">
                      Ph.D. in Educational Leadership
                    </p>
                    <p className="text-xs text-muted-foreground">
                      25+ years in academia
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message */}
            <div className="lg:col-span-2">
              <div className="inline-block bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Principal's Message
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Dear Alumni Family,
              </h2>

              <div className="bg-forest/5 border-l-4 border-gold rounded-r-xl p-5 mb-6">
                <Quote className="w-8 h-8 text-gold/40 mb-2" />
                <p className="text-lg font-serif italic text-foreground leading-relaxed">
                  "Our alumni are our greatest achievement — living proof that
                  education has the power to transform lives and shape the
                  future."
                </p>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It is with immense pride and joy that I address you — the
                  distinguished alumni of Greenfield University. Each one of you
                  carries with you the values, knowledge, and spirit that define
                  our institution, and you continue to make us proud every
                  single day.
                </p>
                <p>
                  The journey you undertook within these walls was just the
                  beginning. The real measure of our success as an institution
                  lies in what you have accomplished beyond our campus — in your
                  careers, your communities, and your contributions to society.
                </p>
                <p>
                  The Alumni Association plays a vital role in keeping this
                  family connected. Through its programs, events, and
                  initiatives, it creates bridges between generations of
                  graduates and between our institution and the wider world. I
                  am deeply grateful to the dedicated team that makes this
                  possible.
                </p>
                <p>
                  I encourage each of you to stay engaged with your alma mater —
                  not just as recipients of the education you received, but as
                  active contributors to the ongoing story of Greenfield
                  University. Mentor our current students, share your expertise,
                  and help us build an even stronger institution for the
                  generations to come.
                </p>
                <p>
                  Together, we are not just building careers — we are building
                  futures. And together, there is nothing we cannot achieve.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-cream-200">
                <p className="font-serif font-bold text-foreground text-lg">
                  Prof. Dr. James Anderson
                </p>
                <p className="text-forest text-sm">
                  Principal & Vice-Chancellor, Greenfield University
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
