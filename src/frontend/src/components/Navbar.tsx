import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  GraduationCap,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import { useIsCallerAdmin } from "../hooks/useQueries";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Alumni Association", href: "/about" },
      { label: "Mission & Vision", href: "/mission-vision" },
      { label: "Message from Principal", href: "/principal-message" },
      { label: "Success Stories", href: "/success-stories" },
    ],
  },
  {
    label: "Alumni",
    href: "/alumni/directory",
    children: [
      { label: "Alumni Directory", href: "/alumni/directory" },
      { label: "Search Alumni", href: "/alumni/search" },
      { label: "Batch-wise List", href: "/alumni/batches" },
      { label: "Notable Alumni", href: "/alumni/notable" },
      { label: "Testimonials", href: "/alumni/testimonials" },
      { label: "Discussion Forum", href: "/forum" },
    ],
  },
  {
    label: "Events",
    href: "/events/upcoming",
    children: [
      { label: "Upcoming Events", href: "/events/upcoming" },
      { label: "Past Events", href: "/events/past" },
      { label: "Reunion Meet", href: "/events/reunions" },
      { label: "Webinars & Workshops", href: "/events/webinars" },
      { label: "Photo Gallery", href: "/gallery/photos" },
      { label: "Video Gallery", href: "/gallery/videos" },
    ],
  },
  {
    label: "Career",
    href: "/career/jobs",
    children: [
      { label: "Job Portal", href: "/career/jobs" },
      { label: "Internships", href: "/career/internships" },
      { label: "Mentorship Program", href: "/career/mentorship" },
      { label: "Career Guidance", href: "/career/guidance" },
      { label: "Post a Job", href: "/career/post-job" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: "/" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-forest-dark shadow-lg" : "bg-forest-dark"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center group-hover:bg-gold-light transition-colors">
              <GraduationCap className="w-5 h-5 text-forest-dark" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-serif font-bold text-lg leading-tight">
                Greenfield
              </div>
              <div className="text-green-300 text-xs leading-tight">
                Alumni Association
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-100 hover:text-white hover:bg-forest transition-colors rounded-md"
                  >
                    {link.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-card-hover border border-cream-200 py-1 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-cream-100 hover:text-forest transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-3 py-2 text-sm font-medium text-green-100 hover:text-white hover:bg-forest transition-colors rounded-md"
                >
                  {link.label}
                </Link>
              ),
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-2 text-sm font-medium text-gold hover:text-gold-light hover:bg-forest transition-colors rounded-md"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-white hover:bg-forest hover:text-white"
                  >
                    <div className="w-7 h-7 bg-gold rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-forest-dark" />
                    </div>
                    <span className="text-sm font-medium">
                      {userProfile?.name || "Alumni"}
                    </span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/register"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-destructive cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="text-white hover:bg-forest hover:text-white border border-green-600"
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
                <Link to="/register">
                  <Button className="bg-gold hover:bg-gold-dark text-forest-dark font-semibold rounded-full px-5">
                    Join Alumni
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-white hover:bg-forest rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-forest-dark border-t border-forest">
          <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <div className="px-3 py-2 text-xs font-semibold text-green-400 uppercase tracking-wider mt-2">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-6 py-2 text-sm text-green-100 hover:text-white hover:bg-forest rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className="block px-3 py-2 text-sm font-medium text-green-100 hover:text-white hover:bg-forest rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 text-sm font-medium text-gold hover:text-gold-light hover:bg-forest rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            <div className="pt-3 border-t border-forest flex flex-col gap-2">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full border-green-600 text-white hover:bg-forest"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout ({userProfile?.name || "Alumni"})
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="w-full border-green-600 text-white hover:bg-forest"
                  >
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </Button>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gold hover:bg-gold-dark text-forest-dark font-semibold">
                      Join Alumni
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
