import { motion } from "framer-motion";
import construction from "@/assets/construction.png";
import DefaultButton from "@/components/DefaultButton";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";

const AboutUs = () => {
  const sectionVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "backInOut",
      },
    },
  };

  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center justify-center"
      >
        <BackButton toProfile={false} />
        <img src={construction} alt="under construction" />
      </motion.div>
    </section>
  );
};

export default AboutUs;
