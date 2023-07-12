import BackButton from "@/components/BackButton";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

type PaymentProps = {
  setIsUserInfo: (value: boolean) => void;
};

const PaymentSuccess = ({ setIsUserInfo }: PaymentProps) => {
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const locationn = useLocation();
  const path = locationn.pathname;
  const parts = path.split("/");

  const userId = parts[2];
  const tripId = parts[3];

  const { toast } = useToast();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      return;
    }
    const handleConfirmPassenger = async () => {
      setLoading(true);
      try {
        await axios.post(
          `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
          {
            userId: userId,
          },
          { headers }
        );
        toast({
          description: (
            <div className="flex items-center gap-1">
              {<CheckCircle className="w-[15px] h-[15px]" />} Lugar guardado con
              éxito.
            </div>
          ),
        });
      } catch (err: any) {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Error al guardar su lugar",
          action: (
            <ToastAction altText="Mis viajes" asChild>
              <Link to="/mi-perfil" onClick={() => setIsUserInfo(false)}>
                Mis viajes
              </Link>
            </ToastAction>
          ),
          description: err.response.data.msg
            ? err.response.data.msg
            : "Error al guardar lugar, intente más tarde.",
        });
      }
      setLoading(false);
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
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="self-start">
          <BackButton toProfile={false} />
        </div>

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
        <div className="rounded-md border p-4 bg-card shadow-input flex flex-col items-center gap-1 text-center border-[#5FC488] dark:border-[#6cd395] dark:shadow-none">
          <CheckCircle className="text-[#5FC488] w-14 h-14 drop-shadow-sm dark:text-[#6cd395]" />
          <p>Pago realizado con éxito</p>
        </div>
        <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-100/20 dark:after:shadow-highlight dark:after:shadow-slate-100/30 after:transition focus-within:after:shadow-slate-100 dark:focus-within:after:shadow-slate-100 ">
          <Link
            to="/mi-perfil"
            onClick={() => setIsUserInfo(false)}
            className="relative py-0.5 px-4 inline-flex items-center justify-center bg-primary text-slate-100 rounded-lg hover:text-white dark:text-slate-100 dark:bg-primary dark:hover:text-white "
          >
            Ir a mis viajes
          </Link>
        </div>
        <Separator className="w-4" />
        {loading ? (
          <Loading />
        ) : (
          <p>
            Hola usuario: {userId}, soy Marcos Valentín Fitzsimons y te comunico
            que acabas de reservar con éxito un lugar en el viaje {tripId}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default PaymentSuccess;
