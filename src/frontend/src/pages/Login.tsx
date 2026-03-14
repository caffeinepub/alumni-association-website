import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { GraduationCap, Shield, Users, Zap } from "lucide-react";
import React, { useEffect } from "react";
import ProfileSetupModal from "../components/ProfileSetupModal";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";

export default function Login() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, userProfile, navigate]);

  const handleLogin = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-forest-dark via-forest to-forest-light flex items-center justify-center px-4">
      <ProfileSetupModal
        open={showProfileSetup}
        onComplete={() => navigate({ to: "/" })}
      />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Branding */}
        <div className="text-white hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-forest-dark" />
            </div>
            <div>
              <div className="font-serif font-bold text-2xl">Greenfield</div>
              <div className="text-green-300 text-sm">Alumni Association</div>
            </div>
          </div>
          <h1 className="font-serif text-4xl font-bold mb-4 leading-tight">
            Welcome Back to Your Alumni Community
          </h1>
          <p className="text-green-100 leading-relaxed mb-8">
            Connect with thousands of fellow graduates, explore career
            opportunities, and stay updated with the latest events and news.
          </p>
          <div className="space-y-4">
            {[
              { icon: Users, text: "15,000+ alumni members worldwide" },
              { icon: Shield, text: "Secure login with Internet Identity" },
              { icon: Zap, text: "Instant access to all alumni features" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <span className="text-green-100 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Login Card */}
        <Card className="shadow-hero border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-forest" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-1">
                {isAuthenticated ? "You are logged in" : "Alumni Login"}
              </h2>
              <p className="text-muted-foreground text-sm">
                {isAuthenticated
                  ? "Welcome back! Setting up your profile..."
                  : "Sign in securely with Internet Identity"}
              </p>
            </div>

            {!isAuthenticated ? (
              <div className="space-y-4">
                <Button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full bg-forest hover:bg-forest-dark text-white rounded-full py-3 text-base font-semibold"
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connecting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Login with Internet Identity
                    </span>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-cream-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      New to the community?
                    </span>
                  </div>
                </div>

                <a href="/register">
                  <Button
                    variant="outline"
                    className="w-full border-forest text-forest hover:bg-forest hover:text-white rounded-full"
                  >
                    Join Alumni Network
                  </Button>
                </a>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Loading your profile...
                </p>
                <Button
                  variant="outline"
                  onClick={handleLogin}
                  className="border-destructive text-destructive hover:bg-destructive hover:text-white rounded-full"
                >
                  Logout
                </Button>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center mt-6">
              By logging in, you agree to our{" "}
              <a href="/terms" className="text-forest hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-forest hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
