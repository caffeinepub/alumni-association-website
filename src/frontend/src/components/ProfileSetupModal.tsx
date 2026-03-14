import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useSaveCallerUserProfile } from "../hooks/useQueries";

interface ProfileSetupModalProps {
  open: boolean;
  onComplete: () => void;
}

export default function ProfileSetupModal({
  open,
  onComplete,
}: ProfileSetupModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    batchYear: "",
    department: "",
    profession: "",
    bio: "",
  });
  const saveProfile = useSaveCallerUserProfile();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        batchYear: BigInt(form.batchYear || 0),
        department: form.department.trim(),
        profession: form.profession.trim(),
        bio: form.bio.trim(),
      });
      toast.success("Profile saved successfully!");
      onComplete();
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-forest" />
            </div>
            <div>
              <DialogTitle className="font-serif text-xl">
                Complete Your Profile
              </DialogTitle>
              <DialogDescription className="text-sm">
                Welcome! Please set up your alumni profile to continue.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="batchYear">Batch Year</Label>
              <Input
                id="batchYear"
                name="batchYear"
                type="number"
                value={form.batchYear}
                onChange={handleChange}
                placeholder="e.g. 2015"
                min="1950"
                max="2030"
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="profession">Current Profession</Label>
              <Input
                id="profession"
                name="profession"
                value={form.profession}
                onChange={handleChange}
                placeholder="e.g. Software Engineer at Google"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us a bit about yourself..."
                rows={3}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={saveProfile.isPending}
            className="w-full bg-forest hover:bg-forest-dark text-white rounded-full"
          >
            {saveProfile.isPending ? "Saving..." : "Save Profile & Continue"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
