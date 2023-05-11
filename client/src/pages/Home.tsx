import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import PublicationCard from "../components/PublicationCard";
import { ChevronsDown, MapPin, Newspaper, Pin } from "lucide-react";

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
    <div className="section lg:pt-32">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0"
      >
        <div className="pb-10 pt-20 relative flex flex-col items-center gap-5 text-center  lg:h-auto lg:text-start lg:items-start lg:basis-3/5 lg:py-4">
          <div className="flex flex-col items-center gap-1">
            <span className="h-[1px] w-8 bg-border-color dark:bg-border-color-dark"></span>
            <h1 className="font-serif tracking-wider text-6xl dark:text-white lg:text-7xl">
              <span className="font-medium text-[5rem]">F</span>
              <span className="inline-block rotate-3">a</span>
              <span className="inline-block -rotate-3">b</span>
              <span className="inline-block rotate-1">e</span>
              <span className="font-medium text-[5rem]">B</span>
              <span className="inline-block rotate-6">u</span>
              <span className="inline-block -rotate-3">s</span>
            </h1>
            <p className="relative bottom-2 font-medium dark:text-slate-100 flex items-center">
              <MapPin className="w-4 h-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
              Carmen de Areco
            </p>
          </div>
          <p className="font-medium dark:text-slate-100">
            Una empresa familiar con más de 28 años de trayectoria.
          </p>
          <div className="">
            <Button
              onClick={() => navigate("/viajes")}
              className="mt-1 h-10 border border-blue-lagoon-200 bg-white hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-black dark:hover:border-blue-lagoon-300/80"
            >
              Viajes disponibles
            </Button>
          </div>
        </div>
        <div className="py-4 flex flex-col items-center gap-3 lg:items-start lg:basis-2/5">
          <h2 className="flex items-center gap-2 text-xl uppercase font-bold lg:text-2xl ">
            <Newspaper />
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
