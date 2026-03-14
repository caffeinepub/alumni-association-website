import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Megaphone } from "lucide-react";
import React from "react";
import HeroSection from "../components/HeroSection";
import { useGetAllAnnouncements } from "../hooks/useQueries";

const staticAnnouncements = [
  {
    id: "1",
    title: "Annual Alumni Meet 2025 — Save the Date!",
    body: 'We are thrilled to announce that the Annual Alumni Meet 2025 will be held on March 15–16, 2025 at the Greenfield University campus. This year\'s theme is "Reconnect, Inspire, Transform." Register early to secure your spot!',
    date: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: "2",
    title: "New Scholarship Program Launched for Alumni Children",
    body: "The Greenfield Alumni Association is proud to announce a new scholarship program exclusively for children of our alumni members. Applications are now open for the 2025–26 academic year. Eligible candidates can apply through the alumni portal.",
    date: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: "3",
    title: "Alumni Job Fair — February 2025",
    body: "Join us for the Alumni Job Fair on February 20, 2025. Over 50 companies will be participating, offering positions across technology, finance, healthcare, and more. Both alumni and current students are welcome to attend.",
    date: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: "4",
    title: "Greenfield University Ranked #1 in State",
    body: "We are proud to share that Greenfield University has been ranked #1 in the state by the National Education Rankings 2024. This achievement reflects the dedication of our faculty, students, and the continued support of our alumni community.",
    date: BigInt(Date.now() - 15 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: "5",
    title: "New Alumni Chapter Launched in Singapore",
    body: "The Greenfield Alumni Association has officially launched its newest international chapter in Singapore. The chapter will serve alumni across Southeast Asia and organize regular networking events and professional development programs.",
    date: BigInt(Date.now() - 20 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
];

export default function NewsAnnouncements() {
  const { data: announcements = [], isLoading } = useGetAllAnnouncements();

  const sorted = [
    ...(announcements.length > 0 ? announcements : staticAnnouncements),
  ].sort((a, b) => Number(b.date) - Number(a.date));

  return (
    <div className="pt-16">
      <HeroSection
        title="News & Announcements"
        subtitle="Stay up to date with the latest news, updates, and announcements from the Greenfield Alumni Association."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-forest" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Latest Updates
              </h2>
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Loading..." : `${sorted.length} announcements`}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => (
                <Skeleton key={k} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sorted.map((ann) => {
                const date = new Date(Number(ann.date) / 1_000_000);
                return (
                  <Card
                    key={ann.id}
                    className="card-hover shadow-card border-0"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-xs text-forest font-medium mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <h3 className="font-serif font-bold text-lg text-foreground mb-2">
                        {ann.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {ann.body}
                      </p>
                      <button
                        type="button"
                        className="mt-3 text-sm text-forest font-medium hover:underline"
                      >
                        Read More →
                      </button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
