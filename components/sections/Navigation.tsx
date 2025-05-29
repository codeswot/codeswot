import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleNavItemClick: (sectionId: string, index: number) => void;
  activeNavItem: number | null;
  keyboardNavActive: boolean;
}

export const Navigation = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  handleNavItemClick,
  activeNavItem,
  keyboardNavActive,
}: NavigationProps) => {
  const navigationItems = [
    { key: "0", label: "Home", section: "home", number: "00" },
    { key: "1", label: "About", section: "about", number: "01" },
    { key: "2", label: "Experience", section: "experience", number: "02" },
    { key: "3", label: "Projects", section: "projects", number: "03" },
    { key: "4", label: "Contact", section: "contact", number: "04" },
    { key: "5", label: "Resume", section: "resume", number: "05" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 bg-[#1a2332]/95 backdrop-blur-sm border-b border-[#64FFDA]/20"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-[#64FFDA] hover:scale-105 transition-transform duration-300">
            <a href="#home" aria-label="Codeswot - Home">
              <div className="flex items-center select-none">
                <span className="text-[#64FFDA] font-mono text-2xl font-bold">{'{'}</span>
                <span className="text-[#64FFDA] font-mono text-2xl font-extrabold">C</span>
                <span className="text-[#64FFDA] font-mono text-2xl font-bold">{'}'}</span>
                <span className="text-gray-100 font-mono text-2xl font-semibold">odeswot</span>
              </div>
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
  );
}; 