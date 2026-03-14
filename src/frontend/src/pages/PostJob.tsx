import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, CheckCircle } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { PostType } from "../backend";
import ApprovalGuard from "../components/ApprovalGuard";
import HeroSection from "../components/HeroSection";
import { useCreateJobPost } from "../hooks/useQueries";
import { useGetCallerUserProfile } from "../hooks/useQueries";

function PostJobForm() {
  const createJob = useCreateJobPost();
  const { data: userProfile } = useGetCallerUserProfile();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    postType: "job" as "job" | "internship",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.location || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await createJob.mutateAsync({
        id: `job-${Date.now()}`,
        title: form.title.trim(),
        company: form.company.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        postType: form.postType === "job" ? PostType.job : PostType.internship,
        postedBy: userProfile?.name || "Anonymous",
        isActive: true,
      });
      setSubmitted(true);
      toast.success("Job posted successfully!");
    } catch {
      toast.error("Failed to post job. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <Card className="shadow-card border-0">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-forest" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Job Posted!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your job listing has been published and is now visible to all
              alumni members.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  title: "",
                  company: "",
                  location: "",
                  description: "",
                  postType: "job",
                });
              }}
              variant="outline"
              className="border-forest text-forest hover:bg-forest hover:text-white rounded-full"
            >
              Post Another Job
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Card className="shadow-card border-0">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-forest" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">
                Post a Job / Internship
              </h2>
              <p className="text-sm text-muted-foreground">
                Share opportunities with the alumni community
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore, India"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Post Type *</Label>
              <Select
                value={form.postType}
                onValueChange={(v) =>
                  setForm((p) => ({
                    ...p,
                    postType: v as "job" | "internship",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job">Full-time Job</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, requirements, and any other relevant details..."
                rows={5}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={createJob.isPending}
              className="w-full bg-forest hover:bg-forest-dark text-white rounded-full py-3"
            >
              {createJob.isPending ? "Posting..." : "Post Job Listing"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PostJob() {
  return (
    <div className="pt-16">
      <HeroSection
        title="Post a Job"
        subtitle="Share career opportunities with the Greenfield alumni community. Help fellow graduates find their next role."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />
      <ApprovalGuard>
        <PostJobForm />
      </ApprovalGuard>
    </div>
  );
}
