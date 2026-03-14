import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Clock, MessageSquare, Reply, User } from "lucide-react";
import React from "react";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import NewThreadModal from "../components/NewThreadModal";
import { useGetAllThreads } from "../hooks/useQueries";

function ForumContent() {
  const { data: threads = [], isLoading } = useGetAllThreads();

  const sorted = [...threads].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp),
  );

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {isLoading ? "Loading..." : `${threads.length} Discussions`}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Share ideas, ask questions, and connect with fellow alumni
            </p>
          </div>
          <NewThreadModal />
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => (
              <Skeleton key={k} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-12 h-12 text-forest/30 mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">
              No discussions yet. Be the first to start a conversation!
            </p>
            <NewThreadModal />
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((thread) => {
              const date = new Date(Number(thread.timestamp) / 1_000_000);
              return (
                <Link
                  key={thread.id}
                  to="/forum/$id"
                  params={{ id: thread.id }}
                >
                  <Card className="card-hover shadow-card border-0 cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground hover:text-forest transition-colors line-clamp-1">
                            {thread.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {thread.content}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="w-3 h-3" />
                              {thread.author}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {date.toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Reply className="w-3 h-3" />
                              {thread.replies.length} replies
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-forest" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default function DiscussionForum() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Discussion Forum"
        subtitle="Engage with the alumni community. Share experiences, ask questions, and collaborate."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <ForumContent />
      </ApprovalGuard>
    </div>
  );
}
