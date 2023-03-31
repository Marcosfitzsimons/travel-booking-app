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

type User = {
  emailOrUsername: String;
  password: String;
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
          "http://localhost:8800/api/auth/login",
          data
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
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

  const sectionVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: "backInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "backInOut",
      },
    },
  };

  return (
    <section className="">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center lg:flex-row lg:justify-around lg:gap-20"
      >
        <Separator
          orientation="vertical"
          className="h-52 bg-gradient-to-t from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12] lg:hidden"
        />
        <div className="">
          <h2 className="text-3xl py-2 font-medium text-center lg:text-start lg:px-3 dark:text-white">
            Entra a tu cuenta
          </h2>
          <p className="text-center lg:text-start lg:px-3">
            Una vez dentro de tu cuenta vas a poder reservar tu lugar.
          </p>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="relative w-full mt-6 p-3 py-6 flex flex-col gap-5 items-center"
          >
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="emailOrUsername">Email o nombre de usuario</Label>
              <Input
                type="text"
                id="emailOrUsername"
                {...register("emailOrUsername", {
                  required: {
                    value: true,
                    message: "Por favor, ingresa tu email o nombre de usuario.",
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
              {errors.emailOrUsername && (
                <p className="text-red-600">{errors.emailOrUsername.message}</p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
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
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            {err && <p className="text-red-600 self-start">{err}</p>}
            <DefaultButton>Entrar</DefaultButton>
            <p className="lg:self-start">
              ¿No tenes cuenta?{" "}
              <Link to="/register" className="font-medium text-blue-lagoon-500">
                Crear una cuenta nueva
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-6">
          <Separator
            orientation="vertical"
            className="h-80 bg-gradient-to-t from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12]"
          />
          <Logo />
          <Separator
            orientation="vertical"
            className="h-80 bg-gradient-to-b from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12]"
          />
        </div>

        <Separator
          orientation="vertical"
          className="h-52 bg-gradient-to-b from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12] lg:hidden"
        />
      </motion.div>
    </section>
  );
};

export default Login;
