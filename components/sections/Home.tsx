import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface HomeProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export const Home = ({ sectionRef }: HomeProps) => {
  const [terminalText, setTerminalText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const staticText = `$ Hi 👋 I am Codeswot I Turn code into Stuff.

Your Friendly neighbourhood developer With great power comes great responsibilities, Hard work, studies and constant coding I have acquired the awesome power of building amazing applications and software solutions. I am a mobile developer with a passion for creating beautiful and functional user experiences.`;

  const animatedText = `Always believe in you ability to achieve greatness`;

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
      setShowCursor((prev: boolean) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-start justify-center px-4 sm:px-6 pt-32"
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
  );
}; 