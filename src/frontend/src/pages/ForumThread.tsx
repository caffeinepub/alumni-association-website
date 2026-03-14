import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Reply, Send, User } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import ApprovalGuard from "../components/ApprovalGuard";
import {
  useAddReplyToThread,
  useGetAllThreads,
  useGetCallerUserProfile,
} from "../hooks/useQueries";

function ThreadContent({ id }: { id: string }) {
  const { data: threads = [], isLoading } = useGetAllThreads();
  const { data: userProfile } = useGetCallerUserProfile();
  const addReply = useAddReplyToThread();
  const [replyContent, setReplyContent] = useState("");

  const thread = threads.find((t) => t.id === id);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    try {
      await addReply.mutateAsync({
        threadId: id,
        reply: {
          author: userProfile?.name || "Anonymous",
          content: replyContent.trim(),
          timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        },
      });
      setReplyContent("");
      toast.success("Reply posted!");
    } catch {
      toast.error("Failed to post reply. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Skeleton className="h-48 rounded-2xl mb-6" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Thread not found.</p>
        <Link to="/forum">
          <Button
            variant="outline"
            className="mt-4 border-forest text-forest hover:bg-forest hover:text-white rounded-full"
          >
            Back to Forum
          </Button>
        </Link>
      </div>
    );
  }

  const threadDate = new Date(Number(thread.timestamp) / 1_000_000);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/forum"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-forest mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Forum
        </Link>

        <Card className="shadow-card border-0 mb-6">
          <CardContent className="p-6">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-3">
              {thread.title}
            </h1>
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-forest" />
                {thread.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-forest" />
                {threadDate.toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Reply className="w-4 h-4 text-forest" />
                {thread.replies.length} replies
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {thread.content}
            </p>
          </CardContent>
        </Card>

        {thread.replies.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-foreground">
              {thread.replies.length} Replies
            </h3>
            {thread.replies.map((reply) => {
              const replyDate = new Date(Number(reply.timestamp) / 1_000_000);
              return (
                <Card
                  key={String(reply.timestamp)}
                  className="shadow-xs border border-cream-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">
                        <span className="text-forest text-xs font-bold">
                          {reply.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {reply.author}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {replyDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {reply.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <Card className="shadow-card border-0">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-3">Post a Reply</h3>
            <form onSubmit={handleReply} className="space-y-3">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                required
              />
              <Button
                type="submit"
                disabled={addReply.isPending}
                className="bg-forest hover:bg-forest-dark text-white rounded-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {addReply.isPending ? "Posting..." : "Post Reply"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function ForumThread() {
  const { id } = useParams({ from: "/forum/$id" });

  return (
    <div className="pt-16">
      <ApprovalGuard>
        <ThreadContent id={id} />
      </ApprovalGuard>
    </div>
  );
}
