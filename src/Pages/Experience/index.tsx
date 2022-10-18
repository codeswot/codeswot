import { useEffect, useState } from "react";
import { Experience } from "../../sharedTypes/types";
import { MobileExperienceScreen } from "./Mobile";
import db from "../../firebase";
import "./style.css";

export const ExperienceScreen = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [janguClick, setJanguClick] = useState(false);
  const [geeksClick, setGeeksClick] = useState(false);
  const [palgoClick, setPalgoClick] = useState(false);
  const [lexClick, setLexClick] = useState(false);
  useEffect(() => {
    db.collection("experience").onSnapshot((snapshot) => {
      if (snapshot) {
        const arr = [];
        let d = snapshot.docs.map((doc) => doc.data());
        arr.push(d);
        setExperience(d);
        setTimeout(() => {
          setJanguClick(true);
        }, 2000);
      }
    });
  }, []);

  return (
    <div className="text-white">
      <div className="text-center mb-8">
        <div className="text-3xl text-primary ">
          {">"}02 <span className="text-white">Experience</span>
        </div>
      </div>
      <div className="md:hidden">
        <MobileExperienceScreen exp={experience} />
      </div>

      <div className="grid grid-cols-2 gap-4text-white place-items-center items-start mt-3    ">
        <div className="hidden md:block  ">
          <div className="bg-white w-[1px] h-96 relative">
            <div className="flex items-center absolute top-[2rem]">
              <div
                className="bg-gray-50 rounded-full p-4 custom_container ma-20 cursor-pointer"
                onClick={() => {
                  setGeeksClick(false),
                    setPalgoClick(false),
                    setLexClick(false);
                  setJanguClick(true);
                }}
              >
                <div
                  className={
                    janguClick
                      ? "bg-primary rotate-[-46.46deg] sheet"
                      : "bg-[#C4C4C4] rotate-[-46.46deg] sheet"
                  }
                >
                  <div className=" d_text rotate-[46.46deg] ">
                    <div
                      className={
                        janguClick
                          ? "rounded-full w-8 h-8 text-center bg-[#353353] absolute left-7 pt-1 text-sm  text-white"
                          : "rounded-full w-8 h-8 text-center bg-white absolute left-7 pt-1 text-sm  text-black"
                      }
                    >
                      3
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="ml-16">{experience[2]?.company}</h4>
            </div>

            <div className="flex items-center absolute top-[8rem]">
              <div
                className="bg-gray-50 rounded-full p-4 custom_container ma-20 cursor-pointer"
                onClick={() => {
                  setPalgoClick(false), setLexClick(false);
                  setJanguClick(false);
                  setGeeksClick(true);
                }}
              >
                <div
                  className={
                    geeksClick
                      ? "bg-primary rotate-[-46.46deg] sheet"
                      : "bg-[#C4C4C4] rotate-[-46.46deg] sheet"
                  }
                >
                  <div className=" d_text rotate-[46.46deg] ">
                    <div
                      className={
                        geeksClick
                          ? "rounded-full w-8 h-8 text-center bg-[#353353] absolute left-7 pt-1 text-sm  text-white"
                          : "rounded-full w-8 h-8 text-center bg-white absolute left-7 pt-1 text-sm  text-black"
                      }
                    >
                      2
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="ml-16">{experience[3]?.company}</h4>
            </div>

            <div className="flex items-center absolute top-[14rem]">
              <div
                className="bg-gray-50 rounded-full p-4 custom_container ma-20 cursor-pointer"
                onClick={() => {
                  setLexClick(true);
                  setJanguClick(false);
                  setGeeksClick(false);
                  setPalgoClick(false);
                }}
              >
                <div
                  className={
                    lexClick
                      ? "bg-primary rotate-[-46.46deg] sheet"
                      : "bg-[#C4C4C4] rotate-[-46.46deg] sheet"
                  }
                >
                  <div className=" d_text rotate-[46.46deg] ">
                    <div
                      className={
                        lexClick
                          ? "rounded-full w-8 h-8 text-center bg-[#353353] absolute left-7 pt-1 text-sm  text-white"
                          : "rounded-full w-8 h-8 text-center bg-white absolute left-7 pt-1 text-sm  text-black"
                      }
                    >
                      1
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="ml-16">{experience[1]?.company}</h4>
            </div>

            <div className="flex items-center absolute top-[20rem]">
              <div
                className="bg-gray-50 rounded-full p-4 custom_container ma-20 cursor-pointer"
                onClick={() => {
                  setJanguClick(false);
                  setGeeksClick(false);
                  setPalgoClick(true);
                  setLexClick(false);
                }}
              >
                <div
                  className={
                    palgoClick
                      ? "bg-primary rotate-[-46.46deg] sheet"
                      : "bg-[#C4C4C4] rotate-[-46.46deg] sheet"
                  }
                >
                  <div className=" d_text rotate-[46.46deg] ">
                    <div
                      className={
                        palgoClick
                          ? "rounded-full w-8 h-8 text-center bg-[#353353] absolute left-7 pt-1 text-sm  text-white"
                          : "rounded-full w-8 h-8 text-center bg-white absolute left-7 pt-1 text-sm  text-black"
                      }
                    >
                      0
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="ml-16">{experience[0]?.company}</h4>
            </div>
          </div>
        </div>
        <div className="hidden md:block ml-[-30px]">
          {janguClick && (
            <div>
              {experience[2]?.title.trim() === "" ? (
                <div></div>
              ) : (
                <Jangu
                  title={experience[2]?.title}
                  startDate={experience[2]?.startDate}
                  tasks={experience[2]?.tasks}
                  endDate={experience[2]?.endDate}
                />
              )}
            </div>
          )}
          {geeksClick ? (
            <Geeks
              title={experience[3]?.title}
              startDate={experience[3]?.startDate}
              tasks={experience[3]?.tasks}
              endDate={experience[3]?.endDate}
            />
          ) : null}

          {lexClick ? (
            <Lex
              title={experience[1]?.title}
              startDate={experience[1]?.startDate}
              endDate={experience[1]?.endDate}
              tasks={experience[1]?.tasks}
            />
          ) : null}
          {palgoClick ? (
            <Palgo
              title={experience[0]?.title}
              startDate={experience[0]?.startDate}
              tasks={experience[0]?.tasks}
              endDate={experience[0]?.endDate}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

interface ChildProp {
  title: string;
  startDate: string;
  endDate: string;
  tasks: Array<string>;
}

function Jangu({ title, startDate, tasks, endDate }: ChildProp) {
  return (
    <div>
      <h2 className="text-[#E6F1FF] text-3xl mb-3">{title}</h2>
      <h6 className="text-[14px] font-[200]">
        {" "}
        {startDate} - {endDate}
      </h6>

      {tasks.map((item) => (
        <div className="my-6 text-base md:w-57">
          <span className="text-primary ">. </span> {item}
        </div>
      ))}
    </div>
  );
}

function Geeks({ title, startDate, tasks, endDate }: ChildProp) {
  return (
    <div>
      <h2 className="text-[#E6F1FF] text-3xl mb-3">{title}</h2>
      <h6 className="text-[14px] font-[200]">
        {" "}
        {startDate} - {endDate}
      </h6>

      {tasks.map((item) => (
        <div className="my-6 text-base md:w-57">
          <span className="text-primary ">. </span> {item}
        </div>
      ))}
    </div>
  );
}

function Palgo({ title, startDate, tasks, endDate }: ChildProp) {
  return (
    <div>
      <h2 className="text-[#E6F1FF] text-3xl mb-3">{title}</h2>
      <h6 className="text-[14px] font-[200]">
        {" "}
        {startDate} - {endDate}
      </h6>

      {tasks.map((item) => (
        <div className="my-6 text-base md:w-57">
          <span className="text-primary ">. </span> {item}
        </div>
      ))}
    </div>
  );
}

function Lex({ title, startDate, tasks, endDate }: ChildProp) {
  return (
    <div>
      <h2 className="text-[#E6F1FF] text-3xl mb-3">{title}</h2>
      <h6 className="text-[14px] font-[200]">
        {" "}
        {startDate} - {endDate}
      </h6>

      {tasks.map((item) => (
        <div className="my-6 text-base md:w-57">
          <span className="text-primary ">. </span> {item}
        </div>
      ))}
    </div>
  );
}
