import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Twitter } from "lucide-react";

interface AboutProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  visibleSections: Set<string>;
}

export const About = ({ sectionRef, visibleSections }: AboutProps) => {
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
  );
}; 