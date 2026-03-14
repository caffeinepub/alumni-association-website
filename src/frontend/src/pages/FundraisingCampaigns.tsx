import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import { Calendar, Target, Users } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

const campaigns = [
  {
    title: "Merit Scholarship 2025",
    desc: "Help fund scholarships for 50 deserving students from underprivileged backgrounds to pursue higher education at Greenfield University.",
    goal: 5000000,
    raised: 3750000,
    donors: 342,
    deadline: "March 31, 2025",
    category: "Education",
  },
  {
    title: "New Science Laboratory",
    desc: "Build a state-of-the-art science laboratory equipped with modern instruments to enhance practical learning for students.",
    goal: 10000000,
    raised: 4200000,
    donors: 218,
    deadline: "June 30, 2025",
    category: "Infrastructure",
  },
  {
    title: "Alumni Sports Complex",
    desc: "Construct a multi-purpose sports complex to promote physical fitness and sports culture among students and alumni.",
    goal: 15000000,
    raised: 2800000,
    donors: 156,
    deadline: "December 31, 2025",
    category: "Sports",
  },
  {
    title: "Digital Library Initiative",
    desc: "Create a comprehensive digital library with access to thousands of academic journals, e-books, and research papers.",
    goal: 3000000,
    raised: 2100000,
    donors: 289,
    deadline: "April 30, 2025",
    category: "Technology",
  },
];

function formatAmount(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString()}`;
}

export default function FundraisingCampaigns() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Fundraising Campaigns"
        subtitle="Join our active campaigns and help us build a better future for students and the institution."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
              Active Campaigns
            </h2>
            <p className="text-muted-foreground">
              Support a cause that resonates with you and make a lasting impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((campaign) => {
              const percentage = Math.round(
                (campaign.raised / campaign.goal) * 100,
              );
              return (
                <Card
                  key={campaign.title}
                  className="card-hover shadow-card border-0 overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-forest to-forest-light" />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-serif font-bold text-xl text-foreground">
                        {campaign.title}
                      </h3>
                      <span className="text-xs bg-forest/10 text-forest px-2 py-1 rounded-full whitespace-nowrap font-medium">
                        {campaign.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {campaign.desc}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-forest">
                          {formatAmount(campaign.raised)} raised
                        </span>
                        <span className="text-muted-foreground">
                          Goal: {formatAmount(campaign.goal)}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {percentage}% of goal reached
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-forest" />
                          {campaign.donors} donors
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-forest" />
                          Ends {campaign.deadline}
                        </span>
                      </div>
                      <Link to="/contributions/donate">
                        <Button
                          size="sm"
                          className="bg-forest hover:bg-forest-dark text-white rounded-full"
                        >
                          Donate Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
