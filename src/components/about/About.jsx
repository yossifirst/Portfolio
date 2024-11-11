import { useRef } from "react";
import "./about.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const About = () => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="about"
      variants={variants}
      initial="initial"
      ref={ref}
      animate={"animate"}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
          B.S. in Computer Science
          <br /> Minor in Statistics
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/techstack.jpeg" alt="" />
          <h1>
            My <motion.b whileHover={{color:"rgb(148, 82, 148)"}}>Resume</motion.b>
          </h1>
        </div>
        <div className="title">
          <h1>
            My <motion.b whileHover={{color:"rgb(148, 82, 148)"}}>Tech Stack</motion.b>.
          </h1>
          <a
            href="/Technical_Resume_11_09_24.pdf"
            download="Dan_Firstenberg_Resume.pdf"
            className="download-button"
          >
            Download Resume
          </a>
        </div>
      </motion.div>
      <motion.div className="resumeContainer" variants={variants}>
        <iframe
          src="/Technical_Resume_11_09_24.pdf" 
          title="Resume"
          width="100%"
          height="600px"
        ></iframe>
      </motion.div>
    </motion.div>
  );
};

export default About;
