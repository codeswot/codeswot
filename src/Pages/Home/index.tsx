import githubI from "../../assets/github.svg";
import linkdinI from "../../assets/in.svg";
import twitterI from "../../assets/twitter.svg";
import vector from "../../assets/Vector.svg";
import hash from "../../assets/hash.svg";
import { IntroWindow } from "../../component/Core/Intro";
import { useEffect, useState } from "react";
import db from "../../firebase";
import { Profile } from "../../sharedTypes/types";



interface HomeProp  {
  email: string;
  about: string;
  intro: string;
  qoute: string;
  twitter: string;
  github: string;
  linkdin: string;

}



export const Home = ({email, about, intro, qoute, twitter, github, linkdin}:HomeProp) => {

  const icons = [
    {
      img: githubI,
      to: github
    },
    { img: twitterI, to: twitter, },
    { img: linkdinI, to: linkdin },
  ];


  return (
    <div className="text-white grid md:grid-cols-1 place-items-center">
      <div className="flex ">
        <IntroWindow intro={intro} about={about} qoute={qoute}   />
        <div className="w-[400px] hidden md:block"></div>
      </div>
      <div className="hidden md:block fixed bottom-0 top-24 right-0">
        <img src={vector} />
      </div>
      <div className="hidden md:block fixed top-24 right-8">
        <a
          href="mailto:mubarak@codeswot.io"
          className="rotate-180 font-bold "
          style={{ writingMode: "vertical-lr" }}
        >
          {email}
        </a>
      </div>
      <div className="fixed w-full bottom-1 left-0 hidden md:block">
        <img src={hash} width="130px" height="300px" />
      </div>
      <div className="fixed w-full bottom-1 left-10 hidden md:block">
        {icons.map((item, idx) => (
          <a href={item.to} target="_blank" key={idx}>
            <div className="rounded-3xl bg-[#64FFDA] w-6 my-5">
              <img
                src={item.img}
                className="inline-block h-5 w-5 rounded-full ring-8 ring-[#64FFDA]"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
