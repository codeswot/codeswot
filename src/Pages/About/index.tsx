import mub from "../../assets/muby.jpg";
import { MentorCard } from "../../component/Core/MentorCard";
import "./style.css";
import db from "../../firebase";
import { useEffect, useState } from "react";
import { Mentor } from "../../sharedTypes/types";

// const mentors = [
//     {
//         fName: 'Johan',
//         lName: 'Walhout',
//         about: 'The live like counter is an awesome software engineer with a tremendous skilset he is super',
//         role: 'CTO Palgo'
//     },
//     {
//         fName: 'Chris',
//         lName: 'Sells',
//         about: 'The live like counter is an awesome software engineer with a tremendous skilset he is super',
//         role: 'PM Meta'
//     },
//     {
//         fName: 'Shams',
//         lName: 'Khalil',
//         about: 'The live like counter is an awesome software engineer with a tremendous skilset he is super',
//         role: 'CTO Lexington'
//     }
// ]

interface AboutProp {
  image: string;
  about: string;
  favoriteTools: Array<string>;
}

export const AboutScreen = ({ image, favoriteTools, about }: AboutProp) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  useEffect(() => {
    db.collection("mentors").onSnapshot((snapshot) => {
      if (snapshot) {
        const arr = [];
        let d = snapshot.docs.map((doc) => doc.data());
        arr.push(d);
        setMentors(d);
        setTimeout(() => {
          console.log(">>men", d);
        }, 5000);
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-1 place-items-center">
      <div className=" sm:block md:hidden ">
        <img src={image} className="hidden sm:block" />
      </div>
      <div
        className="
         flex  space-x-10   mt-3   "
      >
        <div className="max-w-[590px]">
          <div className="mb-7 flex justify-center">
            <img src={image} width="300px" className="hide_md" />
          </div>
          <div>
            <div className="text-3xl font-semibold mb-4 text-white">
              <span className="text-primary mr-2">{">"} 01.</span>
              About
            </div>
            <div className=" text-lg font-medium text-white  ">{about}</div>

            <div className="mt-8 text-white">
              <div className="text-lg font-bold mb-2">
                {">"} <span className="text-primary">I love_</span>
              </div>

              <div className="w-72 flex justify-between text-white  text-sm">
                {favoriteTools.map((item) => (
                  <div>
                    <div>
                      <span className="text-primary">.</span>
                      {item}
                    </div>
                    
                  </div>
                ))}

                {/* <div>
                  <div>
                    <span className="text-primary">.</span>Typescript
                  </div>
                  <div>
                    <span className="text-primary">.</span>React
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="md:flex md:flex-row md:space-x-10 mb-4">
            <div className="text-xl my-10 text-white ">
              {">"} <span className="text-primary">Mentors_</span>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <img src={image} width="300px" />
        </div>
      </div>

      <div className="md:flex md:flex-row md:space-x-10  grid grid-cols-1 mb-4 gap-8 ">
        {mentors.map((item) => (
          <MentorCard
            role={item.title}
            about={item.bio}
            fName={item.fName}
            lName={item.lName}
            bio={item.bio}
            desc={item.desc}
          />
        ))}
      </div>
    </div>
  );
};
