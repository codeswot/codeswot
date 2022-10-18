import "./style.css";
import { ProjectCard } from "../../component/Core/ProjectCard";
import jangu from "../../assets/jangu.svg";
import flutter from "../../assets/flutter.svg";
import { useEffect, useState } from "react";
import { Project, Tech } from "../../sharedTypes/types";
import db from "../../firebase";

const project = [
  {
    name: "JanguAsk",
    logo: jangu,
    about:
      "The Social Education App, lorem ipsun blah blah blah for the sake  of testing here we go...",
    technologies: [
      {
        name: "flutter",
        logo: flutter,
      },
    ],
  },
  {
    name: "Gyara",
    logo: jangu,
    about:
      "The Social Education App, lorem ipsun blah blah blah for the sake  of testing here we go...",
    technologies: [
      {
        name: "flutter",
        logo: flutter,
      },
    ],
  },
  {
    name: "Palgo",
    logo: jangu,
    about:
      "The Social Education App, lorem ipsun blah blah blah for the sake  of testing here we go...",
    technologies: [
      {
        name: "flutter",
        logo: flutter,
      },
    ],
  },
  {
    name: "Palace",
    logo: jangu,
    about:
      "The Social Education App, lorem ipsun blah blah blah for the sake  of testing here we go...",
    technologies: [
      {
        name: "flutter",
        logo: flutter,
      },
    ],
  },
  {
    name: "Clock ",
    logo: jangu,
    about:
      "The Social Education App, lorem ipsun blah blah blah for the sake  of testing here we go...",
    technologies: [
      {
        name: "flutter",
        logo: flutter,
      },
    ],
  },
];

export const ProjectScreen = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    db.collection("projects").onSnapshot((snapshot) => {
      if (snapshot) {
        const arr = [];
        let d = snapshot.docs.map((doc) => doc.data());
        arr.push(d);
        setProjects(d);
        setTimeout(() => {
          console.log(">>pro", projects);
        }, 5000);
      }
    });
  }, []);

 

  return (
    <div className="grid grid-cols-1 place-items-center ">
      <div className=" mb-16">
        <div className="text-3xl text-primary  text-center sm:text-left">
          {">"}03 <span className="text-white">Project</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-16 ">
        {projects.map((item, idx) => (
          <div className="md:w-72">
            <ProjectCard
              name={item.title}
              logo={item.icon}
              about={item.description}
              technologies={item.technologies}
              links={item.links}
              
            />
          </div>
        ))}
      </div>
    </div>
  );
};
