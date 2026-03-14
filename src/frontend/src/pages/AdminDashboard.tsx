import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { Principal } from "@dfinity/principal";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  Clock,
  Shield,
  UserCog,
  Users,
  XCircle,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { ApprovalStatus, UserRole } from "../backend";
import HeroSection from "../components/HeroSection";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAssignUserRole,
  useIsCallerAdmin,
  useListApprovals,
  useSetApproval,
} from "../hooks/useQueries";

function AdminContent() {
  const { data: approvals = [], isLoading } = useListApprovals();
  const setApproval = useSetApproval();
  const assignRole = useAssignUserRole();

  const handleApprove = async (principal: Principal) => {
    try {
      await setApproval.mutateAsync({
        user: principal,
        status: ApprovalStatus.approved,
      });
      toast.success("User approved successfully!");
    } catch {
      toast.error("Failed to approve user.");
    }
  };

  const handleReject = async (principal: Principal) => {
    try {
      await setApproval.mutateAsync({
        user: principal,
        status: ApprovalStatus.rejected,
      });
      toast.success("User rejected.");
    } catch {
      toast.error("Failed to reject user.");
    }
  };

  const handleRoleChange = async (principal: Principal, role: string) => {
    try {
      await assignRole.mutateAsync({ user: principal, role: role as UserRole });
      toast.success("Role updated successfully!");
    } catch {
      toast.error("Failed to update role.");
    }
  };

  const pending = approvals.filter((a) => {
    const statusKey =
      typeof a.status === "object"
        ? Object.keys(a.status)[0]
        : String(a.status);
    return statusKey === "pending";
  });
  const approved = approvals.filter((a) => {
    const statusKey =
      typeof a.status === "object"
        ? Object.keys(a.status)[0]
        : String(a.status);
    return statusKey === "approved";
  });
  const rejected = approvals.filter((a) => {
    const statusKey =
      typeof a.status === "object"
        ? Object.keys(a.status)[0]
        : String(a.status);
    return statusKey === "rejected";
  });

  const getStatusBadge = (status: ApprovalStatus) => {
    const statusKey =
      typeof status === "object" ? Object.keys(status)[0] : String(status);
    if (statusKey === "approved")
      return (
        <Badge className="bg-forest/10 text-forest border-forest/20">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      );
    if (statusKey === "rejected")
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      );
    return (
      <Badge className="bg-gold/10 text-gold-dark border-gold/20">
        <Clock className="w-3 h-3 mr-1" />
        Pending
      </Badge>
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Pending Approval",
              count: pending.length,
              icon: Clock,
              color: "text-gold-dark bg-gold/10",
            },
            {
              label: "Approved Users",
              count: approved.length,
              icon: CheckCircle,
              color: "text-forest bg-forest/10",
            },
            {
              label: "Rejected Users",
              count: rejected.length,
              icon: XCircle,
              color: "text-destructive bg-destructive/10",
            },
          ].map((stat) => (
            <Card key={stat.label} className="shadow-card border-0">
              <CardContent className="p-5 flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.count}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Approvals */}
        {pending.length > 0 && (
          <div className="mb-8">
            <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-dark" />
              Pending Approvals ({pending.length})
            </h3>
            <div className="space-y-3">
              {pending.map((user) => (
                <Card
                  key={user.principal.toString()}
                  className="shadow-card border-0 border-l-4 border-l-gold"
                >
                  <CardContent className="p-4 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gold-dark" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          User
                        </p>
                        <p className="text-xs text-muted-foreground font-mono truncate max-w-48">
                          {user.principal.toString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(user.status)}
                      <Button
                        size="sm"
                        onClick={() => handleApprove(user.principal)}
                        disabled={setApproval.isPending}
                        className="bg-forest hover:bg-forest-dark text-white rounded-full"
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(user.principal)}
                        disabled={setApproval.isPending}
                        className="rounded-full"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Users */}
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <UserCog className="w-5 h-5 text-forest" />
            All Users ({approvals.length})
          </h3>
          {isLoading ? (
            <div className="space-y-3">
              {["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => (
                <Skeleton key={k} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : approvals.length === 0 ? (
            <div className="text-center py-10">
              <Users className="w-12 h-12 text-forest/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No users registered yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {approvals.map((user) => (
                <Card
                  key={user.principal.toString()}
                  className="shadow-card border-0"
                >
                  <CardContent className="p-4 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-forest" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-mono truncate max-w-48">
                          {user.principal.toString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {getStatusBadge(user.status)}
                      <Select
                        onValueChange={(role) =>
                          handleRoleChange(user.principal, role)
                        }
                      >
                        <SelectTrigger className="w-32 h-8 text-xs">
                          <SelectValue placeholder="Set Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={UserRole.admin}>Admin</SelectItem>
                          <SelectItem value={UserRole.user}>User</SelectItem>
                          <SelectItem value={UserRole.guest}>Guest</SelectItem>
                        </SelectContent>
                      </Select>
                      {(() => {
                        const statusKey =
                          typeof user.status === "object"
                            ? Object.keys(user.status)[0]
                            : String(user.status);
                        return statusKey !== "approved" ? (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(user.principal)}
                            disabled={setApproval.isPending}
                            className="bg-forest hover:bg-forest-dark text-white rounded-full h-8 text-xs"
                          >
                            Approve
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(user.principal)}
                            disabled={setApproval.isPending}
                            className="rounded-full h-8 text-xs"
                          >
                            Revoke
                          </Button>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AdminDashboard() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading } = useIsCallerAdmin();
  const navigate = useNavigate();

  if (!identity) {
    navigate({ to: "/login" });
    return null;
  }

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-forest border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-card border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground">
              You do not have admin privileges to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <HeroSection
        title="Admin Dashboard"
        subtitle="Manage user approvals, roles, and oversee the alumni community."
        backgroundImage="/assets/generated/hero-bg.dim_1920x1080.png"
        minHeight="min-h-[30vh]"
      />
      <AdminContent />
    </div>
  );
}
