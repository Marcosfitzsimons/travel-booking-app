import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Logo from "../components/Logo";
import DefaultButton from "../components/DefaultButton";
import { Check, Loader2, Lock, Mail, User, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import sectionVariants from "@/lib/variants/sectionVariants";
import { LoginUserInputs } from "@/types/types";
import useAuth from "@/hooks/useAuth";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [emailForgotten, setEmailForgotten] = useState("");
  const [err, setErr] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth, persist, setPersist } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const navigate = useNavigate();

  const handleOnSubmit = async (data: LoginUserInputs) => {
    setErr("");
    setIsLoading(true);
    try {
      const {
        data: { token, details },
      } = await axios.post(`/auth/login`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setAuth({ user: details, token });
      setIsLoading(false);
      navigate("/viajes");
    } catch (err: any) {
      const errorMsg = err.response?.data?.msg;
      if (!err?.response) {
        setIsLoading(false);
        setErr(
          "Ha ocurrido un error en el servidor. Intentar de nuevo más tarde"
        );
      } else {
        setErr(errorMsg);
        setIsLoading(false);
      }
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
            entrar a su cuenta
          </div>
        ) as any,
        description: errorMsg
          ? errorMsg
          : "Ha ocurrido un error al entrar a su cuenta. Por favor, intentar más tarde",
      });
    }
  };

  const handleSendLink = async () => {
    if (emailForgotten === "") {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-1">
            {<X className="h-5 w-5 text-destructive" />} Error al enviar email
          </div>
        ) as any,
        description: "Por favor, ingresar un email válido",
      });
    } else if (!emailForgotten.includes("@")) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-1">
            {<X className="h-5 w-5 text-destructive" />} Error al enviar email
          </div>
        ) as any,
        description: "Por favor, ingresar un email válido",
      });
      setEmailForgotten("");
    } else {
      setIsLoading(true);
      toast({
        variant: "loading",
        description: (
          <div className="flex gap-1">
            <Loader2 className="h-5 w-5 animate-spin text-purple-900 shrink-0" />
            Enviando email...
          </div>
        ),
      });
      try {
        await axios.post(`/auth/sendpasswordlink`, {
          email: emailForgotten,
        });
        toast({
          title: (
            <div className="flex gap-1">
              {<Check className="h-5 w-5 text-green-600 shrink-0" />} Link se ha
              envíado a tu email con éxito
            </div>
          ) as any,
          description:
            "Tenes 5 minutos para utilizar el link antes de que expire",
        });
        setEmailForgotten("");
        setIsLoading(false);
      } catch (err: any) {
        const errorMsg = err.response?.data?.msg;
        setEmailForgotten("");
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-1">
              {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
              enviar email
            </div>
          ) as any,
          description: errorMsg
            ? errorMsg
            : "Ha ocurrido un error al enviar email. Por favor, intentar más tarde",
        });
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("persist", persist.toString());
  }, [persist]);

  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center lg:flex-row lg:justify-between"
      >
        <div className="w-full flex flex-col my-6">
          <h2 className="text-3xl py-1 font-medium text-center lg:text-start lg:text-4xl dark:text-white">
            Bienvenido de vuelta
          </h2>
          <p className="text-center text-card-foreground lg:text-start">
            Entra a tu cuenta para reservar tu lugar
          </p>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="relative w-full mt-2 py-6 flex flex-col gap-3 lg:my-4 lg:max-w-[350px]"
          >
            <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="emailOrUsername">
                  Email o nombre de usuario
                </Label>
                <div className="relative flex items-center">
                  <User className="z-30 h-5 w-5 text-accent absolute left-[10px] " />
                  <Input
                    type="text"
                    id="emailOrUsername"
                    className="pl-[32px]"
                    {...register("emailOrUsername", {
                      required: {
                        value: true,
                        message:
                          "Por favor, ingresa tu email o nombre de usuario",
                      },
                      minLength: {
                        value: 3,
                        message: "Email o nombre de usuario demasiado corto",
                      },
                      maxLength: {
                        value: 40,
                        message: "Email o nombre de usuario demasiado largo",
                      },
                    })}
                  />
                </div>

                {errors.emailOrUsername && (
                  <p className="text-red-600 text-xs sm:text-sm">
                    {errors.emailOrUsername.message}
                  </p>
                )}
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative flex items-center">
                  <Lock className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px]  " />
                  <Input
                    type="password"
                    id="password"
                    className="pl-[32px]"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Por favor, ingresa tu contraseña",
                      },
                      minLength: {
                        value: 3,
                        message: "Contraseña no puede ser tan corta",
                      },
                      maxLength: {
                        value: 25,
                        message: "Contraseña no puede ser tan larga",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs sm:text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full relative flex items-center space-x-1">
                <Checkbox
                  id="confirmAddress"
                  checked={persist}
                  onCheckedChange={() => setPersist((prev) => !prev)}
                />
                <label
                  htmlFor="confirmAddress"
                  className="text-sm font-medium flex items-center gap-[2px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Permanecer conectado
                </label>
              </div>
              {err && (
                <p className="text-red-600 w-full self-center text-xs max-w-sm sm:text-sm">
                  {err}
                </p>
              )}
              <div className="w-full mt-1 lg:max-w-[9rem] lg:self-center">
                <DefaultButton loading={isLoading}>Entrar</DefaultButton>
              </div>
            </div>

            <p className="w-full text-center lg:text-start">
              ¿No tenes cuenta?{" "}
              <Link to="/register" className="font-medium text-accent">
                Crear una cuenta nueva
              </Link>
            </p>
            <Separator className="w-2 self-center" />
            <AlertDialog>
              <AlertDialogTrigger
                asChild
                className="w-full flex justify-center items-center "
              >
                <Button className="h-auto w-auto mx-auto bg-transparent text-base py-0 px-0 dark:bg-transparent dark:text-accent">
                  Olvidé mi contraseña
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Recuperar contraseña</AlertDialogTitle>
                  <AlertDialogDescription>
                    Te enviaremos un link a tu correo electrónico. Tenes 5
                    minutos para utilizar el link antes de que expire.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid w-full max-w-sm items-center self-center gap-2">
                  <Label htmlFor="emailForgotten">Email</Label>
                  <div className="relative flex items-center">
                    <Mail className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] " />
                    <Input
                      value={emailForgotten}
                      onChange={(e) => setEmailForgotten(e.target.value)}
                      type="email"
                      id="emailForgotten"
                      placeholder="email@example.com"
                      className="pl-[32px]"
                    />
                  </div>
                </div>
                <AlertDialogFooter className="lg:gap-3">
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="lg:w-auto"
                    onClick={handleSendLink}
                    disabled={isLoading}
                  >
                    Recuperar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-6 lg:mr-8 ">
          <Separator
            orientation="vertical"
            className="h-[360px] bg-gradient-to-t from-border to-[#fafafa] dark:from-pink-1-50 dark:to-[#0E1217]"
          />
          <Logo />
          <Separator
            orientation="vertical"
            className="h-[360px] bg-gradient-to-b from-border to-[#fafafa] dark:from-pink-1-50 dark:to-[#0E1217]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
