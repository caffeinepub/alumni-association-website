import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateThread } from "../hooks/useQueries";
import { useGetCallerUserProfile } from "../hooks/useQueries";

export default function NewThreadModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createThread = useCreateThread();
  const { data: userProfile } = useGetCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }
    try {
      await createThread.mutateAsync({
        id: `thread-${Date.now()}`,
        title: title.trim(),
        content: content.trim(),
        author: userProfile?.name || "Anonymous",
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        replies: [],
      });
      toast.success("Thread created successfully!");
      setTitle("");
      setContent("");
      setOpen(false);
    } catch {
      toast.error("Failed to create thread. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-forest hover:bg-forest-dark text-white rounded-full">
          <Plus className="w-4 h-4 mr-2" />
          New Thread
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            Start a New Discussion
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="thread-title">Thread Title *</Label>
            <Input
              id="thread-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to discuss?"
              required
            />
          </div>
          <div>
            <Label htmlFor="thread-content">Content *</Label>
            <Textarea
              id="thread-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, questions, or ideas..."
              rows={5}
              required
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createThread.isPending}
              className="bg-forest hover:bg-forest-dark text-white"
            >
              {createThread.isPending ? "Posting..." : "Post Thread"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
