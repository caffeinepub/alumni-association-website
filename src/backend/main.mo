import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import UserApproval "user-approval/approval";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  // Include authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Initialize user approval state
  let approvalState = UserApproval.initState(accessControlState);

  // Director email - this user is automatically granted admin role
  let DIRECTOR_EMAIL : Text = "stephenkasapogu@gmail.com";

  // Data Types
  public type UserProfile = {
    name : Text;
    email : Text;
    batchYear : Nat;
    department : Text;
    profession : Text;
    bio : Text;
  };

  public type AlumniProfile = {
    id : Text;
    name : Text;
    email : Text;
    batchYear : Nat;
    department : Text;
    profession : Text;
    bio : Text;
    notable : Bool;
    testimonials : [Text];
    isApproved : Bool;
  };

  public type Event = {
    id : Text;
    title : Text;
    description : Text;
    date : Time.Time;
    location : Text;
    eventType : EventType;
    image : ?Storage.ExternalBlob;
  };

  public type EventType = {
    #upcoming;
    #past;
    #reunion;
    #webinar;
  };

  public type JobPost = {
    id : Text;
    title : Text;
    company : Text;
    location : Text;
    postType : PostType;
    postedBy : Text;
    description : Text;
    isActive : Bool;
  };

  public type PostType = {
    #job;
    #internship;
  };

  public type Announcement = {
    id : Text;
    title : Text;
    body : Text;
    date : Time.Time;
  };

  public type Newsletter = {
    id : Text;
    title : Text;
    content : Text;
    date : Time.Time;
  };

  public type Feedback = {
    id : Text;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type Thread = {
    id : Text;
    title : Text;
    author : Text;
    content : Text;
    timestamp : Time.Time;
    replies : [Reply];
  };

  public type Reply = {
    author : Text;
    content : Text;
    timestamp : Time.Time;
  };

  // Data Stores
  let userProfiles = Map.empty<Principal, UserProfile>();
  let alumni = Map.empty<Text, AlumniProfile>();
  let events = Map.empty<Text, Event>();
  let jobs = Map.empty<Text, JobPost>();
  let announcements = Map.empty<Text, Announcement>();
  let newsletters = Map.empty<Text, Newsletter>();
  let feedbacks = Map.empty<Text, Feedback>();
  let discussionThreads = Map.empty<Text, Thread>();
  let newsletterSubscribers = Set.empty<Text>();

  // ── User Profile (required by frontend) ──────────────────────────────────

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
    // Auto-grant admin/director role if email matches the designated director
    if (Text.equal(profile.email, DIRECTOR_EMAIL)) {
      accessControlState.userRoles.add(caller, #admin);
      accessControlState.adminAssigned := true;
    };
  };

  // ── Approval Management ───────────────────────────────────────────────────

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // ── Alumni Profiles ───────────────────────────────────────────────────────

  public shared ({ caller }) func createAlumniProfile(profile : AlumniProfile) : async () {
    if (not UserApproval.isApproved(approvalState, caller) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only approved users can create alumni profile");
    };
    alumni.add(profile.id, profile);
  };

  public query ({ caller }) func getAllAlumniProfiles() : async [AlumniProfile] {
    alumni.values().toArray();
  };

  // ── Events ────────────────────────────────────────────────────────────────

  public shared ({ caller }) func createEvent(event : Event) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create events");
    };
    events.add(event.id, event);
  };

  public query ({ caller }) func getAllEvents() : async [Event] {
    events.values().toArray();
  };

  // ── Job Posts ─────────────────────────────────────────────────────────────

  public shared ({ caller }) func createJobPost(job : JobPost) : async () {
    if (not UserApproval.isApproved(approvalState, caller) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only approved users can create job post");
    };
    jobs.add(job.id, job);
  };

  public query ({ caller }) func getAllJobPosts() : async [JobPost] {
    jobs.values().toArray();
  };

  // ── Feedback ──────────────────────────────────────────────────────────────

  // Anyone (including guests) may submit feedback/contact
  public shared ({ caller }) func submitFeedback(feedback : Feedback) : async () {
    feedbacks.add(feedback.id, feedback);
  };

  public query ({ caller }) func getAllFeedbacks() : async [Feedback] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all feedback");
    };
    feedbacks.values().toArray();
  };

  // ── Announcements ─────────────────────────────────────────────────────────

  public shared ({ caller }) func createAnnouncement(announcement : Announcement) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create announcements");
    };
    announcements.add(announcement.id, announcement);
  };

  public query ({ caller }) func getAllAnnouncements() : async [Announcement] {
    announcements.values().toArray();
  };

  // ── Discussion Forum ──────────────────────────────────────────────────────

  public shared ({ caller }) func createThread(thread : Thread) : async () {
    if (not UserApproval.isApproved(approvalState, caller) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only approved users can create threads");
    };
    discussionThreads.add(thread.id, thread);
  };

  public shared ({ caller }) func addReplyToThread(threadId : Text, reply : Reply) : async () {
    if (not UserApproval.isApproved(approvalState, caller) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only approved users can reply to threads");
    };
    switch (discussionThreads.get(threadId)) {
      case (null) { Runtime.trap("Thread not found") };
      case (?thread) {
        let updatedThread = {
          id = thread.id;
          title = thread.title;
          author = thread.author;
          content = thread.content;
          timestamp = thread.timestamp;
          replies = thread.replies.concat([reply]);
        };
        discussionThreads.add(threadId, updatedThread);
      };
    };
  };

  public query ({ caller }) func getAllThreads() : async [Thread] {
    discussionThreads.values().toArray();
  };

  // ── Newsletter ────────────────────────────────────────────────────────────

  // Anyone (including guests) may subscribe
  public shared ({ caller }) func subscribeToNewsletter(email : Text) : async () {
    newsletterSubscribers.add(email);
  };

  public query ({ caller }) func getAllSubscribers() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all subscribers");
    };
    newsletterSubscribers.toArray();
  };

  // ── Alumni Search ─────────────────────────────────────────────────────────

  public query ({ caller }) func searchByNameBatchDepartment(searchTerm : Text, batchYear : Nat, department : Text) : async [AlumniProfile] {
    let results = List.empty<AlumniProfile>();
    alumni.values().forEach(
      func(profile) {
        if (profile.name.contains(#text(searchTerm)) and profile.batchYear == batchYear and Text.equal(profile.department, department)) {
          results.add(profile);
        };
      }
    );
    results.toArray();
  };
};
