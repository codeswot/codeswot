import "./App.css";
// @ts-ignore
import Zoom from "react-reveal/Zoom";
import { NavBar } from "./component/Navbar";
import { Home } from "./Pages/Home";
import { AboutScreen } from "./Pages/About";
import { ExperienceScreen } from "./Pages/Experience";
import { ProjectScreen } from "./Pages/Project";
import { BlogScreen } from "./Pages/Blog";
import { Contact } from "./Pages/Contact";
import { Chat } from "./component/Core/Chat";
import img from "../src/assets/down.svg";
import { useEffect, useState } from "react";
import db from "./firebase";
import { Profile, Quote } from "./sharedTypes/types";
interface QouteProp {}
function App() {
  const [info, setInfo] = useState<Profile>({
    about: "",
    email: "",
    favoriteTools: [""],
    fooTag: "",
    github: "",
    intro: "",
    linkedIn: "",
    profilePhoto: "",
    resume: "",
    twitter: "",
  });
  const [qoute, setQoute] = useState<Quote>({
    quote: "",
    author: "",
    default: true,
    id: "",
  });


  useEffect(() => {
    db.collection("codeswot").onSnapshot((snapshot) => {
      if (snapshot) {
       
        let d = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

       
        setInfo(d[0].data);
        
      }
    });
  }, []);

  useEffect(() => {
    db.collection("quotes").onSnapshot((snapshot) => {
      if (snapshot) {
        let d = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setQoute(d[0].data);
        
      }
    });
  }, []);
  return (
    <div className="App">
      <NavBar resume={info.resume} />
      <div className="body">
        <div className="h-screen">
          
            <Home
              email={info.email}
              about={info.about}
              fooTag={info.fooTag}
              github={info.github}
              intro={info.intro}
              twitter={info.twitter}
            
              resume={info.resume}
              profilePhoto={info.profilePhoto}
              linkedIn={info.linkedIn}
              favoriteTools={info.favoriteTools}
              qoute={qoute.quote}
            />
        </div>

        <Zoom>
          <div id="about" className="mb-48">
            <AboutScreen image={info.profilePhoto} favoriteTools={info.favoriteTools} about={info.about} />
          </div>
        </Zoom>
        <Zoom>
          <div id="experience" className="mb-48">
            <ExperienceScreen />
          </div>
        </Zoom>
        <Zoom>
          <div id="project" className="mb-48">
            <ProjectScreen />
          </div>
        </Zoom>
        {/* <Zoom>
          <div id="blog" className="mb-48">
            <BlogScreen />
          </div>
        </Zoom> */}
        <Zoom>
          <div id="contact" className=" mt-36">
            <Contact footag={info.footTag}  github={info.github}
             
              twitter={info.twitter}
            
             
              linkedIn={info.linkedIn} />
          </div>
        </Zoom>
        {/* <Chat /> */}
      </div>
    </div>
  );
}

export default App;
