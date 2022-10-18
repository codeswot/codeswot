import { useEffect, useState } from "react";
import { Experience } from "../../sharedTypes/types";
import "./style.css";

interface ExperienceProp {
  exp: Array<Experience>;
}

export const MobileExperienceScreen = ({ exp }: ExperienceProp) => {
  const [janguClick, setJanguClick] = useState(false);
  const [geeksClick, setGeeksClick] = useState(false);
  const [palgoClick, setPalgoClick] = useState(false);
  const [lexClick, setLexClick] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setJanguClick(true)
      
    }, 3000);
    
  }, [])
  

  return (
    <div className="text-white mt-14">
      <div className="grid grid-cols-1 place-items-center  ">
        <div className="h-[1px] w-full bg-white relative">
          <div className="flex items-center absolute  ">
            <div
              className="bg-gray-50 rounded-full p-4 custom_container cursor-pointer ml-4"
              onClick={() => {
                setGeeksClick(false), setPalgoClick(false), setLexClick(false);
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
          </div>
          <div className="flex items-center absolute left-[7rem]">
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
          </div>
          <div className="flex items-center absolute left-[14rem]">
            <div
              className="bg-gray-50 rounded-full p-4 custom_container ma-20 cursor-pointer"
              onClick={() => {
                setLexClick(false);
                setJanguClick(false);
                setGeeksClick(false);
                setPalgoClick(true);
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
                    1
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center absolute left-[20rem]">
            <div
              className="bg-gray-50 rounded-full p-4 custom_container ma-20 cursor-pointer"
              onClick={() => {
                setJanguClick(false);
                setGeeksClick(false);
                setPalgoClick(false);
                setLexClick(true);
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
                    0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14">
        {janguClick ? (
          <Jangu
            title={exp[2]?.title}
            startDate={exp[2]?.startDate}
            tasks={exp[2]?.tasks}
            company={exp[2]?.company}
            endDate={exp[2]?.endDate}
          />
        ) : null}
        {geeksClick ? (
          <Geeks
            title={exp[2]?.title}
            startDate={exp[3]?.startDate}
            tasks={exp[3]?.tasks}
            company={exp[3]?.company}
            endDate={exp[3]?.endDate}
          />
        ) : null}
        {palgoClick ? (
          <Palgo
            title={exp[0]?.title}
            startDate={exp[0]?.startDate}
            tasks={exp[0]?.tasks}
            company={exp[0]?.company}
            endDate={exp[0]?.endDate}
          />
        ) : null}
        {lexClick ? (
          <Lex
            title={exp[1]?.title}
            startDate={exp[1]?.startDate}
            tasks={exp[1]?.tasks}
            company={exp[1]?.company}
            endDate={exp[1]?.endDate}
          />
        ) : null}
      </div>
    </div>
  );
};

interface ChildProp {
  title: string;
  startDate: string;
  endDate: string;
  company: string;
  tasks: Array<string>;
}

function Jangu({ title, startDate, tasks, endDate, company }: ChildProp) {
  return (
    <div>
      <h2 className="text-[#E6F1FF] text-3xl mb-3">{company}</h2>
      <h2 className="text-[#E6F1FF] text-large mb-3">{title}</h2>
      <h6 className="text-[14px] font-[200]">
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

function Geeks({ title, startDate, tasks, endDate, company }: ChildProp) {
  return (
    <div>
      <h2 className="text-[#E6F1FF] text-3xl mb-3">{company}</h2>
      <h2 className="text-[#E6F1FF] text-large mb-3">{title}</h2>
      <h6 className="text-[14px] font-[200]">
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

function Palgo({ title, startDate, tasks, endDate, company }: ChildProp) {
  return (
    <div>
      <h2 className="text-[#E6F1FF] text-3xl mb-3">{company}</h2>
      <h2 className="text-[#E6F1FF] text-large mb-3">{title}</h2>
      <h6 className="text-[14px] font-[200]">
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

function Lex({ title, startDate, tasks, endDate, company }: ChildProp) {
  return (
    <div>
      <h2 className="text-[#E6F1FF] text-3xl mb-3">{company}</h2>
      <h2 className="text-[#E6F1FF] text-large mb-3">{title}</h2>
      <h6 className="text-[14px] font-[200]">
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
