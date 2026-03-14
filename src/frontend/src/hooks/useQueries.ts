import type { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AlumniProfile,
  Announcement,
  ApprovalStatus,
  Event,
  Feedback,
  JobPost,
  Reply,
  Thread,
  UserApprovalInfo,
  UserProfile,
  UserRole,
} from "../backend";
import { useActor } from "./useActor";

// ── User Profile ──────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

// ── Approval ──────────────────────────────────────────────────────────────────

export function useIsCallerApproved() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isCallerApproved"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerApproved();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRequestApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.requestApproval();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isCallerApproved"] });
    },
  });
}

export function useListApprovals() {
  const { actor, isFetching } = useActor();

  return useQuery<UserApprovalInfo[]>({
    queryKey: ["listApprovals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listApprovals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      user,
      status,
    }: { user: Principal; status: ApprovalStatus }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setApproval(user, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listApprovals"] });
    },
  });
}

export function useAssignUserRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, role }: { user: Principal; role: UserRole }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.assignCallerUserRole(user, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listApprovals"] });
    },
  });
}

// ── Alumni Profiles ───────────────────────────────────────────────────────────

export function useGetAllAlumniProfiles() {
  const { actor, isFetching } = useActor();

  return useQuery<AlumniProfile[]>({
    queryKey: ["alumniProfiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAlumniProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateAlumniProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: AlumniProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createAlumniProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alumniProfiles"] });
    },
  });
}

export function useSearchAlumni() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      searchTerm,
      batchYear,
      department,
    }: { searchTerm: string; batchYear: bigint; department: string }) => {
      if (!actor) return [];
      return actor.searchByNameBatchDepartment(
        searchTerm,
        batchYear,
        department,
      );
    },
  });
}

// ── Events ────────────────────────────────────────────────────────────────────

export function useGetAllEvents() {
  const { actor, isFetching } = useActor();

  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (event: Event) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createEvent(event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

// ── Job Posts ─────────────────────────────────────────────────────────────────

export function useGetAllJobPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<JobPost[]>({
    queryKey: ["jobPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllJobPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateJobPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (job: JobPost) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createJobPost(job);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPosts"] });
    },
  });
}

// ── Announcements ─────────────────────────────────────────────────────────────

export function useGetAllAnnouncements() {
  const { actor, isFetching } = useActor();

  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Feedback ──────────────────────────────────────────────────────────────────

export function useSubmitFeedback() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (feedback: Feedback) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitFeedback(feedback);
    },
  });
}

// ── Discussion Forum ──────────────────────────────────────────────────────────

export function useGetAllThreads() {
  const { actor, isFetching } = useActor();

  return useQuery<Thread[]>({
    queryKey: ["threads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllThreads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateThread() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (thread: Thread) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createThread(thread);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });
}

export function useAddReplyToThread() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      threadId,
      reply,
    }: { threadId: string; reply: Reply }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addReplyToThread(threadId, reply);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export function useSubscribeToNewsletter() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.subscribeToNewsletter(email);
    },
  });
}
