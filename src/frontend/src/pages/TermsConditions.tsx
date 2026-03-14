import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using the Greenfield Alumni Association platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
  },
  {
    title: "2. Membership Eligibility",
    content:
      "Membership in the Greenfield Alumni Association is open to all graduates of Greenfield University. Current students, faculty, and staff may be eligible for associate membership. All members must provide accurate and truthful information during registration.",
  },
  {
    title: "3. User Conduct",
    content: `Members agree to use the platform in a respectful and lawful manner. The following activities are strictly prohibited:

• Posting false, misleading, or defamatory content
• Harassing, threatening, or intimidating other members
• Sharing confidential information of other members without consent
• Using the platform for commercial solicitation without authorization
• Attempting to gain unauthorized access to the system
• Violating any applicable laws or regulations`,
  },
  {
    title: "4. Content and Intellectual Property",
    content:
      "Members retain ownership of content they post on the platform. By posting content, you grant the Alumni Association a non-exclusive, royalty-free license to use, display, and distribute that content in connection with our services. You are responsible for ensuring you have the right to share any content you post.",
  },
  {
    title: "5. Privacy",
    content:
      "Your use of the platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.",
  },
  {
    title: "6. Account Termination",
    content:
      "The Alumni Association reserves the right to suspend or terminate accounts that violate these terms, engage in inappropriate behavior, or for any other reason at our discretion. Members may also request account deletion at any time.",
  },
  {
    title: "7. Disclaimer of Warranties",
    content:
      'The platform is provided "as is" without any warranties, express or implied. The Alumni Association does not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components.',
  },
  {
    title: "8. Limitation of Liability",
    content:
      "The Alumni Association shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service, even if we have been advised of the possibility of such damages.",
  },
  {
    title: "9. Changes to Terms",
    content:
      "We reserve the right to modify these terms at any time. We will notify members of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the new terms.",
  },
  {
    title: "10. Governing Law",
    content:
      "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Greenfield University is located, without regard to its conflict of law provisions.",
  },
];

export default function TermsConditions() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using the Greenfield Alumni Association platform."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-forest" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Last Updated: January 1, 2025
              </p>
              <p className="text-sm text-muted-foreground">
                Effective Date: January 1, 2025
              </p>
            </div>
          </div>

          <Card className="shadow-card border-0 mb-6">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to the Greenfield Alumni Association. These Terms and
                Conditions govern your use of our website and services. By
                registering as a member or using our platform, you agree to
                comply with and be bound by these terms.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {sections.map((section) => (
              <Card key={section.title} className="shadow-card border-0">
                <CardContent className="p-6">
                  <h3 className="font-serif font-bold text-lg text-foreground mb-3">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 shadow-card border-0 bg-cream-100">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Questions about our Terms? Contact us at{" "}
                <a
                  href="mailto:legal@greenfield.edu"
                  className="text-forest hover:underline font-medium"
                >
                  legal@greenfield.edu
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
