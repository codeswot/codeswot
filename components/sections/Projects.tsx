import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { analytics } from "@/lib/firebase";
import { logEvent } from 'firebase/analytics';
import type { ProjectWithTechs } from "@/lib/firestore";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ProjectsProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  visibleSections: Set<string>;
  projects?: ProjectWithTechs[];
  onExpandedChange?: (expanded: boolean) => void;
}

export const Projects = ({ sectionRef, visibleSections, projects = [], onExpandedChange }: ProjectsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectWithTechs | null>(null);

  const anyOverlayOpen = showAll || !!activeProject;

  useEffect(() => {
    onExpandedChange?.(anyOverlayOpen);
    if (!anyOverlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeProject) setActiveProject(null);
        else if (showAll) setShowAll(false);
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [anyOverlayOpen, activeProject, showAll, onExpandedChange]);

  const handleProjectClick = async (project: ProjectWithTechs) => {
    if (analytics) {
      try { logEvent(analytics, 'project_click', { project_id: project.id }); } catch {}
    }
    setActiveProject(project);
  };

  const handleShowMore = () => {
    setShowAll(true);
    if (analytics) {
      try { logEvent(analytics, 'projects_show_more'); } catch {}
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-6"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto px-8 lg:px-24">
        <h2
          id="projects-heading"
          className={`text-3xl font-bold mb-16 transition-all duration-1000 ${
            visibleSections.has("projects")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#64FFDA]">{">"} 03.</span> Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group bg-[#1a2332] border-[#64FFDA]/20 rounded-lg overflow-hidden hover:border-[#64FFDA]/50 transform-gpu will-change-transform hover:scale-[1.01] transition-transform duration-300 cursor-pointer ${
                visibleSections.has("projects")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visibleSections.has("projects")
                  ? `${index * 200}ms`
                  : "0ms",
              }}
              onClick={() => handleProjectClick(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjectClick(project);
                }
              }}
              aria-label={`View details for ${project.title} project`}
            >
              <CardContent className="p-0 rounded-lg overflow-hidden">
                <div className="relative overflow-hidden bg-black rounded-lg">
                  <img
                    src={project.icon || "/placeholder.svg"}
                    alt={`${project.title} project screenshot`}
                    className="w-full h-40 object-cover transition-transform duration-500 transform-gpu will-change-transform group-hover:scale-102 rounded-lg"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[#000000A4]/60 backdrop-blur-md will-change-[opacity] rounded-lg"
                    aria-hidden="true"
                  >
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white mb-2 hover:text-[#64FFDA] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p
                      className="text-gray-300 mb-3 text-sm leading-relaxed"
                      style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {project.description}
                    </p>
                    <div
                      className="flex flex-wrap gap-1"
                      role="list"
                      aria-label="Technologies used"
                    >
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-[#64FFDA]/20 text-[#64FFDA] text-xs rounded hover:scale-[1.02] transition-transform duration-300"
                          role="listitem"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </article>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-1000 delay-400 ${
            visibleSections.has("projects")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            onClick={handleShowMore}
            variant="outline"
            className="border border-[#64FFDA] text-[#64FFDA] bg-transparent hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-[1.02] transition-all duration-300 px-6 py-2"
            aria-label="Show more projects"
          >
            {">"} Show More_
          </Button>
        </div>
      </div>

      {showAll && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-[blurIn_180ms_ease-out]"
            onClick={() => setShowAll(false)}
            aria-hidden="true"
          />
          <Card
            role="dialog"
            aria-modal="true"
            aria-labelledby="projects-detail-title"
            className="fixed inset-4 md:inset-x-0 md:inset-y-10 md:mx-auto md:max-w-5xl z-50 bg-[#1a2332] border-[#64FFDA] shadow-2xl overflow-hidden rounded-lg flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#64FFDA]/20">
              <div id="projects-detail-title" className="text-white font-semibold">
                <span className="text-[#64FFDA]">{">"} 03.</span> All Projects
              </div>
              <button
                onClick={() => setShowAll(false)}
                className="text-gray-400 hover:text-[#64FFDA] hover:scale-105 transition-all duration-300 h-7 w-7 flex items-center justify-center rounded"
                aria-label="Close projects list"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${project.title}`}
                    className="group bg-[#0f1722] border border-[#64FFDA]/20 rounded-lg overflow-hidden hover:border-[#64FFDA]/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative overflow-hidden bg-black">
                      <img
                        src={project.icon || "/placeholder.svg"}
                        alt={`${project.title} screenshot`}
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="text-base font-semibold text-white group-hover:text-[#64FFDA] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1" role="list" aria-label="Technologies used">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-[#64FFDA]/15 text-[#64FFDA] text-xs rounded"
                            role="listitem"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
                {projects.length === 0 && (
                  <p className="col-span-full text-gray-400 text-sm text-center py-8">
                    No projects available.
                  </p>
                )}
              </div>
            </div>
          </Card>
        </>
      )}

      {activeProject && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-[blurIn_180ms_ease-out]"
            onClick={() => setActiveProject(null)}
            aria-hidden="true"
          />
          <Card
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            className="fixed inset-4 md:inset-x-0 md:inset-y-10 md:mx-auto md:max-w-5xl z-50 bg-[#1a2332] border-[#64FFDA] shadow-2xl overflow-hidden rounded-lg flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#64FFDA]/20">
              <div id="project-detail-title" className="text-white font-semibold truncate pr-3">
                <span className="text-[#64FFDA]">{">"} </span>{activeProject.title}
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="text-gray-400 hover:text-[#64FFDA] hover:scale-105 transition-all duration-300 h-7 w-7 flex items-center justify-center rounded flex-shrink-0"
                aria-label="Close project details"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="relative bg-black">
                <img
                  src={activeProject.icon || "/placeholder.svg"}
                  alt={`${activeProject.title} screenshot`}
                  className="w-full max-h-[40vh] object-cover"
                />
              </div>
              <div className="px-5 py-5 space-y-4">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {activeProject.description}
                </p>
                {activeProject.technologies.length > 0 && (
                  <div>
                    <h4 className="text-[#64FFDA] text-xs font-semibold mb-2 uppercase tracking-wide">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                      {activeProject.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-[#64FFDA]/15 text-[#64FFDA] text-xs rounded"
                          role="listitem"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </>
      )}
    </section>
  );
};