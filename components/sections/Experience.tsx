interface ExperienceProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  visibleSections: Set<string>;
}

export const Experience = ({ sectionRef, visibleSections }: ExperienceProps) => {
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

  return (
    <section
      id="experience"
      ref={sectionRef}
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
  );
}; 