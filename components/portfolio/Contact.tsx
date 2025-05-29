import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

interface ContactProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  visibleSections: Set<string>;
}

export const Contact = ({ sectionRef, visibleSections }: ContactProps) => {
  return (
    <section
      id="contact"
      ref={sectionRef}
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
  );
}; 