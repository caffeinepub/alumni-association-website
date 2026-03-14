import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AlumniProfile {
    id: string;
    bio: string;
    isApproved: boolean;
    name: string;
    notable: boolean;
    profession: string;
    email: string;
    testimonials: Array<string>;
    department: string;
    batchYear: bigint;
}
export interface Reply {
    content: string;
    author: string;
    timestamp: Time;
}
export type Time = bigint;
export interface Thread {
    id: string;
    title: string;
    content: string;
    author: string;
    timestamp: Time;
    replies: Array<Reply>;
}
export interface JobPost {
    id: string;
    postType: PostType;
    title: string;
    postedBy: string;
    description: string;
    isActive: boolean;
    company: string;
    location: string;
}
export interface Feedback {
    id: string;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Event {
    id: string;
    title: string;
    date: Time;
    description: string;
    image?: ExternalBlob;
    location: string;
    eventType: EventType;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface Announcement {
    id: string;
    title: string;
    body: string;
    date: Time;
}
export interface UserProfile {
    bio: string;
    name: string;
    profession: string;
    email: string;
    department: string;
    batchYear: bigint;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum EventType {
    upcoming = "upcoming",
    past = "past",
    webinar = "webinar",
    reunion = "reunion"
}
export enum PostType {
    job = "job",
    internship = "internship"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReplyToThread(threadId: string, reply: Reply): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAlumniProfile(profile: AlumniProfile): Promise<void>;
    createAnnouncement(announcement: Announcement): Promise<void>;
    createEvent(event: Event): Promise<void>;
    createJobPost(job: JobPost): Promise<void>;
    createThread(thread: Thread): Promise<void>;
    getAllAlumniProfiles(): Promise<Array<AlumniProfile>>;
    getAllAnnouncements(): Promise<Array<Announcement>>;
    getAllEvents(): Promise<Array<Event>>;
    getAllFeedbacks(): Promise<Array<Feedback>>;
    getAllJobPosts(): Promise<Array<JobPost>>;
    getAllSubscribers(): Promise<Array<string>>;
    getAllThreads(): Promise<Array<Thread>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchByNameBatchDepartment(searchTerm: string, batchYear: bigint, department: string): Promise<Array<AlumniProfile>>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    submitFeedback(feedback: Feedback): Promise<void>;
    subscribeToNewsletter(email: string): Promise<void>;
}
