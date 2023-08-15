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

  export default sectionVariants