import BackButton from "@/components/BackButton";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { CheckCheck, CheckCircle, CheckCircle2, Heart } from "lucide-react";

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

const PaymentSuccess = () => {
  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="mt-8 mb-1 rounded-md border p-4 bg-card shadow-input flex flex-col items-center gap-1 text-center border-[#5FC488] dark:border-[#6cd395] dark:shadow-none">
          <CheckCircle className="text-[#5FC488] w-14 h-14 drop-shadow-sm dark:text-[#6cd395]" />
          <p>Pago realizado con éxito</p>
        </div>
        <Separator className="w-4" />
        <p className="flex items-center gap-1 ">
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
        <BackButton toProfile={false} />
      </motion.div>
    </section>
  );
};

export default PaymentSuccess;
