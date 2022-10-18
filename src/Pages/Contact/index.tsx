import star from "../../assets/Star 1.svg";
import fork from "../../assets/forks.jpg";
import githubI from "../../assets/github.svg";
import linkdinI from "../../assets/in.svg";
import twitterI from "../../assets/twitter.svg";
interface ContactProp {
  footag: string;
  twitter: string;
  github: string;
  linkedIn: string;
}
export const Contact = ({ footag, twitter, github, linkedIn }: ContactProp) => {
  const icons = [
    {
      img: githubI,
      to: github,
    },
    { img: twitterI, to: twitter },
    { img: linkdinI, to: linkedIn },
  ];
  return (
    <div className="grid grid-cols-1 place-items-center relative">
      <div className="text-3xl text-primary text-center">
        {">"}05 <span className="text-white">Contact</span>
      </div>
      <div className="text-4xl font-bold text-center text-white mt-5">
        Get in Touch
      </div>
      <div className="font-extralight mt-5 text-center  text-white  text-xl">
        Want to say hello? you can easily reach me
      </div>
      <div className="font-extralight mt-1 text-center mb-5 text-white  text-xl">
        with these hot coners
      </div>
      <div className="font-extralight my-2 text-lg text-white hidden md:block ">
        <span className="text-[#64FFDA]">. </span>
        Top right (email)
      </div>
      <div className="font-extralight my-2 text-lg text-white  hidden md:block">
        <span className="text-[#64FFDA]">. </span>
        Bottom left (socials)
      </div>
      <div className="font-extralight my-2 text-lg text-white md:hidden ">
        <span className="text-[#64FFDA]">. </span>
        Bottom (socials)
      </div>

      <div className=" md:hidden flex space-x-6">
        {icons.map((item, idx) => (
          <a href={item.to} target="_blank" key={idx}>
            <div className="rounded-3xl bg-gray w-6 my-5">
              <img
                src={item.img}
                className="inline-block h-5 w-5 rounded-full ring-8 ring-gray"
              />
            </div>
          </a>
        ))}
      </div>

      <div className="md:hidden">
        <div className="text-center mb-4 text-white">or</div>

        <div className="flex justify-center place-items-center">
          <a href="mailto:elmubarak333@gmail.com">
            <button>Email me_</button>
          </a>
        </div>
      </div>

      <div className="font-extralight text-white text-body-2 text-center mt-24 relative bottom-5">
        <div className=" w-80">{footag}</div>
      </div>
    </div>
  );
};
