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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Logo from "../components/Logo";
import DefaultButton from "../components/DefaultButton";
import { Lock, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import sectionVariants from "@/lib/variants/sectionVariants";
import { LoginUserInputs } from "@/types/types";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const [emailForgotten, setEmailForgotten] = useState("");
  const [err, setErr] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useAuth();

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
    setIsLoading(true);
    try {
      const {
        data: { token, details },
      } = await axios.post(`/auth/login`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log({ user: details, token });
      setAuth({ user: details, token });
      setIsLoading(false);
      navigate("/viajes");
    } catch (err: any) {
      if (!err?.response) {
        setErr(
          "Ha ocurrido un error en el servidor. Intentar de nuevo más tarde"
        );
      } else {
        const errorMsg = err.response.data.msg;
        setErr(errorMsg);
        setIsLoading(false);
      }
    }
  };

  const handleSendLink = async () => {
    if (emailForgotten === "") {
      toast({
        variant: "destructive",
        description: "Email es requerido",
      });
    } else if (!emailForgotten.includes("@")) {
      toast({
        variant: "destructive",
        description: "Email no válido",
      });
      setEmailForgotten("");
    } else {
      setIsLoading(true);
      try {
        const res = await axios.post(`/auth/sendpasswordlink`, {
          email: emailForgotten,
        });
        console.log(res);
        toast({
          title: "Link enviado a tu email con éxito",
          description:
            "Tenes 5 minutos para utilizar el link antes de que expire.",
        });
        setEmailForgotten("");
        setIsLoading(false);
      } catch (err: any) {
        setEmailForgotten("");
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: err.response.data.msg
            ? err.response.data.msg
            : "Error al enviar email, intentar más tarde.",
        });
      }
    }
  };

  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center lg:flex-row lg:justify-between"
      >
        <div className="w-full flex flex-col my-6 mt-8">
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
            <div className="grid w-full max-w-sm items-center self-center gap-2">
              <Label htmlFor="emailOrUsername">Email o nombre de usuario</Label>
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
                        "Por favor, ingresa tu email o nombre de usuario.",
                    },
                    minLength: {
                      value: 3,
                      message: "Email o nombre de usuario demasiado corto.",
                    },
                    maxLength: {
                      value: 40,
                      message: "Email o nombre de usuario demasiado largo.",
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
            <div className="grid w-full max-w-sm items-center self-center gap-2">
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
                      message: "Contraseña no puede ser tan corta.",
                    },
                    maxLength: {
                      value: 25,
                      message: "Contraseña no puede ser tan larga.",
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
            {err && (
              <p className="text-red-600 w-full self-center max-w-sm">{err}</p>
            )}

            <div className="w-full self-center mt-1 max-w-sm lg:max-w-[9rem]">
              <DefaultButton loading={isLoading}>Entrar</DefaultButton>
            </div>
            <p className="w-full text-center lg:text-start">
              ¿No tenes cuenta?{" "}
              <Link to="/register" className="font-medium text-accent">
                Crear una cuenta nueva
              </Link>
            </p>
            <Separator className="w-4 self-center" />
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
