import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Building,
  CheckCircle,
  Heart,
  Target,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import HeroSection from "../components/HeroSection";

const causes = [
  {
    icon: BookOpen,
    title: "Scholarship Fund",
    desc: "Support deserving students with financial assistance to pursue their academic dreams.",
    raised: 85,
    goal: "₹50 Lakhs",
  },
  {
    icon: Building,
    title: "Campus Infrastructure",
    desc: "Help build state-of-the-art facilities and laboratories for future generations.",
    raised: 62,
    goal: "₹1 Crore",
  },
  {
    icon: Users,
    title: "Alumni Events Fund",
    desc: "Enable us to organize more impactful events, reunions, and networking opportunities.",
    raised: 45,
    goal: "₹20 Lakhs",
  },
  {
    icon: Target,
    title: "Research & Innovation",
    desc: "Fund cutting-edge research projects and innovation labs at the university.",
    raised: 30,
    goal: "₹75 Lakhs",
  },
];

const amounts = ["₹500", "₹1,000", "₹2,500", "₹5,000", "₹10,000", "Custom"];

export default function Donations() {
  const [selectedAmount, setSelectedAmount] = useState("₹1,000");
  const [selectedCause, setSelectedCause] = useState("Scholarship Fund");
  const [donated, setDonated] = useState(false);

  const handleDonate = () => {
    setDonated(true);
  };

  if (donated) {
    return (
      <div className="pt-16 min-h-screen bg-cream-100 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-card border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-forest fill-forest" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Thank You!
            </h2>
            <p className="text-muted-foreground mb-2">
              Your generous contribution of <strong>{selectedAmount}</strong> to
              the <strong>{selectedCause}</strong> has been recorded.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              (This is a simulated donation. No actual payment has been
              processed.)
            </p>
            <Button
              onClick={() => setDonated(false)}
              variant="outline"
              className="border-forest text-forest hover:bg-forest hover:text-white rounded-full"
            >
              Make Another Donation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <HeroSection
        title="Support Our Community"
        subtitle="Your generosity helps us build a stronger alumni community and support the next generation of leaders."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      {/* Causes */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
              Choose a Cause
            </h2>
            <p className="text-muted-foreground">
              Every contribution, big or small, makes a meaningful difference.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {causes.map((cause) => (
              <Card
                key={cause.title}
                className={`card-hover shadow-card border-2 cursor-pointer transition-all ${selectedCause === cause.title ? "border-forest" : "border-transparent"}`}
                onClick={() => setSelectedCause(cause.title)}
              >
                <CardContent className="p-5">
                  <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center mb-3">
                    <cause.icon className="w-5 h-5 text-forest" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {cause.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {cause.desc}
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{cause.raised}% raised</span>
                      <span>Goal: {cause.goal}</span>
                    </div>
                    <div className="w-full bg-cream-200 rounded-full h-1.5">
                      <div
                        className="bg-forest h-1.5 rounded-full transition-all"
                        style={{ width: `${cause.raised}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Donation Amount */}
          <div className="max-w-lg mx-auto">
            <Card className="shadow-card border-0">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                  Donating to:{" "}
                  <span className="text-forest">{selectedCause}</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select an amount:
                </p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {amounts.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                        selectedAmount === amt
                          ? "border-forest bg-forest text-white"
                          : "border-cream-200 text-foreground hover:border-forest hover:text-forest"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-amber-700">
                    ⚠️ This is a demonstration only. No actual payment will be
                    processed.
                  </p>
                </div>
                <Button
                  onClick={handleDonate}
                  className="w-full bg-forest hover:bg-forest-dark text-white rounded-full py-3 font-semibold"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate {selectedAmount}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
