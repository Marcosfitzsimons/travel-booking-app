import { useForm } from "react-hook-form";
import axios from "axios";
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
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import DefaultButton from "../components/DefaultButton";
import { Lock, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import sectionVariants from "@/lib/variants/sectionVariants";
import { LoginUser } from "@/types/types";

const Login = () => {
  const [emailForgotten, setEmailForgotten] = useState("");
  const [err, setErr] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const { loading, dispatch } = useContext(AuthContext);

  const { toast } = useToast();

  const navigate = useNavigate();

  const handleOnSubmit = async (data: LoginUser) => {
    if (dispatch) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_BASE_ENDPOINT}/auth/login`,
          data
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/viajes");
      } catch (err: any) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: err.response?.data,
        });
        const errorMsg = err.response.data.msg;
        setErr(errorMsg);
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
        const res = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_API_BASE_ENDPOINT
          }/auth/sendpasswordlink`,
          { email: emailForgotten }
        );
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

            <div className="w-full self-center max-w-sm lg:max-w-[9rem]">
              <DefaultButton loading={loading}>Entrar</DefaultButton>
            </div>
            <p className="w-full text-center lg:text-start lg:my-4">
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
            className="h-80 bg-gradient-to-t from-border to-[#fafafa] dark:from-pink-1-50 dark:to-[#0E1217]"
          />
          <Logo />
          <Separator
            orientation="vertical"
            className="h-80 bg-gradient-to-b from-border to-[#fafafa] dark:from-pink-1-50 dark:to-[#0E1217]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
