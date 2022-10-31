import "./style.css";

interface IntroProp {
  intro: string;
  about: string;
  qoute: string;
}

export const IntroWindow = ({ about, intro, qoute }: IntroProp) => {
  return (
    <div className="intro-container md:h-[500px] h-[600px] md:w-[570px] ">
      <div className="intro-header">
        <div className="control" style={{ backgroundColor: "#FF0000" }}></div>
        <div className="control" style={{ backgroundColor: "#FAFF00" }}></div>
        <div className="control" style={{ backgroundColor: "#64FFDA" }}></div>
      </div>
      <div className="intro-body px-8 mt-8 w-[280px]">
        {intro.trim() === "" ? (
          <div className="typing-demo text-2xl">$:</div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">$: Hi 👋, I am Codeswot </h1>
            <h1 className="text-2xl font-bold">I Turn Coffee into Code</h1>
            <h2 className="mt-10 md:text-sm font-semibold  ">{intro}</h2>

            <div className="absolute w-full bottom-10">
              <h4 className="text-sm pr-8">$: {qoute} </h4>
              <div className="flex justify-end px-14 items-center mt-4">
                <h6 className="mr-10 text-xs  sm:text[8px]">__ Mubarak I.</h6>
                <a href="#about">
                <div className="btn cursor-pointer md:font-bold text-sm sm:text-base ">
                  {">"} <span className=""> Know me_</span>
                </div>
                </a>
              
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
