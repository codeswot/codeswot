import github from "../../assets/github.svg";
import linkdin from "../../assets/in.svg";
import twitter from "../../assets/twitter.svg";
import TextTruncate from "react-text-truncate";
import { useState } from "react";
const icons = [
  {
    img: github,
  },
  { img: twitter },
  { img: linkdin },
];

interface Mentor {
  fName: string;
  lName: string;
  about: string;
  role: string;
  bio: string;
  desc: string;
  
}

export const MentorCard = ({ fName, lName, role, bio, desc }: Mentor) => {
  const [showAllText, setShowAllText] = useState(false);
  return (
    <div className="bg-silver rounded-xl px-4  py-2 custom_shadow w-72 ">
      <div className="mb-5 text-black font-semibold  text-xl ">
        {fName} <br />
        {lName}
       
      </div>
      <TextTruncate
        line={showAllText ? 9999 : 3}
        element="small"
        truncateText="…"
        text={desc}
        textTruncateChild={
          <div
            onClick={() => setShowAllText(true)}
            style={{ textTransform: "capitalize", color: "green", fontSize: '12px', cursor: 'pointer' }}
          >
            more
          </div>
        }
      />
      <div className="grid grid-cols-2 items-center mt-3">
        <div className="text-sm">{role}</div>

        <div className="flex ">
          {icons.map((item) => (
            <a className="mx-2">
              <img src={item.img} width="17px"  />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
