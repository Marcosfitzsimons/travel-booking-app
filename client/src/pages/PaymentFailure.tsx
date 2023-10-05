import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import sectionVariants from "@/lib/variants/sectionVariants";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import GorgeousBoxBorder from "@/components/GorgeousBoxBorder";
import { BadgeHelp } from "lucide-react";
import Whatsapp from "@/components/Whatsapp";

const PaymentFailure = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      return;
    }
    toast({
      variant: "destructive",
      title: "Error al guardar su lugar",
      description:
        "Lo siento, ha ocurrido un fallo en el procesamiento del pago.",
    });
  }, [isLoaded]);

  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <XCircle className="text-red-600 w-14 h-14 drop-shadow-sm dark:text-red-800" />
            <p>
              Lo siento, pero ha ocurrido un fallo en el procesamiento del pago
            </p>
          </div>
          <Separator className="w-2" />
          <GorgeousBoxBorder className="w-full max-w-lg mx-auto lg:mx-0 ">
            <article className="flex items-center gap-3 rounded-lg py-3 px-4 border border-l-4 border-l-blue-700 bg-card shadow-input lg:py-6 dark:shadow-none">
              <BadgeHelp className="w-5 h-5 shrink-0 text-accent lg:w-6 lg:h-6" />
              <div className="flex flex-col">
                <h4 className="text-base font-medium lg:text-lg">
                  ¿Necesitas ayuda?
                </h4>
                <p className="flex-wrap flex items-center gap-1">
                  <span className="text-sm lg:text-base">
                    No dudes en contáctarnos
                  </span>
                  <Whatsapp />
                </p>
              </div>
            </article>
          </GorgeousBoxBorder>
          <Separator className="w-2" />
          <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
            <Link
              to="/viajes"
              className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white "
            >
              Viajes disponibles
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PaymentFailure;
