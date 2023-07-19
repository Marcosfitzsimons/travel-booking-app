import { motion } from "framer-motion";
import construction from "@/assets/construction.png";
import BackButton from "@/components/BackButton";

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

const AboutUs = () => {
  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center justify-center my-4 gap-4"
      >
        <p>Nothing to see here...</p>
        <BackButton toProfile={false} />
      </motion.div>
    </section>
  );
};

export default AboutUs;
