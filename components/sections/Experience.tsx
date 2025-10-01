import type { ExperienceItem } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";

interface ExperienceProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  visibleSections: Set<string>;
  experience?: ExperienceItem[];
}

export const Experience = ({ sectionRef, visibleSections, experience = [] }: ExperienceProps) => {
  const toJsDate = (value: Date | Timestamp | null | undefined): Date | null => {
    if (!value) return null;
    return value instanceof Date ? value : value.toDate();
  };

  const formatDuration = (from: Date | null, to: Date | null): string => {
    if (!from) return '';
    const end = to || new Date();
    let months = (end.getFullYear() - from.getFullYear()) * 12 + (end.getMonth() - from.getMonth());
    if (end.getDate() < from.getDate()) months -= 1;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
    if (remMonths > 0 || parts.length === 0) parts.push(`${remMonths} ${remMonths === 1 ? 'mo' : 'mos'}`);
    return parts.join(' ');
  };

  const sorted = [...experience].sort((a, b) => {
    const ad = toJsDate(a.start)?.getTime() || 0;
    const bd = toJsDate(b.start)?.getTime() || 0;
    return bd - ad;
  });

  const experiences = sorted.map((e) => {
    const start = toJsDate(e.start);
    const end = toJsDate(e.end ?? null);
    const left = start ? `${start.toLocaleString('default', { month: 'short' })} ${start.getFullYear()}` : '';
    const right = e.current ? 'Present' : end ? `${end.toLocaleString('default', { month: 'short' })} ${end.getFullYear()}` : '';
    const duration = formatDuration(start, end);
    const period = `${left} - ${right} · ${duration}`.trim();
    return {
      company: e.company,
      position: e.title,
      period,
      description: e.desc,
      current: !!e.current,
      links: e.links || [],
    };
  });

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