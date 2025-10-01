import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { trackProjectView } from "@/lib/firestore";
import type { ProjectWithTechs } from "@/lib/firestore";

interface ProjectsProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  visibleSections: Set<string>;
  projects?: ProjectWithTechs[];
}

export const Projects = ({ sectionRef, visibleSections, projects = [] }: ProjectsProps) => {

  const handleProjectClick = async (projectId: string) => {
    try { await trackProjectView(projectId); } catch {}
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
              onClick={() => handleProjectClick(project.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjectClick(project.id);
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
            variant="outline"
            className="border border-[#64FFDA] text-[#64FFDA] bg-transparent hover:bg-[#64FFDA] hover:text-[#1a2332] hover:scale-[1.02] transition-all duration-300 px-6 py-2"
            aria-label="Show more projects"
          >
            {">"} Show More_
          </Button>
        </div>
      </div>
    </section>
  );
}; 