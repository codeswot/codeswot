import v1 from "../../assets/playstore.svg";
import v2 from "../../assets/appstore.svg";
import v3 from "../../assets/share.svg";
import flutter from "../../assets/flutter.svg";
import jangu from "../../assets/jangu.svg";
import "./style.css";
import TextTruncate from "react-text-truncate";
import { useEffect, useState } from "react";
import { Link, Tech } from "../../sharedTypes/types";
import db from "../../firebase";

const icons = [
  {
    img: v1,
  },
  { img: v2 },
  { img: v3 },
];

type tech = {
  name: string;
  logo: string;
};
interface Project {
  logo: string;
  name: string;
  about: string;
  technologies: Array<string>;
  links: Array<Link>;
}

export const ProjectCard = ({
  name,
  about,
  technologies,
  logo,
  links,
}: Project) => {
  const [showAllText, setShowAllText] = useState(false);
  const [techs, setTechs] = useState<Tech[]>([]);
  useEffect(() => {

    getTech()

    
  }, []);
  
  const getTech = () => {
    const arr = [];

    technologies.forEach((ele) => {
      const data = {
        id: ele,
      };

      db.collection("techs")
        .doc(data.id)
        .get()
        .then(function (snapshot) {
          const data = snapshot.data()
        
          arr.push(data);
          
          setTechs(arr)
         
        });
    });
  };

  return (
    <div className="relative">
      <div className="bg-[#0F2538] text-white rounded-xl px-2 py-2 custom_shadow ">
        <div className="mb-5 flex items-center justify-between">
          <div>{name}</div>
          <div
            className="rounded-full bg-[#0F2538] p-2 absolute top-[-45px] right-[-25px] border-8 border-[#353353]
                        "
          >
            <img src={logo} width="30px" />
          </div>
        </div>

        <TextTruncate
          line={showAllText ? 9999 : 2}
          element="small"
          truncateText="…"
          text={about}
          // textTruncateChild={
          //   <div className="">
          //     <div
          //       onClick={() => setShowAllText(true)}
          //       style={{
          //         textTransform: "capitalize",
          //         color: "green",
          //         fontSize: "12px",
          //         cursor: "pointer",
          //       }}
          //     >
          //       more
          //     </div>
          //   </div>
          // }
        />

        

        <div className="grid grid-cols-2 mt-3">
          <div className="flex flex-wrap">
            {techs.map((tech, idx) => (
              <div className=" chip-bg rounded-full w-24  flex items-center space-x-1 mb-1 h-8 p-2" key={tech.id}>
                <img src={tech.icon} width="20px"  />
                <div className="text-xs">{tech.name}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <div className="flex">
              {links.map((item) => (
                <>
                  {item.type === "android" && (
                    <a className="mx-2" href={item.link}>
                      {" "}
                      <img src={v2} width="17px" />{" "}
                    </a>
                  )}
                  {item.type === "ios" && (
                    <a className="mx-2" href={item.link}>
                      {" "}
                      <img src={v1} width="17px" />{" "}
                    </a>
                  )}
                  {item.type === "web" && (
                    <a className="mx-2" href={item.link} target="_blank">
                      {" "}
                      <img src={v3} width="17px" />{" "}
                    </a>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
