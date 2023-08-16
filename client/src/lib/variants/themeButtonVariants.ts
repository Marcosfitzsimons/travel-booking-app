const themeButtonVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  export default themeButtonVariants