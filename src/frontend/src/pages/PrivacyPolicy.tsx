import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you register for an account, create or modify your profile, and use our services. This includes:
    
• Personal identification information (name, email address)
• Academic information (batch year, department)
• Professional information (current profession, bio)
• Communications you send to us through the platform

We also collect certain information automatically when you use our services, including log data, device information, and usage information.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send promotional communications (with your consent)
• Respond to your comments and questions
• Monitor and analyze trends and usage
• Detect and prevent fraudulent transactions and other illegal activities
• Personalize your experience on the platform`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except in the following circumstances:

• With your consent
• To comply with legal obligations
• To protect the rights and safety of our users and the public
• In connection with a merger, acquisition, or sale of assets

Alumni directory information is visible to other registered and approved alumni members as part of the core functionality of the platform.`,
  },
  {
    title: "4. Data Security",
    content: `Your data is stored on the Internet Computer blockchain, which provides strong cryptographic security guarantees. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.`,
  },
  {
    title: "5. Your Rights",
    content: `You have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate data
• Request deletion of your account and associated data
• Opt out of marketing communications
• Data portability

To exercise these rights, please contact us at privacy@greenfield.edu.`,
  },
  {
    title: "6. Cookies and Tracking",
    content:
      "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.",
  },
  {
    title: "7. Changes to This Policy",
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.`,
  },
  {
    title: "8. Contact Us",
    content: `If you have any questions about this Privacy Policy, please contact us at:

Email: privacy@greenfield.edu
Address: 123 University Avenue, Greenfield Campus, State 400001
Phone: +1 (555) 123-4567`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Privacy Policy"
        subtitle="We are committed to protecting your privacy and ensuring the security of your personal information."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-forest" />
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
                This Privacy Policy describes how Greenfield Alumni Association
                ("we," "us," or "our") collects, uses, and shares information
                about you when you use our website and services. By using our
                services, you agree to the collection and use of information in
                accordance with this policy.
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
        </div>
      </section>
    </div>
  );
}
