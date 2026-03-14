import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, GraduationCap, Shield } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import HeroSection from "../components/HeroSection";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCreateAlumniProfile,
  useSaveCallerUserProfile,
} from "../hooks/useQueries";

export default function Register() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  const saveProfile = useSaveCallerUserProfile();
  const createAlumniProfile = useCreateAlumniProfile();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    batchYear: "",
    department: "",
    profession: "",
    bio: "",
  });

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
    if (!isAuthenticated) {
      toast.error("Please login first to register as an alumni.");
      return;
    }
    try {
      const batchYear = BigInt(form.batchYear || 0);
      await saveProfile.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        batchYear,
        department: form.department.trim(),
        profession: form.profession.trim(),
        bio: form.bio.trim(),
      });
      await createAlumniProfile.mutateAsync({
        id: `alumni-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        batchYear,
        department: form.department.trim(),
        profession: form.profession.trim(),
        bio: form.bio.trim(),
        notable: false,
        testimonials: [],
        isApproved: false,
      });
      setSubmitted(true);
      toast.success(
        "Registration successful! Your account is pending approval.",
      );
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen bg-cream-100 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-card border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-forest" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Registration Successful!
            </h2>
            <p className="text-muted-foreground mb-6">
              Welcome to the Greenfield Alumni Association! Your account is
              pending admin approval. You'll have full access once approved.
            </p>
            <Button
              onClick={() => navigate({ to: "/" })}
              className="bg-forest hover:bg-forest-dark text-white rounded-full px-8"
            >
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <HeroSection
        title="Join the Alumni Network"
        subtitle="Become part of a thriving community of 15,000+ graduates. Register today and unlock exclusive benefits."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[40vh]"
      />

      <section className="py-16 bg-cream-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isAuthenticated ? (
            <Card className="shadow-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-forest" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Login Required
                </h2>
                <p className="text-muted-foreground mb-6">
                  Please login with Internet Identity first to register as an
                  alumni member.
                </p>
                <Button
                  onClick={() => login()}
                  disabled={isLoggingIn}
                  className="bg-forest hover:bg-forest-dark text-white rounded-full px-8"
                >
                  {isLoggingIn
                    ? "Connecting..."
                    : "Login with Internet Identity"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-card border-0">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground">
                      Alumni Registration
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Fill in your details to complete registration
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
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
                    <div className="sm:col-span-2">
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
                    <div className="sm:col-span-2">
                      <Label htmlFor="profession">Current Profession</Label>
                      <Input
                        id="profession"
                        name="profession"
                        value={form.profession}
                        onChange={handleChange}
                        placeholder="e.g. Software Engineer at Google"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="bio">Short Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself, your journey, and your achievements..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={
                      saveProfile.isPending || createAlumniProfile.isPending
                    }
                    className="w-full bg-forest hover:bg-forest-dark text-white rounded-full py-3"
                  >
                    {saveProfile.isPending || createAlumniProfile.isPending
                      ? "Registering..."
                      : "Complete Registration"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
