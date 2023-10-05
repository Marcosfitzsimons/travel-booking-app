import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Check, Heart, BadgeHelp, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sectionVariants from "@/lib/variants/sectionVariants";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import GorgeousBoxBorder from "@/components/GorgeousBoxBorder";
import useAuth from "@/hooks/useAuth";
import { XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Whatsapp from "@/components/Whatsapp";

const PaymentSuccess = () => {
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const locationn = useLocation();
  const path = locationn.pathname;
  const parts = path.split("/");

  const userId = parts[2];
  const tripId = parts[3];

  const { setAuth } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      return;
    }
    const handleConfirmPassenger = async () => {
      setError(false);
      setLoading1(true);
      toast({
        variant: "loading",
        description: (
          <div className="flex gap-1">
            <Loader2 className="h-5 w-5 animate-spin text-purple-900 shrink-0" />
            Guardando lugar...
          </div>
        ),
      });
      try {
        await axiosPrivate.post(`/passengers/${userId}/${tripId}`, {
          userId: userId,
          isPaid: true,
        });
        toast({
          title: (
            <div className="flex gap-1">
              {<Check className="h-5 w-5 text-green-600 shrink-0" />} Lugar
              guardado con éxito
            </div>
          ) as any,
          description: (
            <p className="">
              Desde fabebus le deseamos que tenga un muy buen viaje ❤️
            </p>
          ),
        });
        setLoading1(false);
      } catch (err: any) {
        if (err.response?.status === 403) {
          setAuth({ user: null });
          setTimeout(() => {
            navigate("/login");
          }, 100);
        }
        setError(true);
        setLoading1(false);
        toast({
          variant: "destructive",
          title: (
            <div className="flex gap-1">
              {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
              guardar su lugar
            </div>
          ) as any,
          action: (
            <ToastAction altText="Mis viajes" asChild>
              <Link to="/mis-viajes">Mis viajes</Link>
            </ToastAction>
          ),
          description: err.response?.data?.msg
            ? err.response?.data?.msg
            : "Ha ocurrido un error al guardar su lugar. Por favor, intentar más tarde",
        });
      }
    };
    handleConfirmPassenger();
  }, [isLoaded]);

  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mt-4 flex flex-col items-center gap-1"
      >
        {error ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <XCircle className="text-red-600 w-14 h-14 drop-shadow-sm dark:text-red-800" />
              <p>Lo siento, pero ha ocurrido un error al guardar su lugar</p>
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
        ) : (
          <>
            {loading1 ? (
              <p>...</p>
            ) : (
              <div className="flex w-full flex-col items-center gap-4">
                <div className="flex flex-col items-center">
                  <Check className="text-[#3d8f78] w-14 h-14 drop-shadow-sm dark:text-[rgba(75,270,200,1)]" />
                  <p>Pago se ha realizado con éxito</p>
                </div>
                <Separator className="w-2" />

                <p className="flex items-center gap-1">
                  <Heart
                    className="w-4 h-4 relative top-[1px] dark:text-black"
                    fill="red"
                  />
                  Gracias por viajar con nosotros
                  <Heart
                    className="w-4 h-4 relative top-[1px] dark:text-black"
                    fill="red"
                  />
                </p>
                <Separator className="w-2" />

                <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                  <Link
                    to="/mis-viajes"
                    className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white "
                  >
                    Ir a mis viajes
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
};

export default PaymentSuccess;
