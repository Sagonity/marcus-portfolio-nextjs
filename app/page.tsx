import Image from "next/image";
import "./index.css";
import * as bs from "react-icons/bs"
import experience from "../data/json/experience.json"
import education from "../data/json/education.json"
import skills from "../data/json/skills.json"

export default function Home() {
  return (
    <div className="container">
      {/* About Me Section */}
      <div className="row" id="main">
        <div className="col">
          <div className="section" id="about">
            <h3>About Me</h3>
            <hr />
            <div className="subsection">
              <div>
                <p><b>Languages:</b> HTML, JS, CSS, SQL, Python</p>
                <p><b>Environments:</b> Node.js</p>
                <p><b>Frameworks:</b> Express.js</p>
              </div>
              {/* Next.js Optimized Image Component */}
              <Image 
                src="/images/Profilbilde.jpg" 
                width={200} 
                height={200} 
                alt="Marcus Tangen Profile Picture" 
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Grid Layout */}
      <div className="row" id="submain">
        
        {/* Left Column: Work Experience */}
        <div className="col">
          <div className="section" id="experience">
            <h4>Work Experience</h4>
            <hr />
            {experience.map((exp, index) => (
              <div className="item" key={index}>
                <h5>{exp.title}</h5>
                <p style={{ marginBottom: "0px" }}>
                  {exp.company} <i>{exp.stilling}</i>
                </p>
                <p>{exp.location} ({exp.began}-{exp.ended})</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Contact, Education & Skills */}
        <div className="col">
          
          {/* Contact Details Block */}
          <div className="section" id="contact">
            <ul className="contact-list">
              <li className="flex items-center gap-x-2">
                <bs.BsFillGeoAltFill /> Norway, Fjellhamar
              </li>
              <li className="flex items-center gap-x-2">
                <bs.BsEnvelopeAtFill />
                <a href="mailto:marcustangen@gmail.com"> marcustangen@gmail.com</a>
              </li>
              <li className="flex items-center gap-x-2">
                <bs.BsFileEarmarkPdfFill /> 
                <a href="https://drive.google.com/open?id=1aAojQAcWgQBZAMTgh4IbkJXRVul8cQ4y" target="_blank" rel="noreferrer" download>
                  Download cv
                </a>
              </li>
            </ul>
          </div>

          {/* Education Block */}
          <div className="section" id="education">
            <h4>Education</h4>
            <hr />
            {education.map((edu, index) => (
              <div className="item" key={index}>
                <h5 className="flex items-center gap-x-2">
                  <bs.BsBook /> {edu.title}
                </h5>
                <p>{edu.location} ({edu.began}-{edu.ended})</p>
              </div>
            ))}
          </div>

          {/* Dynamic Skills Grid Block */}
          <div className="section" id="skills">
            <h4>Skills</h4>
            <hr />
            {skills.map((skill, index) => {
              // Bound limits cleanly between a range score of 0-5
              const filledStars = Math.min(Math.max(skill.quality, 0), 5);
              const emptyStars = 5 - filledStars;

              return (
                <div className="item" key={index}>
                  <h5>{skill.skill}</h5>
                  <div className="flex items-center gap-x-1">
                    {/* Render Filled Score Rating Stars */}
                    {Array.from({ length: filledStars }).map((_, i) => (
                      <bs.BsStarFill key={`filled-${i}`} />
                    ))}
                    {/* Render Empty Remainder Stars */}
                    {Array.from({ length: emptyStars }).map((_, i) => (
                      <bs.BsStar key={`empty-${i}`} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}