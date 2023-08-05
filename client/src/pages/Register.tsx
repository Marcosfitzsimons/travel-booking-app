import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "../components/ui/separator";
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import axios from "axios";
import Logo from "../components/Logo";
import DefaultButton from "../components/DefaultButton";
import { AuthContext } from "../context/AuthContext";
import {
  Check,
  Crop,
  Fingerprint,
  Lock,
  Mail,
  Milestone,
  Phone,
  User,
} from "lucide-react";
import AddressAutocomplete from "@/components/AddressAutocomplete";

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
  cpassword: string;
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
  const [addressCapitalValue, setAddressCapitalValue] = useState("");
  const [err, setErr] = useState<null | string>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      password: "",
      cpassword: "",
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

  const handleOnSubmit = async (data: User) => {
    setErr("");

    if (dispatch) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "https://fabebus-api-example.onrender.com/api/auth/register",
          { ...data, addressCapital: addressCapitalValue }
        );
        const token = res.data.token;
        localStorage.setItem("token", token);
        toast({
          title: "¡Registro exitoso!",
          description:
            "Por favor verifique su email para poder activar su cuenta.",
        });
        setIsSuccess(true);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      } catch (err: any) {
        setIsSuccess(false);
        dispatch({
          type: "LOGIN_FAILURE",
          payload: err.response?.data,
        });
        console.log(err);
        if (err.response.data.err?.keyValue.username) {
          setErr(
            `Nombre de usuario ${err.response.data.err.keyValue.username} ya está en uso`
          );
          toast({
            variant: "destructive",
            title: "Error al crear cuenta",
            description: "Nombre de usuario ya está en uso",
          });
        } else if (err.response.data.err?.keyValue.email) {
          setErr(
            `Email ${err.response.data.err.keyValue.email} ya está en uso`
          );
          toast({
            variant: "destructive",
            title: "Error al crear cuenta",
            description: "Email ya está en uso",
          });
        } else {
          setErr(err.response.data.msg);
          toast({
            variant: "destructive",
            title: "Error al crear cuenta",
            description: err.response.data.msg
              ? err.response.data.msg
              : "Error al crear cuenta, intente más tarde.",
          });
        }
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
        {!isSuccess ? (
          <div className="">
            <div className="mt-4">
              <h2 className="text-3xl py-1 font-medium text-center lg:text-start lg:text-4xl dark:text-white">
                Crear cuenta nueva
              </h2>
              <p className="text-center text-card-foreground lg:text-start">
                Una vez que tengas tu cuenta podrás reservar tu lugar
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleOnSubmit)}
              className="relative w-full mt-2 py-6 flex flex-col gap-3 items-center lg:w-[750px]"
            >
              <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-2 lg:max-w-5xl">
                <div className="my-2 w-full flex flex-col items-center lg:mt-0">
                  <h5 className="text-center w-full text-lg font-medium dark:text-white lg:mb-2 lg:text-start lg:text-xl">
                    Datos personales
                  </h5>
                </div>
                <div className="w-full flex flex-col gap-2 lg:flex-row">
                  <div className="w-full flex flex-col gap-2">
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="fullName">Nombre completo</Label>
                      <div className="relative flex items-center">
                        <User className="z-30 h-5 w-5 text-accent absolute left-[10px] pb-[2px] " />
                        <Input
                          type="text"
                          id="fullName"
                          className="pl-[32px]"
                          placeholder="Juan Pérez"
                          {...register("fullName", {
                            required: {
                              value: true,
                              message:
                                "Por favor, ingresa tu nombre y apellido.",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "Nombre y apellido no puede ser tan corto.",
                            },
                            maxLength: {
                              value: 25,
                              message:
                                "Nombre y apellido no puede ser tan largo.",
                            },
                          })}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-600 text-xs sm:text-sm">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div className="grid w-full items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Label htmlFor="username">Nombre de usuario </Label>
                        <span className="text-xs select-none text-accent">
                          * Req. para ingresar
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <span className="z-30 absolute text-accent left-[11px] pb-[2px] select-none ">
                          @
                        </span>
                        <Input
                          type="text"
                          id="username"
                          placeholder="juan00"
                          className="pl-[30px]"
                          {...register("username", {
                            required: {
                              value: true,
                              message:
                                "Por favor, ingresa tu nombre de usuario.",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "Nombre de usuario no puede ser tan corto.",
                            },
                            maxLength: {
                              value: 15,
                              message:
                                "Nombre de usuario no puede ser tan largo.",
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9]*$/,
                              message:
                                "Nombre de usuario no debe tener espacios ni caracteres especiales.",
                            },
                          })}
                        />
                      </div>
                      {errors.username && (
                        <p className="text-red-600 text-xs sm:text-sm">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative flex items-center">
                        <Lock className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                        <Input
                          className="pl-[32px]"
                          placeholder="..."
                          type="password"
                          id="password"
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Por favor, ingresa tu contraseña.",
                            },
                            minLength: {
                              value: 6,
                              message: "Contraseña no puede ser tan corta.",
                            },
                            maxLength: {
                              value: 20,
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
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="cpassword">Confirmar contraseña</Label>
                      <div className="relative flex items-center">
                        <Lock className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                        <Input
                          className="pl-[32px]"
                          placeholder="..."
                          type="password"
                          id="cpassword"
                          {...register("cpassword", {
                            required: {
                              value: true,
                              message: "Por favor, ingresa tu contraseña.",
                            },
                            minLength: {
                              value: 6,
                              message: "Contraseña no puede ser tan corta.",
                            },
                            maxLength: {
                              value: 20,
                              message: "Contraseña no puede ser tan larga.",
                            },
                          })}
                        />
                      </div>
                      {errors.cpassword && (
                        <p className="text-red-600 text-xs sm:text-sm">
                          {errors.cpassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center gap-2">
                    <div className="grid w-full items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Label htmlFor="email">Email </Label>
                        <span className="text-xs select-none text-accent">
                          * Req. para ingresar
                        </span>
                      </div>

                      <div className="relative flex items-center">
                        <Mail className="z-30 top-[11px] h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                        <Input
                          className="pl-[32px]"
                          type="email"
                          placeholder="ejemplo@gmail.com"
                          id="email"
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
                      </div>

                      {errors.email && (
                        <p className="text-red-600 text-xs sm:text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="dni">DNI</Label>
                      <div className="relative flex items-center">
                        <Fingerprint className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                        <Input
                          type="number"
                          id="dni"
                          placeholder="41260122"
                          className="appearance-none pl-[32px]"
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
                      </div>
                      {errors.dni && (
                        <p className="text-red-600 text-xs sm:text-sm">
                          {errors.dni.message}
                        </p>
                      )}
                    </div>
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="phone">Celular</Label>
                      <div className="relative flex items-center">
                        <Phone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                        <Input
                          className="pl-[32px]"
                          placeholder="2273433870"
                          type="tel"
                          id="phone"
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
                              message:
                                "Número celular debe incluir solo números.",
                            },
                          })}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-600 text-xs sm:text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-center gap-3">
                <div className="w-full flex flex-col items-center">
                  <h5 className="text-center w-full text-lg font-medium dark:text-white lg:text-start lg:text-xl">
                    Domicilios
                  </h5>
                </div>

                <div className="w-full flex flex-col gap-2 lg:max-w-5xl">
                  <div className="w-full flex flex-col gap-2 lg:flex-row">
                    <div className="w-full flex flex-col gap-2">
                      <div className="w-full flex flex-col gap-2">
                        <h6 className="font-serif text-accent ">
                          Carmen de Areco
                        </h6>
                      </div>
                      <div className="flex items-center gap-1 max-w-sm">
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="street">Calle</Label>
                          <div className="relative flex items-center">
                            <Milestone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                            <Input
                              type="text"
                              id="street"
                              className="pl-[32px]"
                              placeholder="Matheu"
                              {...register("addressCda.street", {
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
                              })}
                            />
                          </div>
                          {errors.addressCda?.street && (
                            <p className="text-red-600 text-xs sm:text-sm">
                              {errors.addressCda.street.message}
                            </p>
                          )}
                        </div>
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="streetNumber">Número</Label>
                          <div className="relative flex items-center">
                            <Milestone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                            <Input
                              type="number"
                              id="streetNumber"
                              className="pl-[32px]"
                              placeholder="522"
                              {...register("addressCda.streetNumber", {
                                required: {
                                  value: true,
                                  message:
                                    "Por favor, ingresar número de domicilio ",
                                },
                                minLength: {
                                  value: 1,
                                  message:
                                    "Número de domicilio no puede ser tan corto.",
                                },
                                maxLength: {
                                  value: 5,
                                  message:
                                    "Número de domicilio no puede ser tan largo.",
                                },
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message: "Debe incluir solo números.",
                                },
                              })}
                            />
                          </div>
                          {errors.addressCda?.streetNumber && (
                            <p className="text-red-600 text-xs sm:text-sm">
                              {errors.addressCda.streetNumber.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="crossStreets">Calles que cruzan</Label>
                        <div className="relative flex items-center">
                          <Crop className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                          <Input
                            type="text"
                            id="crossStreets"
                            className="pl-[32px]"
                            placeholder="Matheu y D. Romero"
                            {...register("addressCda.crossStreets", {
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
                                value: 45,
                                message: "No puede ser tan largo.",
                              },
                            })}
                          />
                        </div>
                        {errors.addressCda?.crossStreets && (
                          <p className="text-red-600 text-xs sm:text-sm">
                            {errors.addressCda.crossStreets.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-2 ">
                      <h6 className="font-serif text-accent ">
                        Capital Federal
                      </h6>
                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="registerAddressCapital">
                          Dirección
                        </Label>
                        <div className="w-full">
                          <AddressAutocomplete
                            id="registerAddressCapital"
                            value={addressCapitalValue}
                            setValue={setAddressCapitalValue}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {err && <p className="text-red-600 self-start max-w-sm">{err}</p>}

              <div className="w-full flex flex-col items-center gap-3">
                <div className="w-full max-w-sm mt-6 mb-2 lg:max-w-[9rem]">
                  <DefaultButton loading={loading}>Crear cuenta</DefaultButton>
                </div>
                <p className="w-full text-center lg:text-start lg:my-4">
                  ¿Ya tenes cuenta?{" "}
                  <Link to="/login" className="font-medium text-accent">
                    Iniciar sesion
                  </Link>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-2 mt-6">
            <div className="absolute -top-4 flex items-center justify-center w-8 aspect-square rounded-full border-2 bg-[#4E8D7C] border-white">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div className="w-11/12 pt-6 mx-auto flex flex-col text-center items-center gap-1 p-3 rounded-md bg-[#4E8D7C] text-white">
              <h3 className="font-medium text-lg">Registro exitoso!</h3>
              <p className="text-[hsl(224,65%,97%)]">
                Por favor, verifique su correo electrónico para activar su
                cuenta.
              </p>
            </div>

            <div className="text-center flex flex-col items-center gap-3 w-11/12 mx-auto">
              <p>Una vez que active su cuenta, podrá reservar su lugar</p>
              <Separator className="w-4 self-center" />
              <div className="flex flex-col items-center gap-1">
                <p>Estado de su cuenta</p>
                <p className="flex items-center gap-1 px-2 rounded-md bg-card border text-sm">
                  <span className="w-[10px] aspect-square rounded-full bg-orange-600 animate-pulse" />
                  Pendiente
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-6 lg:mr-8">
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

export default Register;
