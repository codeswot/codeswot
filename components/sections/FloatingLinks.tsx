import { Github, Linkedin, Mail, Twitter } from "lucide-react";

interface FloatingLinksProps {
  githubUrl?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  email?: string;
}

export const FloatingLinks = ({ githubUrl, twitterUrl, linkedInUrl, email }: FloatingLinksProps) => {
  return (
    <>
      {/* Fixed Social Links - Bottom Left (Desktop Only) */}
      <div className="fixed left-6 bottom-0 z-20 hidden lg:flex flex-col items-center space-y-4">
        <a
          href={githubUrl || "https://github.com/codeswot"}
          className="p-2 text-gray-400 hover:text-[#64FFDA] transition-all duration-300 hover:scale-105 transform"
          aria-label="GitHub Profile"
        >
          <Github size={20} />
        </a>
        <a
          href={twitterUrl || "https://x.com/codeswot"}
          className="p-2 text-gray-400 hover:text-[#64FFDA] transition-all duration-300 hover:scale-105 transform"
          aria-label="Twitter Profile"
        >
          <Twitter size={20} />
        </a>
        <a
          href={linkedInUrl || "https://linkedin.com/in/codeswot"}
          className="p-2 text-gray-400 hover:text-[#64FFDA] transition-all duration-300 hover:scale-105 transform"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={20} />
        </a>
        <div className="w-px h-24 bg-gray-600" aria-hidden="true"></div>
      </div>

      {/* Fixed Email - Top Right (Desktop Only) */}
      <div className="fixed right-[-5rem] top-32 z-20 hidden lg:flex justify-center items-center">
        <div className="transform rotate-90 origin-center hover:scale-105 transition-transform duration-300">
          <a
            href={`mailto:${email || "mubarak@codeswot.me"}`}
            className="text-gray-400 text-sm tracking-widest whitespace-nowrap hover:text-[#64FFDA] transition-colors duration-300"
            aria-label={`Send email to ${email || "mubarak@codeswot.me"}`}
          >
            {email || "mubarak@codeswot.me"}
          </a>
        </div>
        <div
          className="w-px h-24 bg-gray-600 ml-6 transform rotate-90 origin-center"
          aria-hidden="true"
        >
        </div>
      </div>
    </>
  );
}; 