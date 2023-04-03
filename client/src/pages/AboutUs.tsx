import { motion } from "framer-motion";

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
        className=""
      >
        AboutUs
      </motion.div>
    </section>
  );
};

export default AboutUs;
