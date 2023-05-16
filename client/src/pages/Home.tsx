import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import PublicationCard from "../components/PublicationCard";
import { ChevronsRight, Newspaper } from "lucide-react";
import pin from "../assets/pin.png";
import { RoughNotation } from "react-rough-notation";

const Home = () => {
  const navigate = useNavigate();

  const sectionVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      y: 0,
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
    <div className="section lg:pt-28">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0"
      >
        <div className="pb-10 pt-20 relative flex flex-col items-center gap-5 text-center lg:h-auto lg:basis-1/2 lg:py-20">
          <div className="flex flex-col items-center gap-1">
            <span className="h-[1px] w-8 bg-border-color dark:bg-border-color-dark" />
            <h1 className="font-serif tracking-wider text-6xl dark:text-white lg:text-7xl">
              <span className="font-medium text-[5rem]">F</span>
              <span className="inline-block rotate-3">a</span>
              <span className="inline-block -rotate-3">b</span>
              <span className="inline-block rotate-1">e</span>
              <span className="font-medium text-[5rem]">B</span>
              <span className="inline-block rotate-6">u</span>
              <span className="inline-block -rotate-3">s</span>
            </h1>
            <div className="flex items-center relative bottom-2">
              <p className="font-serif dark:text-white flex items-center">
                Carmen de Areco
              </p>
            </div>
          </div>
          <p className="font-medium dark:text-slate-100">
            Una empresa familiar con más de 28 años de trayectoria.
          </p>
          <div className="">
            <Button
              onClick={() => navigate("/viajes")}
              className="mainbutton mt-1 h-10 pl-6 gap-[3px] border border-blue-lagoon-700/50 shadow-md shadow-blue-lagoon-900/30 bg-gradient-to-r from-[#9e4a4f] via-[#854147] to-[#9c595d] bg-[length:200%] bg-left transition text-blue-lagoon-100 hover:shadow-lg hover:border-blue-lagoon-300/80 hover:bg-right hover:text-white hover:shadow-blue-lagoon-900/50 dark:hover:shadow-blue-lagoon-900 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:shadow-blue-lagoon-900/60 dark:bg-[#9e4a4f] dark:hover:border-blue-lagoon-300/80 dark:hover:shadow-lg dark:hover:text-white"
            >
              Ver Viajes
              <ChevronsRight className="w-5 h-5 relative top-[1px]" />
            </Button>
          </div>
        </div>
        <div className="py-4 flex flex-col items-center gap-3 lg:items-start lg:basis-2/5">
          <h2 className="flex items-center gap-2 text-xl uppercase font-bold lg:text-2xl dark:text-white">
            <Newspaper className="w-6 h-6 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
            Ultimas novedades
          </h2>
          <div className="flex flex-col gap-2">
            <PublicationCard />
            <PublicationCard />
            <PublicationCard />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
