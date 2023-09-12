import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "../components/ui/separator";
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import axios from "../api/axios";
import Logo from "../components/Logo";
import DefaultButton from "../components/DefaultButton";
import {
  Check,
  Crop,
  Fingerprint,
  Loader2,
  Lock,
  Mail,
  Milestone,
  Phone,
  User,
  X,
} from "lucide-react";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import { UserInputs } from "../types/types";
import sectionVariants from "@/lib/variants/sectionVariants";
import AccountStatus from "@/components/AccountStatus";

const Register = () => {
  const [addressCapitalValue, setAddressCapitalValue] = useState("");
  const [err, setErr] = useState<null | string>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const { toast } = useToast();

  const handleOnSubmit = async (data: UserInputs) => {
    setErr("");
    setLoading(true);
    toast({
      variant: "loading",
      description: (
        <div className="flex gap-1">
          <Loader2 className="h-5 w-5 animate-spin text-purple-900 shrink-0" />
          Creando cuenta...
        </div>
      ),
    });
    try {
      await axios.post(
        `/auth/register`,
        { ...data, addressCapital: addressCapitalValue },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast({
        title: (
          <div className="flex items-center gap-1">
            {<Check className="h-5 w-5 text-green-600" />} Cuenta se ha creado
            con éxito!
          </div>
        ) as any,
        description:
          "Por favor, verifique su email para poder activar su cuenta",
      });
      setIsSuccess(true);
      setLoading(false);
    } catch (err: any) {
      setIsSuccess(false);
      if (err.response?.data?.err?.keyValue?.username) {
        setErr(
          `Nombre de usuario ${err.response?.data?.err.keyValue?.username} ya está en uso`
        );
        setLoading(false);
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-1">
              {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
              crear cuenta
            </div>
          ) as any,
          description: "Nombre de usuario ya está en uso",
        });
      } else if (err.response?.data?.err?.keyValue?.email) {
        setErr(
          `Email ${err.response?.data?.err.keyValue?.email} ya está en uso`
        );
        setLoading(false);
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-1">
              {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
              crear cuenta
            </div>
          ) as any,
          description: "Email ya está en uso",
        });
      } else {
        setErr(err.response?.data?.msg);
        setLoading(false);
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-1">
              {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
              crear cuenta
            </div>
          ) as any,
          description: err.response?.data?.msg
            ? err.response?.data?.msg
            : "Ha ocurrido un error al crear cuenta. Por favor, intentar más tarde",
        });
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
        className={`${
          isSuccess ? "h-screen lg:h-auto" : ""
        } flex flex-col items-center lg:flex-row lg:justify-between`}
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
              <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-3 lg:max-w-5xl">
                <div className="w-full flex flex-col items-center">
                  <h5 className="text-center w-full text-lg font-medium dark:text-white lg:text-start lg:text-xl">
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
                            pattern: {
                              value: /^[a-zA-Z\s]+$/,
                              message:
                                "Nombre y apellido deben contener solo letras.",
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
                              value: /^(?=.*[0-9])[a-zA-Z0-9]{3,}$/,
                              message:
                                "El nombre de usuario debe tener al menos 3 caracteres y contener al menos un número.",
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

              <div className="w-full flex flex-col items-center gap-2">
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
                <div className="w-full max-w-sm mt-4 lg:max-w-[9rem]">
                  <DefaultButton loading={loading}>Crear cuenta</DefaultButton>
                </div>
                <p className="w-full text-center lg:text-start">
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
            <div className="absolute -top-4 flex items-center justify-center w-8 aspect-square rounded-full border-2 bg-[#5b9184] border-white dark:bg-[#4b7c71]">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div className="w-full pt-6 p-5 flex flex-col text-center items-center gap-1 rounded-md bg-[#5b9184] text-white dark:bg-[#4b7c71]">
              <h3 className="font-medium text-lg">Registro exitoso</h3>
              <p className="text-zinc-50 lg:w-10/12">
                Acabamos de enviar un link de activación a tu correo electrónico
              </p>
            </div>

            <div className="text-center flex flex-col items-center w-11/12 mx-auto">
              <Separator className="w-4 self-center my-3" />
              <div className="w-auto flex flex-col items-center gap-4 bg-card rounded-lg py-2 px-4 border shadow-input dark:shadow-none">
                <div className="flex flex-col items-center gap-1 ">
                  <p>Estado de su cuenta</p>
                  <AccountStatus isActive={false}>Pendiente</AccountStatus>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-6 lg:mr-8">
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

export default Register;
