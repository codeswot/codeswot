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

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigationItems]);

  // Screen reader announcements
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
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
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
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      setMobileMenuOpen(false);
    }
  };

  const handleNavItemClick = (sectionId: string, index: number) => {
    if (sectionId === 'resume') {
      // Handle resume action
      window.open(
        'https://drive.google.com/file/d/1R3IyA2CENW81cIanieJWI2bE8RFY0N7f/view?usp=sharing'
      );
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
        <FloatingLinks />

        {/* Navigation */}
        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          handleNavItemClick={handleNavItemClick}
          activeNavItem={activeNavItem}
          keyboardNavActive={keyboardNavActive}
        />

        {/* Main Content */}
        <Home sectionRef={sectionRefs.home} />
        <About
          sectionRef={sectionRefs.about}
          visibleSections={visibleSections}
        />
        <Experience
          sectionRef={sectionRefs.experience}
          visibleSections={visibleSections}
        />
        <Projects
          sectionRef={sectionRefs.projects}
          visibleSections={visibleSections}
        />
        <Contact
          sectionRef={sectionRefs.contact}
          visibleSections={visibleSections}
        />

        {/* Chat Widget */}
        <Chat
          chatOpen={chatOpen}
          chatExpanded={chatExpanded}
          isMobile={isMobile}
          setChatOpen={setChatOpen}
          setChatExpanded={setChatExpanded}
        />
      </div>
    </>
  );
}
