"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Maximize2,
  Menu,
  MessageCircle,
  Minimize2,
  Phone,
  Send,
  Twitter,
  X,
} from "lucide-react";

export default function Portfolio() {
  const [terminalText, setTerminalText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeNavItem, setActiveNavItem] = useState<number | null>(0);
  const [keyboardNavActive, setKeyboardNavActive] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    // blog: useRef(null),
    contact: useRef(null),
  };

  const staticText = `$ Hi 👋 I am Codeswot I Turn code into Stuff.

Your Friendly neighbourhood developer With great power comes great responsibilities, Hard work, studies and constant coding I have acquired the awesome power of building amazing applications and software solutions. I am a mobile developer with a passion for creating beautiful and functional user experiences.`;

  const animatedText = `Always believe in you ability to achieve greatness`;

  // Navigation items configuration
  const navigationItems = [
    { key: "0", label: "Home", section: "home", number: "00" },
    { key: "1", label: "About", section: "about", number: "01" },
    { key: "2", label: "Experience", section: "experience", number: "02" },
    { key: "3", label: "Projects", section: "projects", number: "03" },
    // { key: "4", label: "Blog", section: "blog", number: "04" },
    { key: "4", label: "Contact", section: "contact", number: "04" },
    { key: "5", label: "Resume", section: "resume", number: "05" },
  ];

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < animatedText.length) {
        setTerminalText(animatedText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = event.key;
      const navItemIndex = navigationItems.findIndex((item) =>
        item.key === key
      );

      if (navItemIndex !== -1) {
        const navItem = navigationItems[navItemIndex];
        event.preventDefault();
        setKeyboardNavActive(true);
        setActiveNavItem(navItemIndex);

        const announcement = `Navigating to ${navItem.label} section`;
        announceToScreenReader(announcement);

        if (navItem.section === "resume") {
          console.log("Resume action triggered via keyboard");
          // Potentially open resume link or download
          // window.open("/resume.pdf", "_blank"); // Example
        } else {
          scrollToSection(navItem.section);
        }

        setTimeout(() => {
          setKeyboardNavActive(false); // Visual cue is temporary
        }, 1000);
      }
    };

    const handleKeyUp = () => {
      // No need to reset keyboardNavActive here as it's timed out
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [navigationItems]);

  // Screen reader announcements
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when chat is open
  useEffect(() => {
    if (chatOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [chatOpen, mobileMenuOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-expand on mobile when chat opens
  useEffect(() => {
    if (chatOpen && isMobile) {
      setChatExpanded(true);
    } else if (chatOpen && !isMobile) {
      setChatExpanded(false);
    }
  }, [chatOpen, isMobile]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      setMobileMenuOpen(false);
    }
  };

  const scrollToAbout = () => {
    scrollToSection("about");
  };

  const handleNavItemClick = (sectionId: string, index: number) => {
    if (sectionId === "resume") {
      // Handle resume action
      window.open(
        "https://drive.google.com/file/d/1R3IyA2CENW81cIanieJWI2bE8RFY0N7f/view?usp=sharing",
      );
    } else {
      scrollToSection(sectionId);
    }
  };

  const experiences = [
    {
      company: "Moniepoint Group",
      position: "Senior Mobile Engineer",
      period: "Dec 2024 - Present · 6 mos",
      description:
        `Built scalable Flutter apps using MVM architecture at Moniepoint, enhancing problem-solving skills and maintaining 80% test coverage through robust widget, unit, and integration tests.`,
      current: true,
      items: [],
    },
    {
      company: "Feature/Mind",
      position: "Mobile Developer",
      period: "Mar 2024 - Oct 2024 · 8 mos",
      description:
        "Contributed to mobile development of the Nahdi medical e-commerce app (1M+ users in UAE, Saudi Arabia, and Kuwait), delivering features like coupon integration, collaborating with backend and QA teams, and ensuring production-quality code through peer reviews.",
      items: [],
    },

    {
      company: "Palgo.com",
      position: "Full Stack Engineer",
      period: "Oct 2021 - Mar 2024 · 2 yrs 6 mos",
      description:
        `Developed mobile features in close collaboration with designers, implemented backend integrations via Node.js and Firebase, optimized payouts with KIN blockchain (90% faster than Stripe), enhanced UX in Flutter, and reduced Firebase usage through an offline-first chat system with SQLite.`,
      items: [],
    },

    {
      company: "Dondich Creative, LLC",
      position: "Mobile Engineer",
      period: "Nov 2022 - Apr 2023 · 6 mos",
      description: `Led Flutter development for language learning apps like Nihongo Master and Kanji Master, streamlining CI/CD with Codemagic, optimizing state management with Riverpod, and improving search performance with SQLite FTS5.`,
      items: [],
    },

    {
      company: "LEXINGTON TECHNOLOGIES LTD",
      position: "Mobile Developer",
      period: "Aug 2018 - Oct 2021 . 3 yrs 3 mos",
      description:
        "Led mobile development for cross-platform Flutter solutions serving clients and government, migrating legacy Kotlin code, implementing geofencing and MQTT with cached APIs, and spearheading the Naamis inventory system across web, desktop, and mobile.",
      items: [],
    },
  ];

  const mentors = [
    {
      name: "Johan Walhout",
      description:
        "Johan is a software engineer developing apps and webapplications in Angular 2+, VueJS, Nodejs and Dart/Flutter. When he is not working on new projects, he enjoy to have adventures with his wife, four boys and a dog.",
      role: "",
      avatar: "https://fireship.io/contributors/img/johan-walhout.webp",
      light: false,
    },
    {
      name: "Chris Sells",
      description:
        "Chris Sells is an independent consultant focused on applied AI and developer tools and ecosystems. He enjoys long walks on the beach and various technologies. he is the founder and chief proprietor of sellsbrothers.com, the web site HQ for Sells Brothers, Inc.",
      role: "",
      avatar:
        "https://pbs.twimg.com/profile_images/1671610450822451209/18a5CEPH_400x400.jpg",
      light: false,
    },
    {
      name: "Yuri Villas Boas",
      description:
        "Yuri is founder of Formosa, an innovative password format that significantly enhances security by translating input into memorable, themed mnemonic sentences. He also has a keen interest in applied cryptography, evident from his Bitcoin course, and expresses his creativity through music and design.",
      role: "",
      avatar:
        "https://pbs.twimg.com/profile_images/1906411744764833792/22fm8emX_400x400.jpg",
      light: false,
    },
  ];

  const projects = [
    {
      name: "Palgo.com",
      description:
        "Social  e-commerce you can offer your creative services, sell products",
      image: "https://media.licdn.com/dms/image/v2/C560BAQHH3Odi6clGLQ/company-logo_200_200/company-logo_200_200/0/1643747796582/palgo_com_logo?e=1753920000&v=beta&t=DqqXJQ7MPGlOYK_lALPQp_2iijJJXnu-VbLJzg12pKU",
      technologies: ["Flutter", "Firebase", "Node.js"],
    },
    {
      name: "NasBox",
      description:
        "Custom proprietary AOSP media player and more",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["AOSP", "Flutter", "FFMPEG", "python"],
    },
    {
      name: "NiceApp",
      description:
        "An in house communication app for the Nigerian Customs",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Supabase", "SQL", "Flutter"],
    },
    {
      name: "Instructra",
      description:
        "Instructra helps you find driving instructors, book flexible lessons.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Supabase", "Flutter"],
    },
    {
      name: "Nahdi",
      description:
        "e-commerece mobile app for the Nahdi-online store",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Flutter"],
    },
    {
      name: "NM Japanese Dictionary",
      description:
        "Nihongo Master Japanese dictionary, helps user learn kanjis and words in japanese",
      image: "https://www.nihongomaster.com/build/assets/main-47f739e0.png",
      technologies: ["Flutter", "Firebase", "sqlite"],
    },
  ];

  const chatMessages = [
    {
      sender: "Mubarak Ibrahim",
      message: "Hello 👋 How may I be of help ?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      isUser: false,
    },
  ];

  return (
    <>
      {/* Screen Reader Instructions */}
      <div className="sr-only">
        <p>
          Use keyboard shortcuts to navigate: Press 0 for Home, 1 for About, 2
          for Experience, 3 for Projects, 4 for Blog, 5 for Contact, or 6 for
          Resume
        </p>
      </div>2

      <div
        className={`min-h-screen bg-[#1a2332] text-white relative ${
          chatOpen || mobileMenuOpen ? "overflow-hidden" : ""
        }`}
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Chat Overlay Blur */}
        {chatOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setChatOpen(false)}
          />
        )}

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-35 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Fixed Social Links - Bottom Left (Desktop Only) */}
        <div className="fixed left-6 bottom-0 z-20 hidden lg:flex flex-col items-center space-y-4">
          <a
            href="https://github.com/codeswot"
            className="p-2 text-gray-400 hover:text-[#64FFDA] transition-all duration-300 hover:scale-105 transform"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a
            href="https://x.com/codeswot"
            className="p-2 text-gray-400 hover:text-[#64FFDA] transition-all duration-300 hover:scale-105 transform"
            aria-label="Twitter Profile"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/codeswot"
            className="p-2 text-gray-400 hover:text-[#64FFDA] transition-all duration-300 hover:scale-105 transform"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
          <div className="w-px h-24 bg-gray-600" aria-hidden="true"></div>
        </div>

        {/* Fixed Email - Top Right (Desktop Only) - Repositioned with better spacing */}
        <div className="fixed right-[-5rem] top-32 z-20 hidden lg:flex justify-center items-center">
          <div className="transform rotate-90 origin-center hover:scale-105 transition-transform duration-300">
            <a
              href="mailto:mubarak@codeswot.io"
              className="text-gray-400 text-sm tracking-widest whitespace-nowrap hover:text-[#64FFDA] transition-colors duration-300"
              aria-label="Send email to mubarak@codeswot.io"
            >
              mubarak@codeswot.dev
            </a>
          </div>
          <div
            className="w-px h-24 bg-gray-600 ml-6 transform rotate-90 origin-center"
            aria-hidden="true"
          >
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="fixed top-0 left-0 right-0 z-30 bg-[#1a2332]/95 backdrop-blur-sm border-b border-[#64FFDA]/20"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="text-xl font-bold text-[#64FFDA] hover:scale-105 transition-transform duration-300">
                <a href="#home" aria-label="Codeswot - Home">
                  {"{"}C{"}"}
                </a>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                {navigationItems.slice(0, 5).map((item, index) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavItemClick(item.section, index)}
                    className={`hover:scale-105 transition-all duration-300 text-sm cursor-pointer group relative ${
                      activeNavItem === index && keyboardNavActive
                        ? "bg-[#64FFDA]/20 px-3 py-2 rounded-lg ring-2 ring-[#64FFDA] ring-opacity-50"
                        : "x"
                    }`}
                    aria-label={`Navigate to ${item.label} section (Press ${item.key})`}
                    tabIndex={0}
                  >
                    <span className="text-[#64FFDA]">{item.number}.</span>
                    <span className="text-white group-hover:text-[#64FFDA] transition-colors duration-300">
                      {item.label}
                    </span>
                  </button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => handleNavItemClick("resume", 6)}
                  className={`border border-[#64FFDA] text-[#64FFDA] bg-transparent hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-[1.02] transition-all duration-300 px-4 py-1 text-sm h-8 relative group ${
                    activeNavItem === 6 && keyboardNavActive
                      ? "ring-2 ring-[#64FFDA] ring-opacity-50 bg-[#64FFDA]/20"
                      : ""
                  }`}
                  aria-label="View Resume (Press 6)"
                  tabIndex={0}
                >
                  Resume
                </Button>
              </div>

              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="hover:bg-[#64FFDA]/10 hover:scale-105 transition-all duration-300 relative"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  {/* Hamburger to X Animation */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <div
                      className={`absolute transition-all duration-300 ease-in-out ${
                        mobileMenuOpen
                          ? "opacity-0 rotate-180 scale-75"
                          : "opacity-100 rotate-0 scale-100"
                      }`}
                    >
                      <Menu size={20} className="text-[#64FFDA]" />
                    </div>
                    <div
                      className={`absolute transition-all duration-300 ease-in-out ${
                        mobileMenuOpen
                          ? "opacity-100 rotate-0 scale-100"
                          : "opacity-0 rotate-180 scale-75"
                      }`}
                    >
                      <X size={20} className="text-[#64FFDA]" />
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute top-full left-4 right-4 transition-all duration-500 ease-in-out z-40 ${
              mobileMenuOpen
                ? "opacity-100 translate-y-2 visible"
                : "opacity-0 -translate-y-4 invisible"
            }`}
          >
            <div className="bg-[#1a2332]/90 backdrop-blur-lg border border-[#64FFDA]/30 rounded-xl shadow-2xl">
              <div className="px-6 py-6 space-y-4">
                <div className="space-y-3" role="menu">
                  {navigationItems.slice(0, 5).map((item, index) => (
                    <button
                      key={item.key}
                      onClick={() => handleNavItemClick(item.section, index)}
                      className="block w-full text-left hover:text-[#64FFDA]/80 hover:scale-[1.02] transition-all duration-300 py-3 px-2 rounded-lg hover:bg-[#64FFDA]/10 group"
                      role="menuitem"
                      aria-label={`Navigate to ${item.label} section`}
                    >
                      <span className="text-[#64FFDA]">{item.number}.</span>
                      <span className="text-white group-hover:text-[#64FFDA] transition-colors duration-300">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="pt-4 border-t border-[#64FFDA]/20">
                  <Button
                    variant="outline"
                    onClick={() => handleNavItemClick("resume", 6)}
                    className="w-full border border-[#64FFDA] text-[#64FFDA] bg-transparent hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-[1.02] transition-all duration-300 py-3"
                    aria-label="View Resume"
                  >
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          ref={sectionRefs.home}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20"
        >
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 lg:px-24">
            <div className="border border-[#64FFDA] rounded-lg overflow-hidden bg-[#1a2332] hover:scale-[1.005] transition-transform duration-500">
              {/* Terminal Header */}
              <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3 border-b border-[#64FFDA]">
                <div className="flex space-x-2">
                  <div
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full hover:scale-105 transition-transform duration-300"
                    aria-hidden="true"
                  >
                  </div>
                  <div
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full hover:scale-105 transition-transform duration-300"
                    aria-hidden="true"
                  >
                  </div>
                  <div
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full hover:scale-105 transition-transform duration-300"
                    aria-hidden="true"
                  >
                  </div>
                </div>
              </div>

              {/* Terminal Content - Responsive Height */}
              <div className="p-4 sm:p-6 lg:p-8 font-mono h-[500px] sm:h-[520px] lg:h-[450px] flex flex-col justify-between">
                <div className="text-[#64FFDA] text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-line">
                  {staticText}
                  <div className="mt-3 sm:mt-4">
                    $ "{terminalText}"
                    {showCursor && (
                      <span
                        className="bg-[#64FFDA] text-[#1a2332]"
                        aria-hidden="true"
                      >
                        |
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="text-[#64FFDA] text-xs sm:text-sm">
                    <div className="text-[#64FFDA]/60 mt-1">--- Mubarak I.</div>
                  </div>

                  <div className="flex justify-center sm:justify-end">
                    <Button
                      onClick={scrollToAbout}
                      className="bg-transparent border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-[1.02] transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-mono w-full sm:w-auto"
                      aria-label="Learn more about me"
                    >
                      {">"} Know me_
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          ref={sectionRefs.about}
          className="py-32 px-6"
          aria-labelledby="about-heading"
        >
          <div className="max-w-6xl mx-auto px-8 lg:px-24">
            <h2
              id="about-heading"
              className={`text-3xl font-bold mb-16 transition-all duration-1000 ${
                visibleSections.has("about")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-[#64FFDA]">{">"} 01.</span> About
            </h2>

            <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
              <div
                className={`space-y-6 transition-all duration-1000 delay-200 ${
                  visibleSections.has("about")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <p className="text-gray-300 leading-relaxed">
                  I am <span className="text-[#64FFDA]">Mubarak Ibrahim</span>
                  {" "}
                  an intermediate developer with 5 years experience who loves to
                  code, I am skilled with in-depth understanding in Mobile
                  application development and Website development. I'm well
                  focused with clear understanding in Programming, markup and
                  scripting languages. I love being part of the community, I am
                  an organiser at Google Developer's Group, kaduna and also a
                  part of the Andela learning community, I do public speaking
                  ,voluntary tutoring and mentorship. my intrest are reading,
                  quantum physics, AI, and AR, solving problems and puzzles,
                  reading comics.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  Basically i can be the best version of my self like i always
                  say "Believe in your ability to achieve greatness"
                </p>

                <div className="space-y-4">
                  <h3 className="text-[#64FFDA] font-semibold">
                    {">"} I Love_
                  </h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                    <div className="space-y-2">
                      <div className="text-gray-300 hover:text-[#64FFDA] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        .Flutter
                      </div>
                      <div className="text-gray-300 hover:text-[#64FFDA] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        .Node
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-gray-300 hover:text-[#64FFDA] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        .Typescript
                      </div>
                      <div className="text-gray-300 hover:text-[#64FFDA] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                        .React
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`flex justify-center lg:justify-end transition-all duration-1000 delay-400 ${
                  visibleSections.has("about")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="relative hover:scale-[1.02] transition-transform duration-500 rounded-lg overflow-hidden">
                  <div
                    className="w-35 h-35 overflow-hidden rounded-lg border-2 border-[#64FFDA]/30 rotate-120"
                    aria-hidden="true"
                  >
                  </div>
                  <div className="w-35 h-35 overflow-hidden rotate-90">
                    <img
                      src="/mubarak.jpg?height=156&width=156"
                      alt="Mubarak Ibrahim - Professional headshot"
                      className="w-full h-full object-cover -rotate-90 scale-30 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-600 ${
                visibleSections.has("about")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-[#64FFDA] font-semibold text-xl mb-8">
                {">"} Mentors_
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {mentors.map((mentor, index) => (
                  <Card
                    key={index}
                    className={`${
                      mentor.light
                        ? "bg-white text-black"
                        : "bg-[#1a2332] text-white"
                    } border-[#64FFDA]/20 rounded-lg overflow-hidden hover:border-[#64FFDA]/50 hover:scale-[1.02] transition-all duration-300`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <img
                          src={mentor.avatar || "/placeholder.svg"}
                          alt={`${mentor.name} - ${mentor.role}`}
                          className="w-10 h-10 rounded-full border border-[#64FFDA]/20 hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex-1">
                          <h4
                            className={`font-semibold mb-1 ${
                              mentor.light ? "text-black" : "text-white"
                            }`}
                          >
                            {mentor.name}
                          </h4>
                          <p
                            className={`text-xs mb-2 ${
                              mentor.light ? "text-gray-600" : "text-gray-400"
                            }`}
                          >
                            {mentor.role}
                          </p>
                          <p
                            className={`text-xs leading-relaxed ${
                              mentor.light ? "text-gray-700" : "text-gray-400"
                            }`}
                          >
                            {mentor.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <a
                          href="#"
                          aria-label={`${mentor.name}'s GitHub profile`}
                          className={`${
                            mentor.light ? "text-gray-600" : "text-gray-500"
                          } hover:text-[#64FFDA] hover:scale-110 transition-all duration-300`}
                        >
                          <Github size={14} />
                        </a>
                        <a
                          href="#"
                          aria-label={`${mentor.name}'s Twitter profile`}
                          className={`${
                            mentor.light ? "text-gray-600" : "text-gray-500"
                          } hover:text-[#64FFDA] hover:scale-110 transition-all duration-300`}
                        >
                          <Twitter size={14} />
                        </a>
                        <a
                          href="#"
                          aria-label={`${mentor.name}'s external profile`}
                          className={`${
                            mentor.light ? "text-gray-600" : "text-gray-500"
                          } hover:text-[#64FFDA] hover:scale-110 transition-all duration-300`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          ref={sectionRefs.experience}
          className="py-32 px-6"
          aria-labelledby="experience-heading"
        >
          <div className="max-w-4xl mx-auto px-8 lg:px-24">
            <h2
              id="experience-heading"
              className={`text-3xl font-bold mb-16 transition-all duration-1000 ${
                visibleSections.has("experience")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-[#64FFDA]">{">"} 02.</span> Experience
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div
                className={`absolute left-6 top-0 bottom-0 w-px bg-[#64FFDA]/30 transition-all duration-1500 ${
                  visibleSections.has("experience")
                    ? "scale-y-100"
                    : "scale-y-0"
                }`}
                style={{ transformOrigin: "top" }}
                aria-hidden="true"
              >
              </div>

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <article
                    key={index}
                    className={`relative flex items-start space-x-8 hover:scale-[1.01] transition-all duration-1000 ${
                      visibleSections.has("experience")
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionDelay: visibleSections.has("experience")
                        ? `${index * 200}ms`
                        : "0ms",
                    }}
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full border-2 hover:scale-110 transition-transform duration-300 ${
                          exp.current
                            ? "bg-[#64FFDA] border-[#64FFDA]"
                            : "bg-[#1a2332] border-[#64FFDA]/30"
                        }`}
                        aria-hidden="true"
                      >
                        {exp.current && (
                          <div className="absolute inset-0 rounded-full bg-[#64FFDA] animate-ping opacity-75">
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 pb-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white hover:text-[#64FFDA] transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <time className="text-[#64FFDA] text-sm">
                          {exp.period}
                        </time>
                      </div>
                      <h4 className="text-[#64FFDA] font-medium mb-3 hover:scale-[1.02] transition-transform duration-300">
                        {exp.company}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={sectionRefs.projects}
          className="py-32 px-6"
          aria-labelledby="projects-heading"
        >
          <div className="max-w-6xl mx-auto px-8 lg:px-24">
            <h2
              id="projects-heading"
              className={`text-3xl font-bold mb-16 transition-all duration-1000 ${
                visibleSections.has("projects")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-[#64FFDA]">{">"} 03.</span> Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {projects.map((project, index) => (
                <article
                  key={index}
                  className={`bg-[#1a2332] border-[#64FFDA]/20 rounded-lg overflow-hidden hover:border-[#64FFDA]/50 hover:scale-[1.02] transition-all duration-300 ${
                    visibleSections.has("projects")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: visibleSections.has("projects")
                      ? `${index * 200}ms`
                      : "0ms",
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={`${project.name} project screenshot`}
                        className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/90 to-transparent"
                        aria-hidden="true"
                      >
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-semibold text-white mb-2 hover:text-[#64FFDA] transition-colors duration-300">
                          {project.name}
                        </h3>
                        <p className="text-gray-300 mb-3 text-sm leading-relaxed">
                          {project.description}
                        </p>
                        <div
                          className="flex flex-wrap gap-1"
                          role="list"
                          aria-label="Technologies used"
                        >
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-[#64FFDA]/20 text-[#64FFDA] text-xs rounded hover:scale-[1.02] transition-transform duration-300"
                              role="listitem"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </article>
              ))}
            </div>

            <div
              className={`text-center transition-all duration-1000 delay-400 ${
                visibleSections.has("projects")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                variant="outline"
                className="border border-[#64FFDA] text-[#64FFDA] bg-transparent hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-[1.02] transition-all duration-300 px-6 py-2"
                aria-label="Show more projects"
              >
                {">"} Show More_
              </Button>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        {
          /* <section id="blog" ref={sectionRefs.blog} className="py-32 px-6" aria-labelledby="blog-heading">
          <div className="max-w-6xl mx-auto px-8 lg:px-24">
            <h2
              id="blog-heading"
              className={`text-3xl font-bold mb-16 transition-all duration-1000 ${
                visibleSections.has("blog") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-[#64FFDA]">{">"} 04.</span> Blog & Post
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blogPosts.map((post, index) => (
                <article
                  key={index}
                  className={`bg-[#1a2332] border-[#64FFDA]/20 rounded-lg overflow-hidden hover:border-[#64FFDA]/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer ${
                    visibleSections.has("blog") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: visibleSections.has("blog") ? `${index * 150}ms` : "0ms",
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Read blog post: ${post.title}`}
                >
                  <CardContent className="p-0">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Blog post: ${post.title}`}
                      className="w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2 text-sm leading-tight hover:text-[#64FFDA] transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{post.excerpt}</p>
                    </div>
                  </CardContent>
                </article>
              ))}
            </div>
          </div>
        </section> */
        }

        {/* Contact Section - Modified for Mobile */}
        <section
          id="contact"
          ref={sectionRefs.contact}
          className="py-32 px-6"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-4xl mx-auto px-8 lg:px-24 text-center">
            <h2
              id="contact-heading"
              className={`text-3xl font-bold mb-12 transition-all duration-1000 ${
                visibleSections.has("contact")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-[#64FFDA]">{">"} 05.</span> Contact
            </h2>

            <h3
              className={`text-4xl font-bold text-white mb-12 transition-all duration-1000 delay-200 ${
                visibleSections.has("contact")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Get in Touch
            </h3>

            <div
              className={`space-y-6 mb-12 transition-all duration-1000 delay-400 ${
                visibleSections.has("contact")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-gray-300">
                Want to say hello? you can easily reach me
              </p>

              {/* Desktop Version */}
              <div className="hidden lg:block">
                <p className="text-gray-300">with these hot coners</p>
                <div className="space-y-2 text-gray-300">
                  <div>• Top right (email)</div>
                  <div>• Bottom left (socials)</div>
                  <div>• Bottom right (chat)</div>
                </div>
              </div>

              {/* Mobile Version - Contact Me Section */}
              <div className="lg:hidden space-y-6">
                <p className="text-gray-300">through the following options:</p>

                {/* Contact Me Section for Mobile */}
                <div className="space-y-4">
                  <h4 className="text-[#64FFDA] font-semibold text-lg">
                    Contact Me
                  </h4>

                  {/* Socials Option */}
                  <div className="bg-[#1a2332] border border-[#64FFDA]/20 rounded-lg p-4 hover:border-[#64FFDA]/50 hover:scale-[1.02] transition-all duration-300">
                    <h5 className="text-white font-medium mb-3 flex items-center justify-center">
                      <Github size={16} className="mr-2" />
                      Socials
                    </h5>
                    <div
                      className="flex justify-center space-x-4"
                      role="list"
                      aria-label="Social media links"
                    >
                      <a
                        href="https://github.com/codeswot"
                        className="p-2 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-full hover:border-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-105 transition-all duration-300"
                        aria-label="GitHub Profile"
                        role="listitem"
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href="https://x.com/codeswot"
                        className="p-2 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-full hover:border-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-105 transition-all duration-300"
                        aria-label="Twitter Profile"
                        role="listitem"
                      >
                        <Twitter size={18} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/codeswot/"
                        className="p-2 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-full hover:border-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-105 transition-all duration-300"
                        aria-label="LinkedIn Profile"
                        role="listitem"
                      >
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Email Me Option */}
                  <div className="bg-[#1a2332] border border-[#64FFDA]/20 rounded-lg p-4 hover:border-[#64FFDA]/50 hover:scale-[1.02] transition-all duration-300">
                    <h5 className="text-white font-medium mb-3 flex items-center justify-center">
                      <Mail size={16} className="mr-2" />
                      Email Me
                    </h5>
                    <Button
                      className="w-full bg-transparent border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-[1.02] transition-all duration-300"
                      aria-label="Send email to mubarak@codeswot.io"
                    >
                      mubarak@codeswot.io
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop Email Button */}
              <div className="hidden lg:block">
                <div className="text-gray-400 my-8">or</div>
                <Button
                  className="bg-transparent border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-[1.02] transition-all duration-300 px-6 py-2"
                  size="lg"
                  aria-label="Send email to mubarak@codeswot.io"
                >
                  Email me_
                </Button>
              </div>
            </div>

            {/* Desktop Social Icons */}
            <div
              className={`hidden lg:flex justify-center space-x-6 mb-12 transition-all duration-1000 delay-600 ${
                visibleSections.has("contact")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              role="list"
              aria-label="Social media links"
            >
              <a
                href="#"
                className="p-3 bg-[#1a2332] border border-[#64FFDA]/20 rounded-full hover:border-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-105 transition-all duration-300"
                aria-label="GitHub Profile"
                role="listitem"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-[#1a2332] border border-[#64FFDA]/20 rounded-full hover:border-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-105 transition-all duration-300"
                aria-label="Twitter Profile"
                role="listitem"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-[#1a2332] border border-[#64FFDA]/20 rounded-full hover:border-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-105 transition-all duration-300"
                aria-label="LinkedIn Profile"
                role="listitem"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <div
              className={`text-center text-gray-500 text-sm transition-all duration-1000 delay-800 ${
                visibleSections.has("contact")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="mb-2">
                Built with coffee ☕, ReactJs and fun stuff
              </p>
              <p className="mb-4">by codeswot</p>
              <div className="flex justify-center items-center space-x-6">
                <span className="flex items-center space-x-1 hover:scale-[1.02] transition-transform duration-300">
                  <span aria-hidden="true">⭐</span>
                  <span>500+</span>
                </span>
                <span className="flex items-center space-x-1 hover:scale-[1.02] transition-transform duration-300">
                  <span aria-hidden="true">🚀</span>
                  <span>15+</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Chat Widget - All Devices */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <Card
            className={`${
              chatExpanded || isMobile
                ? "fixed inset-4 w-auto h-auto rounded-lg"
                : "w-80 h-96 mb-20 rounded-lg"
            } bg-[#1a2332] border-[#64FFDA] shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01]`}
            role="dialog"
            aria-labelledby="chat-title"
            aria-describedby="chat-description"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#64FFDA]/20">
              <div className="flex items-center space-x-3">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Mubarak Ibrahim"
                  className="w-8 h-8 rounded-full border border-[#64FFDA] hover:scale-105 transition-transform duration-300"
                />
                <div>
                  <div
                    id="chat-title"
                    className="text-white font-semibold text-sm"
                  >
                    Mubarak Ibrahim
                  </div>
                  <div className="text-[#64FFDA] text-xs">The codeswot</div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {!isMobile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatExpanded(!chatExpanded)}
                    className="hover:bg-[#64FFDA]/10 text-gray-400 hover:text-[#64FFDA] hover:scale-105 transition-all duration-300 h-6 w-6 p-0"
                    aria-label={chatExpanded
                      ? "Minimize chat window"
                      : "Expand chat window"}
                  >
                    {chatExpanded
                      ? <Minimize2 size={14} />
                      : <Maximize2 size={14} />}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-[#64FFDA]/10 text-gray-400 hover:text-[#64FFDA] hover:scale-105 transition-all duration-300 h-6 w-6 p-0"
                  aria-label="Start audio call"
                >
                  <Phone size={14} />
                </Button>
                {(chatExpanded || isMobile) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatOpen(false)}
                    className="hover:bg-[#64FFDA]/10 text-gray-400 hover:text-[#64FFDA] hover:scale-105 transition-all duration-300 h-6 w-6 p-0"
                    aria-label="Close chat"
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>
            </div>

            <div
              id="chat-description"
              className={`flex-1 px-4 py-4 space-y-4 overflow-y-auto ${
                chatExpanded || isMobile ? "h-[calc(100vh-160px)]" : "h-64"
              }`}
              role="log"
              aria-label="Chat messages"
            >
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm hover:scale-[1.02] transition-transform duration-300 ${
                      msg.isUser
                        ? "bg-[#64FFDA] text-[#1a2332] rounded-br-sm"
                        : "bg-[#64FFDA]/10 text-white rounded-bl-sm"
                    }`}
                    role="article"
                    aria-label={`Message from ${msg.sender}`}
                  >
                    <p className="leading-relaxed">{msg.message}</p>
                    <time className="text-xs opacity-70 mt-1">{msg.time}</time>
                  </div>
                </div>
              ))}
            </div>

        <div className="px-4 py-3 border-t border-[#64FFDA]/20">
  <div className="flex items-center space-x-2">
    <label htmlFor="chat-input" className="sr-only">
      Type your message
    </label>
    <input
      id="chat-input"
      type="text"
      placeholder="Type a message..."
      disabled
      className="flex-1 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#64FFDA] h-8 text-sm transition-all duration-300 opacity-50 cursor-not-allowed"
      aria-describedby="chat-input-help"
    />
    <div id="chat-input-help" className="sr-only">
      Press Enter to send message
    </div>
    <Button
      size="sm"
      disabled
      className="bg-[#64FFDA] text-[#1a2332] hover:bg-[#64FFDA]/90 rounded-lg px-3 py-2 h-8 min-w-[32px] flex items-center justify-center transition-all duration-300 opacity-50 cursor-not-allowed"
      aria-label="Send message"
    >
      <Send size={14} />
    </Button>
  </div>
</div>

          </Card>
        )}

        {/* Chat Button with Icon Transition Animation */}
        <div
          className={`absolute bottom-0 right-0 transition-all duration-500 ${
            chatOpen && (chatExpanded || isMobile)
              ? "opacity-0 pointer-events-none scale-75"
              : "opacity-100 scale-100"
          }`}
        >
          <Button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-14 h-14 rounded-full bg-[#64FFDA] text-[#1a2332] hover:bg-[#64FFDA]/90 shadow-lg hover:scale-105 transition-all duration-300 relative"
            aria-label={chatOpen ? "Close chat" : "Open chat"}
          >
            {/* Chat Icon to X Animation */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div
                className={`absolute transition-all duration-300 ease-in-out ${
                  chatOpen
                    ? "opacity-0 rotate-180 scale-75"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              >
                <MessageCircle size={22} />
              </div>
              <div
                className={`absolute transition-all duration-300 ease-in-out ${
                  chatOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-180 scale-75"
                }`}
              >
                <X size={22} />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
