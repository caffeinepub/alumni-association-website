import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Clock, Lock, ShieldCheck } from "lucide-react";
import type React from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerApproved } from "../hooks/useQueries";
import { useRequestApproval } from "../hooks/useQueries";

interface ApprovalGuardProps {
  children: React.ReactNode;
}

export default function ApprovalGuard({ children }: ApprovalGuardProps) {
  const { identity } = useInternetIdentity();
  const { data: isApproved, isLoading } = useIsCallerApproved();
  const requestApprovalMutation = useRequestApproval();

  if (!identity) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-card border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-forest" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Login Required
            </h2>
            <p className="text-muted-foreground mb-6">
              Please log in to access this section of the alumni portal.
            </p>
            <Link to="/login">
              <Button className="bg-forest hover:bg-forest-dark text-white rounded-full px-8">
                Login to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!isApproved) {
    const handleRequest = async () => {
      try {
        await requestApprovalMutation.mutateAsync();
        toast.success(
          "Approval request submitted! An admin will review your request.",
        );
      } catch {
        toast.error("Failed to submit approval request. Please try again.");
      }
    };

    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-card border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gold-dark" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Approval Required
            </h2>
            <p className="text-muted-foreground mb-6">
              Your account needs to be approved by an administrator to access
              this section. Click below to request approval.
            </p>
            <Button
              onClick={handleRequest}
              disabled={requestApprovalMutation.isPending}
              className="bg-forest hover:bg-forest-dark text-white rounded-full px-8"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              {requestApprovalMutation.isPending
                ? "Requesting..."
                : "Request Approval"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
