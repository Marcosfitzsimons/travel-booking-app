import BackButton from "@/components/BackButton";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import sectionVariants from "@/lib/variants/sectionVariants";
import ContactBox from "@/components/ContactBox";
import { Separator } from "@/components/ui/separator";

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
      <BackButton linkTo="/viajes" />
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="pt-4 flex flex-col items-center gap-1 text-center border-destructive dark:shadow-none">
          <XCircle className="text-red-600 w-14 h-14 drop-shadow-sm dark:text-red-800" />
          <p>
            Lo siento, pero ha ocurrido un fallo en el procesamiento del pago
          </p>
          <Separator className="w-4 my-2" />
          <ContactBox>¿Necesitas ayuda?</ContactBox>
        </div>
      </motion.div>
    </section>
  );
};

export default PaymentFailure;
