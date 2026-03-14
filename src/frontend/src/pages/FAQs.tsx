import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";

const faqCategories = [
  {
    category: "Membership & Registration",
    faqs: [
      {
        q: "How do I join the Alumni Association?",
        a: 'You can join by clicking the "Join Alumni" button in the navigation bar. You will need to log in with your credentials and complete your alumni profile with details like your batch year, department, and current profession.',
      },
      {
        q: "Is membership free?",
        a: "Basic membership is completely free for all graduates of Greenfield University. We also offer premium membership tiers with additional benefits for those who wish to contribute more to the association.",
      },
      {
        q: "Can I update my profile information after registration?",
        a: "Yes, you can update your profile information at any time by logging into your account and navigating to your profile settings.",
      },
      {
        q: "What happens after I register?",
        a: "After registration, your account will be reviewed by an administrator. Once approved, you will have full access to all alumni features including the directory, forum, and career portal.",
      },
    ],
  },
  {
    category: "Events & Activities",
    faqs: [
      {
        q: "How do I register for an event?",
        a: 'Navigate to the Events section and find the event you are interested in. Click on "Register" and fill in the required details. You will receive a confirmation once your registration is processed.',
      },
      {
        q: "Are events open to non-members?",
        a: "Some events are open to the public, while others are exclusively for registered alumni members. Event listings clearly indicate the eligibility criteria.",
      },
      {
        q: "How can I suggest an event or activity?",
        a: "You can suggest events through the Discussion Forum or by contacting us directly through the Contact page. We welcome ideas from our alumni community.",
      },
    ],
  },
  {
    category: "Career & Opportunities",
    faqs: [
      {
        q: "How do I post a job opening?",
        a: "Approved alumni members can post job openings by navigating to Career > Post a Job. Fill in the job details and submit. Your posting will be visible to all alumni members.",
      },
      {
        q: "How does the mentorship program work?",
        a: "Our mentorship program connects experienced alumni with recent graduates. You can sign up as a mentor or mentee through the Mentorship Program page. Matches are made based on industry, interests, and goals.",
      },
      {
        q: "Are internship opportunities available for current students?",
        a: "Yes, alumni can post internship opportunities that are visible to both alumni and current students. Navigate to Career > Internship Opportunities to browse available positions.",
      },
    ],
  },
  {
    category: "Technical Support",
    faqs: [
      {
        q: "I forgot my login credentials. What should I do?",
        a: "Our platform uses Internet Identity for secure authentication. If you are having trouble logging in, please use the Internet Identity recovery options or contact our support team.",
      },
      {
        q: "How do I report a technical issue?",
        a: "You can report technical issues through the Feedback form or by emailing our technical support team at tech@greenfield.edu. Please include a description of the issue and any error messages you see.",
      },
      {
        q: "Is my personal data secure?",
        a: "Yes, we take data security very seriously. All data is stored on the Internet Computer blockchain, which provides strong security guarantees. Please review our Privacy Policy for detailed information.",
      },
    ],
  },
  {
    category: "Donations & Contributions",
    faqs: [
      {
        q: "How can I donate to the Alumni Association?",
        a: "You can make donations through the Donations page. We accept various contribution amounts and all donations go towards scholarships, events, and community programs.",
      },
      {
        q: "Are donations tax-deductible?",
        a: "The Alumni Association is a registered non-profit organization. Donations may be tax-deductible depending on your jurisdiction. Please consult with a tax professional for specific advice.",
      },
      {
        q: "How can I volunteer for the association?",
        a: "We welcome volunteers for various activities including event organization, mentorship, and community outreach. Visit the Volunteer Opportunities page to see current openings and sign up.",
      },
    ],
  },
];

export default function FAQs() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Find answers to the most common questions about the Greenfield Alumni Association."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-forest/10 text-forest text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <HelpCircle className="w-4 h-4" />
              Help Center
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              How Can We Help You?
            </h2>
            <p className="text-muted-foreground">
              Browse through our frequently asked questions. Can't find what
              you're looking for?{" "}
              <a
                href="/contact"
                className="text-forest hover:underline font-medium"
              >
                Contact us
              </a>
              .
            </p>
          </div>

          <div className="space-y-6">
            {faqCategories.map((cat) => (
              <Card key={cat.category} className="shadow-card border-0">
                <CardContent className="p-6">
                  <h3 className="font-serif font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-forest rounded-full inline-block" />
                    {cat.category}
                  </h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {cat.faqs.map((faq, i) => (
                      <AccordionItem
                        key={faq.q.substring(0, 20)}
                        value={`${cat.category}-${i}`}
                        className="border border-cream-200 rounded-xl px-4"
                      >
                        <AccordionTrigger className="text-sm font-medium text-foreground hover:text-forest hover:no-underline py-3">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-3">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-10 shadow-card border-0 bg-forest text-white">
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-bold mb-2">
                Still Have Questions?
              </h3>
              <p className="text-green-100 mb-6">
                Our team is here to help. Reach out to us and we'll get back to
                you within 24 hours.
              </p>
              <a href="/contact">
                <button
                  type="button"
                  className="bg-gold hover:bg-gold-dark text-forest-dark font-semibold px-8 py-3 rounded-full transition-colors"
                >
                  Contact Support
                </button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
