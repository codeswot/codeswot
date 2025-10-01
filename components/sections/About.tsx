import type { Mentor } from "@/lib/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Twitter } from "lucide-react";

interface AboutProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  visibleSections: Set<string>;
  about?: string;
  favoriteTools?: string[];
  profilePhoto?: string;
  mentors?: Mentor[];
}

export const About = ({ sectionRef, visibleSections, about, favoriteTools, profilePhoto, mentors = [] }: AboutProps) => {

  return (
    <section
      id="about"
      ref={sectionRef}
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
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {about || ""}
            </p>

            <div className="space-y-4">
              <h3 className="text-[#64FFDA] font-semibold">
                {">"} I Love_
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                {(favoriteTools || ["Flutter", "ReactJs", "NodeJs"]).map((tool, idx) => (
                  <div key={`${tool}-${idx}`} className="text-gray-300 hover:text-[#64FFDA] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                    .{tool}
                  </div>
                ))}
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
                  src={(profilePhoto || "/mubarak.jpg") + "?height=156&width=156"}
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
                className={`bg-[#1a2332] text-white border-[#64FFDA]/20 rounded-lg overflow-hidden hover:border-[#64FFDA]/50 hover:scale-[1.02] transition-all duration-300`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <img
                      src={mentor.avatar || "/placeholder.svg"}
                      alt={`${mentor.name}`}
                      className="w-10 h-10 rounded-full border border-[#64FFDA]/20 hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <h4
                        className={`font-semibold mb-1 text-white`}
                        style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                      >
                        {mentor.name}
                      </h4>
                      {mentor.title && (
                        <p className={`text-xs mb-2 text-gray-400`}
                           style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                        >
                          {mentor.title}
                        </p>
                      )}
                      <p
                        className={`text-xs leading-relaxed text-gray-400`}
                        style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                      >
                        {(() => {
                          const full = mentor.bio || mentor.desc || '';
                          const trimmed = full.length > 200 ? `${full.slice(0, 200)}…` : full;
                          return trimmed;
                        })()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <a
                      href={mentor.github || "#"}
                      aria-label={`${mentor.name}'s GitHub profile`}
                      className={`text-gray-500 hover:text-[#64FFDA] hover:scale-110 transition-all duration-300`}
                    >
                      <Github size={14} />
                    </a>
                    <a
                      href={mentor.twitter || "#"}
                      aria-label={`${mentor.name}'s Twitter profile`}
                      className={`text-gray-500 hover:text-[#64FFDA] hover:scale-110 transition-all duration-300`}
                    >
                      <Twitter size={14} />
                    </a>
                    <a
                      href={mentor.linkedin || "#"}
                      aria-label={`${mentor.name}'s external profile`}
                      className={`text-gray-500 hover:text-[#64FFDA] hover:scale-110 transition-all duration-300`}
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
  );
}; 