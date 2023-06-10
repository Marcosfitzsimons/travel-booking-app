import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
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
import { MapPin } from "lucide-react";

type addressCda = {
  street: string;
  streetNumber: number | null;
  crossStreets: string;
};

type User = {
  username: string;
  fullName: string;
  email: string;
  phone: number | null;
  dni: number | null;
  image?: string;
  addressCda: addressCda;
  addressCapital: string;
  password: string;
};

interface InputValidation {
  required: {
    value: boolean;
    message: string;
  };
  minLength: {
    value: number;
    message: string;
  };
  maxLength: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}

interface UserInput {
  id: any;
  label: string;
  type: string;
  placeholder?: string;
  validation?: InputValidation;
  icon?: any;
}

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
  const [addressCapitalValue, setAddressCapitalValue] = useState("");
  const [err, setErr] = useState<null | string>(null);

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
      dni: null,
      addressCda: {
        street: "",
        streetNumber: null,
        crossStreets: "",
      },
      addressCapital: "",
    },
  });

  const { loading, dispatch } = useContext(AuthContext);

  const { toast } = useToast();
  const navigate = useNavigate();
  const addressCapitalRef = useRef(null);

  const handleOnSubmit = async (data: User) => {
    console.log(data);
    if (dispatch) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "https://fabebus-api-example.onrender.com/api/auth/register",
          { ...data, addressCapital: addressCapitalValue }
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

  const userAddressInputs = [
    {
      id: "street",
      label: "Calle",
      type: "text",
      placeholder: "Matheu",
      validation: {
        required: {
          value: true,
          message: "Por favor, ingresar domicilio.",
        },
        minLength: {
          value: 3,
          message: "Domicilio no puede ser tan corto.",
        },
        maxLength: {
          value: 25,
          message: "Domicilio no puede ser tan largo.",
        },
      },
    },
    {
      id: "streetNumber",
      label: "Número",
      type: "text",
      placeholder: "354",
      validation: {
        required: {
          value: true,
          message: "Por favor, ingresar número de domicilio ",
        },
        minLength: {
          value: 1,
          message: "Número de domicilio no puede ser tan corto.",
        },
        maxLength: {
          value: 5,
          message: "Número de domicilio no puede ser tan largo.",
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "Debe incluir solo números.",
        },
      },
    },
    {
      id: "crossStreets",
      label: "Calles que cruzan",
      type: "text",
      placeholder: "Matheu y D. Romero",
      validation: {
        required: {
          value: true,
          message:
            "Por favor, ingresar las calles que cruzan cerca de ese domicilio.",
        },
        minLength: {
          value: 3,
          message: "No puede ser tan corto.",
        },
        maxLength: {
          value: 40,
          message: "No puede ser tan largo.",
        },
      },
    },
  ];

  useEffect(() => {
    const addressCapital = new window.google.maps.places.Autocomplete(
      addressCapitalRef.current!,
      {
        componentRestrictions: { country: "AR" },
        types: ["address"],
        fields: ["address_components"],
      }
    );

    addressCapital.addListener("place_changed", () => {
      const place = addressCapital.getPlace();
      console.log(place);
    });
  }, []);

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
          <div className="lg:mb-8">
            <h2 className="text-3xl py-1 font-medium text-center lg:text-start lg:text-4xl dark:text-white">
              Crear cuenta nueva
            </h2>
            <p className="text-center lg:text-start">
              Una vez que tengas tu cuenta podrás reservar tu lugar.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="relative w-full mt-2 py-6 flex flex-col gap-3 items-center lg:w-[650px]"
          >
            <p className="text-lg mb-2 lg:text-xl lg:mb-0 lg:col-start-1 lg:col-end-3 lg:self-start dark:text-white">
              Tu información
            </p>
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

            <Separator className="w-8 my-2 bg-border-color lg:hidden dark:bg-border-color-dark" />
            <p className="flex items-center gap-1 text-lg mb-2 lg:text-xl lg:mb-0 lg:col-start-1 lg:col-end-3 lg:self-start dark:text-white">
              Domicilios
            </p>

            <div className="w-full flex flex-col items-center gap-2 md:flex-row md:items-start md:col-start-1 md:col-end-3">
              <div className="w-full flex flex-col gap-2">
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                  Carmen de Areco
                </p>
                {userAddressInputs.map((input: UserInput) => {
                  const key = input.id;
                  const fieldName: any = `addressCda.${key}`;
                  return (
                    <div
                      key={input.id}
                      className="grid w-full items-center gap-2"
                    >
                      <Label htmlFor={input.id}>{input.label}</Label>
                      <Input
                        type={input.type}
                        id={input.id}
                        placeholder={input.placeholder}
                        {...register(fieldName, input.validation)}
                      />
                      {errors[input.id as keyof typeof errors] && (
                        <p className="text-red-600">
                          {errors[input.id as keyof typeof errors]?.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <Separator className="w-8 my-2 bg-border-color md:hidden dark:bg-border-color-dark" />

              <div className="w-full flex flex-col gap-2">
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                  Capital Federal
                </p>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="addressCapital">Dirección</Label>
                  <Input
                    ref={addressCapitalRef}
                    type="text"
                    id="addressCapital"
                    value={addressCapitalValue}
                    onChange={(e) => setAddressCapitalValue(e.target.value)}
                    placeholder="Las Heras 2304"
                  />
                </div>
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
