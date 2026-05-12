import type { ExperienceItem } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ExperienceProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  visibleSections: Set<string>;
  experience?: ExperienceItem[];
  onExpandedChange?: (expanded: boolean) => void;
}

interface ExperienceView {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  current: boolean;
  links: string[];
  location?: string;
}

export const Experience = ({ sectionRef, visibleSections, experience = [], onExpandedChange }: ExperienceProps) => {
  const [activeExperience, setActiveExperience] = useState<ExperienceView | null>(null);

  useEffect(() => {
    onExpandedChange?.(!!activeExperience);
    if (!activeExperience) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveExperience(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [activeExperience, onExpandedChange]);

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

  const experiences: ExperienceView[] = sorted.map((e) => {
    const start = toJsDate(e.start);
    const end = toJsDate(e.end ?? null);
    const left = start ? `${start.toLocaleString('default', { month: 'short' })} ${start.getFullYear()}` : '';
    const right = e.current ? 'Present' : end ? `${end.toLocaleString('default', { month: 'short' })} ${end.getFullYear()}` : '';
    const duration = formatDuration(start, e.current ? null : end);
    const period = `${left} - ${right} · ${duration}`.trim();
    return {
      id: e.id,
      company: e.company,
      position: e.title,
      period,
      description: e.desc,
      current: !!e.current,
      links: e.links || [],
      location: e.location,
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
                key={exp.id || index}
                onClick={() => setActiveExperience(exp)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveExperience(exp);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${exp.position} at ${exp.company}`}
                className={`relative flex items-start space-x-8 cursor-pointer hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#64FFDA]/50 rounded transition-all duration-1000 ${
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

      {activeExperience && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-[blurIn_180ms_ease-out]"
            onClick={() => setActiveExperience(null)}
            aria-hidden="true"
          />
          <Card
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-detail-title"
            className="fixed inset-4 md:inset-x-0 md:inset-y-10 md:mx-auto md:max-w-5xl z-50 bg-[#1a2332] border-[#64FFDA] shadow-2xl overflow-hidden rounded-lg flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#64FFDA]/20">
              <div id="experience-detail-title" className="text-white font-semibold truncate pr-3">
                <span className="text-[#64FFDA]">{">"} </span>{activeExperience.position}
              </div>
              <button
                onClick={() => setActiveExperience(null)}
                className="text-gray-400 hover:text-[#64FFDA] hover:scale-105 transition-all duration-300 h-7 w-7 flex items-center justify-center rounded flex-shrink-0"
                aria-label="Close experience details"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              <div className="space-y-1">
                <h4 className="text-[#64FFDA] font-medium">{activeExperience.company}</h4>
                <time className="text-gray-400 text-sm block">{activeExperience.period}</time>
                {activeExperience.location && (
                  <p className="text-gray-400 text-sm">{activeExperience.location}</p>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {activeExperience.description}
              </p>

              {activeExperience.links.length > 0 && (
                <div>
                  <h4 className="text-[#64FFDA] text-xs font-semibold mb-2 uppercase tracking-wide">
                    Links
                  </h4>
                  <ul className="space-y-1">
                    {activeExperience.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#64FFDA] hover:underline text-sm break-all"
                        >
                          <ExternalLink size={14} className="flex-shrink-0" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </section>
  );
};