import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Button } from "../components/ui/button";
import PublicationCard from "../components/PublicationCard";
import { ChevronsRight, Frown, Heart, Newspaper } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import PublicationSkeleton from "@/components/skeletons/PublicationSkeleton";
import sectionVariants from "@/lib/variants/sectionVariants";
import { Publication } from "@/types/types";
import GorgeousBoxBorder from "@/components/GorgeousBoxBorder";
import Commissions from "@/components/Commissions";

const Home = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useFetch("/publications");

  return (
    <div className="relative  section lg:pt-28">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0"
      >
        <div className="absolute w-full left-0 top-2">
          <Marquee className="" direction="left" speed={55}>
            <p className="flex items-center gap-2">
              <Heart
                className="w-4 h-4 relative top-[1px] dark:text-black shrink-0"
                fill="red"
              />
              <span>Gracias por elegirnos</span>
              <Heart
                className="w-4 h-4 relative top-[1px] dark:text-black shrink-0"
                fill="red"
              />
              <span className="pr-2">Viajá como la luz, viajá en fabebus</span>
            </p>
          </Marquee>
        </div>
        <div className="pb-10 pt-20 flex flex-col items-center gap-4 text-center lg:h-auto lg:basis-1/2 lg:pb-20 lg:pt-10">
          <div className="flex flex-col items-center gap-1">
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
              <p className="font-serif text-accent flex items-center ">
                Carmen de Areco
              </p>
            </div>
          </div>
          <p className="px-2 text-sm text-card-foreground max-w-lg lg:text-base dark:text-slate-100">
            Una empresa familiar con una sólida trayectoria de más de 28 años,
            siendo tu mejor opción para reservas de viajes en nuestra ciudad y
            sus alrededores
          </p>
          <GorgeousBoxBorder className="mt-3">
            <Button
              onClick={() => navigate("/viajes")}
              className="text-sm h-10 pl-6 gap-[3px] rounded-lg border border-pink-1-700/50 shadow-md shadow-pink-1-900/30 bg-gradient-to-r from-[#9e4a4f] via-[#854147] to-[#9c595d] bg-[length:200%] bg-left transition text-pink-1-100 hover:shadow-lg hover:border-pink-1-300/80 hover:bg-right hover:text-white hover:shadow-pink-1-900/50 dark:hover:shadow-pink-1-900 dark:border-pink-1-300/60 dark:text-pink-1-100 dark:shadow-pink-1-900/60 dark:bg-[#9e4a4f] dark:hover:border-pink-1-300/80 dark:hover:shadow-lg dark:hover:text-white"
            >
              Viajes disponibles
              <ChevronsRight className="w-5 h-5 relative top-[1px]" />
            </Button>
          </GorgeousBoxBorder>
        </div>
        <div className="pb-4 flex flex-col items-center gap-3 lg:items-start lg:basis-[45%]">
          <Commissions />
          <h2 className="flex items-center gap-2 my-2 text-xl uppercase font-medium lg:text-2xl dark:text-white">
            <Newspaper className="w-5 h-5 text-accent shrink-0 lg:w-6 lg:h-6" />
            Anuncios destacados
          </h2>
          {error && (
            <p className="pt-2 text-center flex items-center flex-col gap-1">
              Ha ocurrido un error al intentar cargar anuncios
              <Frown className="w-5 h-5 shrink-0" />
            </p>
          )}
          {loading ? (
            <PublicationSkeleton cards={3} />
          ) : (
            <div className="flex flex-col gap-6">
              {data.length > 0 ? (
                data.map((publication: Publication) => (
                  <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    key={publication._id}
                  >
                    <PublicationCard {...publication} />
                  </motion.div>
                ))
              ) : (
                <p className="text-center lg:text-start">
                  No se encontraron anuncios hasta el momento
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
