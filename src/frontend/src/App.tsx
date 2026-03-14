import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import AlumniDirectory from "./pages/AlumniDirectory";
import AlumniProfile from "./pages/AlumniProfile";
import AlumniSuccessStories from "./pages/AlumniSuccessStories";
import AlumniTestimonials from "./pages/AlumniTestimonials";
import BatchwiseList from "./pages/BatchwiseList";
import CareerGuidance from "./pages/CareerGuidance";
import Contact from "./pages/Contact";
import DiscussionForum from "./pages/DiscussionForum";
import Donations from "./pages/Donations";
import EventRegistration from "./pages/EventRegistration";
import FAQs from "./pages/FAQs";
import Feedback from "./pages/Feedback";
import ForumThread from "./pages/ForumThread";
import FundraisingCampaigns from "./pages/FundraisingCampaigns";
import Home from "./pages/Home";
import InternshipOpportunities from "./pages/InternshipOpportunities";
import JobPortal from "./pages/JobPortal";
import Login from "./pages/Login";
import MentorshipProgram from "./pages/MentorshipProgram";
import MessageFromPrincipal from "./pages/MessageFromPrincipal";
import MissionVision from "./pages/MissionVision";
import NewsAnnouncements from "./pages/NewsAnnouncements";
import Newsletter from "./pages/Newsletter";
import NotableAlumni from "./pages/NotableAlumni";
import PastEvents from "./pages/PastEvents";
import PhotoGallery from "./pages/PhotoGallery";
import PostJob from "./pages/PostJob";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Register from "./pages/Register";
import ReunionDetails from "./pages/ReunionDetails";
import SearchAlumni from "./pages/SearchAlumni";
import Sitemap from "./pages/Sitemap";
import TermsConditions from "./pages/TermsConditions";
import UpcomingEvents from "./pages/UpcomingEvents";
import VideoGallery from "./pages/VideoGallery";
import VolunteerOpportunities from "./pages/VolunteerOpportunities";
import WebinarsWorkshops from "./pages/WebinarsWorkshops";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const missionVisionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mission-vision",
  component: MissionVision,
});
const principalMessageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/principal-message",
  component: MessageFromPrincipal,
});
const successStoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/success-stories",
  component: AlumniSuccessStories,
});
const faqsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faqs",
  component: FAQs,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPolicy,
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsConditions,
});
const sitemapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sitemap",
  component: Sitemap,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});
const alumniDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alumni/directory",
  component: AlumniDirectory,
});
const searchAlumniRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alumni/search",
  component: SearchAlumni,
});
const alumniProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alumni/profile/$id",
  component: AlumniProfile,
});
const batchwiseListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alumni/batches",
  component: BatchwiseList,
});
const notableAlumniRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alumni/notable",
  component: NotableAlumni,
});
const alumniTestimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alumni/testimonials",
  component: AlumniTestimonials,
});
const forumRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forum",
  component: DiscussionForum,
});
const forumThreadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forum/$id",
  component: ForumThread,
});
const upcomingEventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/upcoming",
  component: UpcomingEvents,
});
const pastEventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/past",
  component: PastEvents,
});
const reunionDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/reunions",
  component: ReunionDetails,
});
const eventRegistrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/register",
  component: EventRegistration,
});
const photoGalleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery/photos",
  component: PhotoGallery,
});
const videoGalleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery/videos",
  component: VideoGallery,
});
const webinarsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/webinars",
  component: WebinarsWorkshops,
});
const jobPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career/jobs",
  component: JobPortal,
});
const internshipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career/internships",
  component: InternshipOpportunities,
});
const mentorshipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career/mentorship",
  component: MentorshipProgram,
});
const careerGuidanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career/guidance",
  component: CareerGuidance,
});
const postJobRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career/post-job",
  component: PostJob,
});
const donationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contributions/donate",
  component: Donations,
});
const fundraisingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contributions/campaigns",
  component: FundraisingCampaigns,
});
const newsletterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contributions/newsletter",
  component: Newsletter,
});
const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/news",
  component: NewsAnnouncements,
});
const volunteerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contributions/volunteer",
  component: VolunteerOpportunities,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const feedbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feedback",
  component: Feedback,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  missionVisionRoute,
  principalMessageRoute,
  successStoriesRoute,
  faqsRoute,
  privacyRoute,
  termsRoute,
  sitemapRoute,
  loginRoute,
  registerRoute,
  alumniDirectoryRoute,
  searchAlumniRoute,
  alumniProfileRoute,
  batchwiseListRoute,
  notableAlumniRoute,
  alumniTestimonialsRoute,
  forumRoute,
  forumThreadRoute,
  upcomingEventsRoute,
  pastEventsRoute,
  reunionDetailsRoute,
  eventRegistrationRoute,
  photoGalleryRoute,
  videoGalleryRoute,
  webinarsRoute,
  jobPortalRoute,
  internshipsRoute,
  mentorshipRoute,
  careerGuidanceRoute,
  postJobRoute,
  donationsRoute,
  fundraisingRoute,
  newsletterRoute,
  newsRoute,
  volunteerRoute,
  contactRoute,
  feedbackRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
