import BackButton from "@/components/BackButton";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";

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

const PaymentFailure = ({ setIsUserInfo }: PaymentProps) => {
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
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="rounded-md border p-4 bg-card shadow-input flex flex-col items-center gap-1 text-center border-destructive dark:shadow-none">
          <XCircle className="text-destructive w-14 h-14 drop-shadow-sm" />
          <p>
            Lo siento, pero ha ocurrido un fallo en el procesamiento del pago.
          </p>
        </div>
        <BackButton toProfile={false} />
      </motion.div>
    </section>
  );
};

export default PaymentFailure;
