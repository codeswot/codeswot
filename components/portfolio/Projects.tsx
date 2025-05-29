import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

interface ProjectsProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  visibleSections: Set<string>;
}

export const Projects = ({ sectionRef, visibleSections }: ProjectsProps) => {
  const projects = [
    {
      name: "Palgo.com",
      description:
        "Social  e-commerce you can offer your creative services, sell products",
      image: "https://media.licdn.com/dms/image/v2/C560BAQHH3Odi6clGLQ/company-logo_200_200/company-logo_200_200/0/1643747796582/palgo_com_logo?e=1753920000&v=beta&t=DqqXJQ7MPGlOYK_lALPQp_2iijJJXnu-VbLJzg12pKU",
      technologies: ["Flutter", "Firebase", "Node.js"],
    },
    {
      name: "NasBox",
      description:
        "Custom proprietary AOSP media player and more",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["AOSP", "Flutter", "FFMPEG", "python"],
    },
    {
      name: "NiceApp",
      description:
        "An in house communication app for the Nigerian Customs",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Supabase", "SQL", "Flutter"],
    },
    {
      name: "Instructra",
      description:
        "Instructra helps you find driving instructors, book flexible lessons.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Supabase", "Flutter"],
    },
    {
      name: "Nahdi",
      description:
        "e-commerece mobile app for the Nahdi-online store",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Flutter"],
    },
    {
      name: "NM Japanese Dictionary",
      description:
        "Nihongo Master Japanese dictionary, helps user learn kanjis and words in japanese",
      image: "https://www.nihongomaster.com/build/assets/main-47f739e0.png",
      technologies: ["Flutter", "Firebase", "sqlite"],
    },
  ];

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
              key={index}
              className={`bg-[#1a2332] border-[#64FFDA]/20 rounded-lg overflow-hidden hover:border-[#64FFDA]/50 hover:scale-[1.02] transition-all duration-300 ${
                visibleSections.has("projects")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visibleSections.has("projects")
                  ? `${index * 200}ms`
                  : "0ms",
              }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.name} project screenshot`}
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/90 to-transparent"
                    aria-hidden="true"
                  >
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white mb-2 hover:text-[#64FFDA] transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-gray-300 mb-3 text-sm leading-relaxed">
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
                          {tech}
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