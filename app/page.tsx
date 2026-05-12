'use client';

import { useEffect, useRef, useState } from 'react';
import { Home } from '@/components/sections/Home';
import { Navigation } from '@/components/sections/Navigation';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { Chat } from '@/components/sections/Chat';
import { FloatingLinks } from '@/components/sections/FloatingLinks';
import { useFirebaseAnalytics } from '@/hooks/useFirebaseAnalytics';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';
import { getProfile, getQuotes, getMentors, getExperience, getProjectsWithTechs, getOrCreateDeviceId, initializeChat, type Profile, type Quote, type Mentor, type ExperienceItem, type ProjectWithTechs } from '@/lib/firestore';

export default function Portfolio() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [activeNavItem, setActiveNavItem] = useState<number | null>(0);
  const [keyboardNavActive, setKeyboardNavActive] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [projects, setProjects] = useState<ProjectWithTechs[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatUserId, setChatUserId] = useState<string | null>(null);
  const [mentorExpanded, setMentorExpanded] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [experienceExpanded, setExperienceExpanded] = useState(false);

  // Initialize Firebase analytics
  useFirebaseAnalytics();

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  // Navigation items configuration
  const navigationItems = [
    { key: '0', label: 'Home', section: 'home', number: '00' },
    { key: '1', label: 'About', section: 'about', number: '01' },
    { key: '2', label: 'Experience', section: 'experience', number: '02' },
    { key: '3', label: 'Projects', section: 'projects', number: '03' },
    { key: '4', label: 'Contact', section: 'contact', number: '04' },
    { key: '5', label: 'Resume', section: 'resume', number: '05' },
  ];

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
      const navItemIndex = navigationItems.findIndex(
        (item) => item.key === key
      );

      if (navItemIndex !== -1) {
        const navItem = navigationItems[navItemIndex];
        event.preventDefault();
        setKeyboardNavActive(true);
        setActiveNavItem(navItemIndex);

        const announcement = `Navigating to ${navItem.label} section`;
        announceToScreenReader(announcement);

        if (navItem.section === 'resume') {
          console.log('Resume action triggered via keyboard');
    
        } else {
          scrollToSection(navItem.section);
        }

        setTimeout(() => {
          setKeyboardNavActive(false); 
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigationItems]);

  
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            if (analytics) {
              try { logEvent(analytics, 'section_view', { section_id: entry.target.id }); } catch {}
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when chat is open (scrollbar space stabilized via scrollbar-gutter)
  useEffect(() => {
    if (chatOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [chatOpen, mobileMenuOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize chat user ID on first load
  useEffect(() => {
    const initializeChatUser = async () => {
      try {
        // Get or create device-based user ID
        const userId = getOrCreateDeviceId();
        setChatUserId(userId);
        
        // Initialize chat for this user
        await initializeChat(userId);
      } catch (error) {
        console.error('Failed to initialize chat user:', error);
      }
    };

    initializeChatUser();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [p, q, m, e, pr] = await Promise.all([getProfile(), getQuotes(), getMentors(3), getExperience(), getProjectsWithTechs()]);
        setProfile(p);
        setQuotes(q);
        setMentors(m);
        setExperience(e);
        setProjects(pr);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load initial data', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      setMobileMenuOpen(false);
    }
  };

  const handleNavItemClick = (sectionId: string, index: number) => {
    if (sectionId === 'resume') {      
      if (profile?.resume) {
        if (analytics) {
          try { logEvent(analytics, 'resume_click', { url: profile.resume }); } catch {}
        }
        window.open(profile.resume);
      }
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <>
      {/* Screen Reader Instructions */}
      <div className="sr-only">
        <p>
          Use keyboard shortcuts to navigate: Press 0 for Home, 1 for About, 2
          for Experience, 3 for Projects, 4 for Contact, or 5 for Resume
        </p>
      </div>

      <div
        className={`min-h-screen bg-[#1a2332] text-white relative ${
          chatOpen || mobileMenuOpen ? 'overflow-hidden' : ''
        }`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {loading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a2332]/60 animate-[blurIn_180ms_ease-out]">
            <div className="flex flex-col items-center gap-6">
              <img
                src="/android-chrome-512x512.png"
                alt="Codeswot logo"
                className="w-20 h-20 animate-pulse"
              />
              <div className="w-48 h-1 bg-white/10 overflow-hidden rounded">
                <div className="h-full bg-[#64FFDA] animate-[progress_1.2s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        )}
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

        {/* Floating Links */}
        <FloatingLinks
          githubUrl={profile?.github}
          twitterUrl={profile?.twitter}
          linkedInUrl={profile?.linkedIn}
          email={profile?.email}
        />

        {/* Navigation */}
        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          handleNavItemClick={handleNavItemClick}
          activeNavItem={activeNavItem}
          keyboardNavActive={keyboardNavActive}
        />

        {/* Main Content */}
        {!loading && (
          <Home
          sectionRef={sectionRefs.home}
          introHeader={profile?.introHeader}
          intro={profile?.intro}
          quotes={quotes}
        />
        )}
        <About
          sectionRef={sectionRefs.about}
          visibleSections={visibleSections}
          about={profile?.about}
          favoriteTools={profile?.favoriteTools}
          profilePhoto={profile?.profilePhoto}
          mentors={mentors}
          onExpandedChange={setMentorExpanded}
        />
        <Experience
          sectionRef={sectionRefs.experience}
          visibleSections={visibleSections}
          experience={experience}
          onExpandedChange={setExperienceExpanded}
        />
        <Projects
          sectionRef={sectionRefs.projects}
          visibleSections={visibleSections}
          projects={projects}
          onExpandedChange={setProjectsExpanded}
        />
        <Contact
          sectionRef={sectionRefs.contact}
          visibleSections={visibleSections}
          footTag={profile?.footTag}
          githubUrl={profile?.github}
          twitterUrl={profile?.twitter}
          linkedInUrl={profile?.linkedIn}
          email={profile?.email}
        />

        {/* Chat Widget */}
        <Chat
          chatOpen={chatOpen}
          chatExpanded={chatExpanded}
          isMobile={isMobile}
          setChatOpen={setChatOpen}
          setChatExpanded={setChatExpanded}
          userId={chatUserId}
          dimmed={mentorExpanded || projectsExpanded || experienceExpanded}
        />
      </div>
    </>
  );
}
