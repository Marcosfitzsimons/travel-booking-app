import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../hooks/ui/use-toast";
import { Separator } from "../components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import axios from "axios";
import Logo from "../components/Logo";
import DefaultButton from "../components/DefaultButton";
import { AuthContext } from "../context/AuthContext";
import { AtSign } from "lucide-react";

type User = {
  username: string;
  fullName: string;
  email: string;
  phone: number | null;
  image?: string;
  addressCda: string;
  addressCapital: string;
  dni: number | null;
  password: string;
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

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      password: "",
      email: "",
      phone: null,
      addressCda: "",
      addressCapital: "",
      dni: null,
    },
  });

  const { loading, dispatch } = useContext(AuthContext);
  const [err, setErr] = useState<null | string>(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOnSubmit = async (data: User) => {
    if (dispatch) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "https://fabebus-api-example.onrender.com/api/auth/register",
          data
        );
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        toast({
          description: "Registro exitoso. Ahora podes reservar tu lugar.",
        });
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
          className="h-20 bg-gradient-to-t from-border-color to-[#fafafa] dark:from-blue-lagoon-50 dark:to-[#0E1217] lg:hidden"
        />
        <div className="">
          <h2 className="text-3xl py-1 font-medium text-center lg:text-start lg:text-4xl dark:text-white">
            Crear cuenta nueva
          </h2>
          <p className="text-center lg:text-start">
            Una vez que tengas tu cuenta podrás reservar tu lugar.
          </p>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="relative w-full mt-2 py-6 flex flex-col gap-3 items-center lg:w-[650px]"
          >
            <div className="w-full flex flex-col items-center gap-3 lg:flex-row ">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="fullname">Nombre completo</Label>
                <Input
                  type="text"
                  id="fullname"
                  placeholder="ej. Juan Pérez"
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Por favor, ingresa tu nombre y apellido.",
                    },
                    minLength: {
                      value: 3,
                      message: "Nombre y apellido no puede ser tan corto.",
                    },
                    maxLength: {
                      value: 25,
                      message: "Nombre y apellido no puede ser tan largo.",
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-600">{errors.fullName.message}</p>
                )}
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    id="username"
                    placeholder="ej. juanperez98"
                    className="pl-7"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Por favor, ingresa tu nombre de usuario.",
                      },
                      minLength: {
                        value: 3,
                        message: "Nombre de usuario no puede ser tan corto.",
                      },
                      maxLength: {
                        value: 15,
                        message: "Nombre de usuario no puede ser tan largo.",
                      },
                    })}
                  />
                  <span className="absolute left-3 pb-[2px] select-none">
                    @
                  </span>
                </div>
                {errors.username && (
                  <p className="text-red-600">{errors.username.message}</p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-3 lg:flex-row">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Tu contraseña"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Por favor, ingresa tu contraseña.",
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
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="ej. juanperez@ejemplo.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Por favor, ingresa tu email.",
                    },
                    minLength: {
                      value: 3,
                      message: "Email no puede ser tan corto.",
                    },
                    maxLength: {
                      value: 40,
                      message: "Email no puede ser tan largo.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-3 lg:flex-row">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="celular">Celular</Label>
                <Input
                  type="tel"
                  id="celular"
                  placeholder="Tu número celular"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Por favor, ingresa tu número celular.",
                    },
                    minLength: {
                      value: 3,
                      message: "Número celular no puede ser tan corto.",
                    },
                    maxLength: {
                      value: 25,
                      message: "Número celular no puede ser tan largo.",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Número celular debe incluir solo números.",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-600">{errors.phone.message}</p>
                )}
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="dni">DNI</Label>
                <Input
                  type="number"
                  id="dni"
                  className="appearance-none"
                  placeholder="Tu DNI"
                  {...register("dni", {
                    required: {
                      value: true,
                      message: "Por favor, ingresa tu DNI.",
                    },
                    minLength: {
                      value: 3,
                      message: "DNI no puede ser tan corto.",
                    },
                    maxLength: {
                      value: 25,
                      message: "DNI no puede ser tan largo.",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "DNI debe incluir solo números.",
                    },
                  })}
                />
                {errors.dni && (
                  <p className="text-red-600">{errors.dni.message}</p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-3 lg:flex-row">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="addresscda">
                  Dirección (Carmen){" "}
                  <span className="text-blue-lagoon-800 font-light dark:text-blue-lagoon-400">
                    O donde subis
                  </span>
                </Label>
                <Input
                  id="addresscda"
                  placeholder="ej. Rivadavia 293"
                  {...register("addressCda", {
                    required: {
                      value: true,
                      message: "Por favor, ingresar dirección.",
                    },
                    minLength: {
                      value: 3,
                      message: "Dirección no puede ser tan corta.",
                    },
                    maxLength: {
                      value: 25,
                      message: "Dirección no puede ser tan larga.",
                    },
                  })}
                />
                {errors.addressCda && (
                  <p className="text-red-600">{errors.addressCda.message}</p>
                )}
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="addresscapital">
                  Dirección (Capital){" "}
                  <span className="text-blue-lagoon-800 font-light dark:text-blue-lagoon-400">
                    O donde bajas
                  </span>
                </Label>
                <Input
                  id="addresscapital"
                  placeholder="ej. Callao 2304"
                  {...register("addressCapital", {
                    required: {
                      value: true,
                      message: "Por favor, ingresar dirección.",
                    },
                    minLength: {
                      value: 3,
                      message: "Dirección no puede ser tan corta.",
                    },
                    maxLength: {
                      value: 25,
                      message: "Dirección no puede ser tan larga.",
                    },
                  })}
                />
                {errors.addressCapital && (
                  <p className="text-red-600">
                    {errors.addressCapital.message}
                  </p>
                )}
              </div>
            </div>
            {err && <p className="text-red-600 self-start">{err}</p>}

            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-full max-w-sm lg:mt-2 lg:max-w-[9rem]">
                <DefaultButton loading={loading}>Crear cuenta</DefaultButton>
              </div>
              <p className="w-full text-center lg:text-start lg:my-4">
                ¿Ya tenes cuenta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-lagoon-800 dark:text-blue-lagoon-400"
                >
                  Iniciar sesion
                </Link>
              </p>
            </div>
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
          className="h-20 bg-gradient-to-b from-border-color to-[#fafafa] dark:from-blue-lagoon-50 dark:to-[#0E1217] lg:hidden"
        />
      </motion.div>
    </section>
  );
};

export default Register;
