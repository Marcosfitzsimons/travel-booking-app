import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import DefaultButton from "../components/DefaultButton";
import { Lock, User } from "lucide-react";

type User = {
  emailOrUsername: String;
  password: String;
};

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

const Login = () => {
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

  const [err, setErr] = useState<null | string>(null);

  const { loading, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleOnSubmit = async (data: User) => {
    if (dispatch) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "https://fabebus-api-example.onrender.com/api/auth/login",
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

  return (
    <section className="">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center lg:flex-row lg:justify-between"
      >
        <Separator
          orientation="vertical"
          className="h-28 bg-gradient-to-t from-border-color to-[#fafafa] dark:from-blue-lagoon-50 dark:to-[#0E1217] lg:hidden"
        />
        <div className="w-full flex flex-col">
          <h2 className="text-3xl py-1 font-medium text-center lg:text-start lg:text-4xl lg:px-3 dark:text-white">
            Entra a tu cuenta
          </h2>
          <p className="text-center lg:text-start lg:px-3">
            Una vez dentro vas a poder reservar tu lugar.
          </p>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="relative w-full mt-2 p-3 py-6 flex flex-col gap-3 lg:my-4 lg:max-w-[350px]"
          >
            <div className="grid w-full max-w-sm items-center self-center gap-2">
              <Label htmlFor="emailOrUsername">Email o nombre de usuario</Label>
              <div className="relative flex items-center">
                <User className="z-30 h-5 w-5 text-icon-color absolute left-[10px] pb-[1px] dark:text-icon-color-dark" />
                <Input
                  type="text"
                  id="emailOrUsername"
                  placeholder="juanperez22"
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
                <p className="text-red-600">{errors.emailOrUsername.message}</p>
              )}
            </div>
            <div className="grid w-full max-w-sm items-center self-center gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative flex items-center">
                <Lock className="z-30 h-5 w-5 text-icon-color absolute left-[10px] pb-[2px] dark:text-icon-color-dark" />
                <Input
                  type="password"
                  id="password"
                  className="pl-[32px]"
                  placeholder="..."
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
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            {err && <p className="text-red-600 self-start">{err}</p>}

            <div className="w-full self-center max-w-sm lg:max-w-[9rem]">
              <DefaultButton loading={loading}>Entrar</DefaultButton>
            </div>
            <p className="w-full text-center lg:text-start lg:my-4">
              ¿No tenes cuenta?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-lagoon-800 dark:text-blue-lagoon-400"
              >
                Crear una cuenta nueva
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-6 lg:mr-8">
          <Separator
            orientation="vertical"
            className="h-80 bg-gradient-to-t from-border-color to-[#fafafa] dark:from-blue-lagoon-50 dark:to-[#0E1217]"
          />
          <Logo />
          <Separator
            orientation="vertical"
            className="h-80 bg-gradient-to-b from-border-color to-[#fafafa] dark:from-blue-lagoon-50 dark:to-[#0E1217]"
          />
        </div>

        <Separator
          orientation="vertical"
          className="h-28 bg-gradient-to-b from-border-color to-[#fafafa] dark:from-blue-lagoon-50 dark:to-[#0E1217] lg:hidden"
        />
      </motion.div>
    </section>
  );
};

export default Login;
