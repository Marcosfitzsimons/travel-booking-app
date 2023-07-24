import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Crop,
  Fingerprint,
  Mail,
  Milestone,
  Phone,
  Upload,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/SectionTitle";
import { toast } from "../hooks/ui/use-toast";
import axios from "axios";
import DefaultButton from "../components/DefaultButton";
import BackButton from "../components/BackButton";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { Separator } from "../components/ui/separator";

type addressCda = {
  street: string | undefined;
  streetNumber: number | undefined | null;
  crossStreets: string | undefined;
};

type UserData = {
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  phone: number | undefined;
  dni: number | undefined;
  image?: string | undefined;
  addressCda: addressCda | undefined;
  addressCapital: string | undefined;
  password?: string | undefined;
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

const EditProfile = () => {
  const [image, setImage] = useState<File | string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<null | string>(null);

  const { user } = useContext(AuthContext);

  const [addressCapitalValue, setAddressCapitalValue] = useState(
    "" || user?.addressCapital
  );

  const addressCapitalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username,
      fullName: user?.fullName,
      email: user?.email,
      phone: user?.phone,
      dni: user?.dni,
      addressCda: {
        street: user?.addressCda.street,
        streetNumber: user?.addressCda.streetNumber,
        crossStreets: user?.addressCda.crossStreets,
      },
      addressCapital: user?.addressCapital,
      image: user?.image,
    },
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleOnSubmit = async (data: UserData) => {
    localStorage.removeItem("user");
    setIsLoading(true);

    const imgData = new FormData();
    imgData.append("file", image);
    imgData.append("upload_preset", "upload");

    try {
      if (!image) {
        const res = await axios.put(
          `https://fabebus-api-example.onrender.com/api/users/${user?._id}`,
          { userData: { ...data, addressCapital: addressCapitalValue } },
          { headers }
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoading(false);
        toast({
          description: "Cambios guardados con exito.",
        });
        setTimeout(() => {
          navigate("/mi-perfil");
        }, 1000);
      } else {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dioqjddko/image/upload",
          imgData
        );
        const { url } = uploadRes.data;

        const res = await axios.put(
          `https://fabebus-api-example.onrender.com/api/users/${user?._id}`,
          {
            userData: {
              ...data,
              image: url,
              addressCapital: addressCapitalValue,
            },
          },
          { headers }
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoading(false);
        toast({
          description: "Cambios guardados con éxito.",
        });
        setTimeout(() => {
          navigate("/mi-perfil");
        }, 1000);
      }
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setIsLoading(false);
      setErr(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al guardar los cambios, intentar mas tarde.",
      });
    }
  };

  const userAddressInputs = [
    {
      id: "street",
      icon: (
        <Milestone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
      ),
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
      icon: (
        <Milestone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
      ),
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
      icon: (
        <Crop className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
      ),
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
    <section className="flex flex-col">
      <div className="self-start mt-4">
        <BackButton toProfile={true} />
      </div>
      <SectionTitle>Editar perfil</SectionTitle>
      {isLoading ? (
        <Loading />
      ) : (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className=""
        >
          <div className="w-full mt-5 mb-16 flex flex-col items-center gap-5">
            <div className="w-full flex flex-col items-center gap-5 md:w-11/12">
              <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="w-full flex flex-col items-center gap-3 lg:flex-row lg:gap-10 lg:items-start"
              >
                <div className="relative flex flex-col items-center mb-2 lg:px-6">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : user?.image
                      }
                      alt="avatar"
                    />
                    <AvatarFallback>
                      <User className="w-12 h-12 dark:text-blue-lagoon-100" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -bottom-1">
                    <Label
                      htmlFor="image"
                      className="flex items-center gap-1 cursor-pointer h-7 px-3 py-2 rounded-lg shadow-sm shadow-blue-lagoon-900/30 border border-border-color bg-white dark:border-border-color-dark dark:text-blue-lagoon-100 dark:bg-black dark:hover:border-zinc-300"
                    >
                      <Upload className="w-4 h-4 text-accent " />
                      Subir{" "}
                    </Label>
                    <Input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="hidden"
                      {...register("image", {
                        onChange: (e) => {
                          const file = e.target.files[0];
                          if (file instanceof File) {
                            setImage(file);
                          } else {
                            console.error("Invalid file type");
                          }
                        },
                      })}
                    />
                    {errors.image && (
                      <p className="text-red-600">{errors.image.message}</p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col items-center gap-5 lg:max-w-2xl">
                  <div className="w-full flex flex-col items-center">
                    <div className="my-2 w-full flex flex-col items-center lg:mt-0">
                      <Separator className="w-8 my-2 bg-border-color lg:hidden dark:bg-border-color-dark" />
                      <h5 className="text-center w-full font-medium dark:text-white lg:mb-2 lg:text-start lg:text-xl">
                        Datos personales
                      </h5>
                    </div>

                    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-2 mt-2 lg:max-w-5xl lg:flex-row lg:items-start">
                      <div className="flex w-full flex-col items-center gap-3">
                        <div className="grid w-full items-center gap-2 mt-4 lg:mt-0">
                          <Label htmlFor="username">Nombre de usuario</Label>
                          <div className="relative flex items-center">
                            <span className="z-30 absolute text-accent left-[11px] pb-[2px] select-none ">
                              @
                            </span>
                            <Input
                              type="text"
                              id="username"
                              placeholder="ej. juanperez98"
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
                              })}
                            />
                          </div>
                          {errors.username && (
                            <p className="text-red-600">
                              {errors.username.message}
                            </p>
                          )}
                        </div>
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="fullName">Nombre completo</Label>
                          <div className="relative flex items-center">
                            <User className="z-30 h-5 w-5 text-accent absolute left-[10px] pb-[2px] " />
                            <Input
                              type="text"
                              id="fullName"
                              className="pl-[32px]"
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
                            <p className="text-red-600">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative flex items-center">
                            <Mail className="z-30 top-[11px] h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                            <Input
                              className="pl-[32px]"
                              type="email"
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
                            <p className="text-red-600">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex w-full flex-col items-center gap-3">
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="tel">Celular</Label>
                          <div className="relative flex items-center">
                            <Phone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                            <Input
                              className="pl-[32px]"
                              type="tel"
                              id="phone"
                              {...register("phone", {
                                required: {
                                  value: true,
                                  message:
                                    "Por favor, ingresa tu número celular.",
                                },
                                minLength: {
                                  value: 3,
                                  message:
                                    "Número celular no puede ser tan corto.",
                                },
                                maxLength: {
                                  value: 25,
                                  message:
                                    "Número celular no puede ser tan largo.",
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
                            <p className="text-red-600">
                              {errors.phone.message}
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
                            <p className="text-red-600">{errors.dni.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col items-center">
                      <Separator className="w-8 my-2 bg-border-color lg:hidden dark:bg-border-color-dark" />
                      <h5 className="text-center w-full font-medium dark:text-white lg:mb-2 lg:text-start lg:text-xl">
                        Domicilios
                      </h5>
                    </div>

                    <div className="w-full max-w-sm flex flex-col items-center gap-2 lg:max-w-5xl lg:flex-row lg:items-start">
                      <div className="w-full flex flex-col gap-2">
                        <h6 className="font-serif text-accent ">
                          Carmen de Areco
                        </h6>
                        {userAddressInputs.map((input: UserInput) => {
                          const key = input.id;
                          const fieldName: any = `addressCda.${key}`;
                          return (
                            <div
                              key={input.id}
                              className="grid w-full items-center gap-2"
                            >
                              <Label htmlFor={input.id}>{input.label}</Label>
                              <div className="relative flex items-center">
                                {input.icon}
                                <Input
                                  type={input.type}
                                  id={input.id}
                                  placeholder={input.placeholder}
                                  className="pl-[32px]"
                                  {...register(fieldName, input.validation)}
                                />
                                {errors[input.id as keyof typeof errors] && (
                                  <p className="text-red-600">
                                    {
                                      errors[input.id as keyof typeof errors]
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <Separator className="w-8 my-2 bg-border-color md:hidden dark:bg-border-color-dark" />

                      <div className="w-full flex flex-col gap-2">
                        <h6 className="font-serif text-accent ">
                          Capital Federal
                        </h6>
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="addressCapital">Dirección</Label>
                          <div className="relative flex items-center">
                            <Milestone className="z-30 h-5 w-5 text-accent absolute left-[10px] pb-[2px] " />
                            <Input
                              ref={addressCapitalRef}
                              type="text"
                              id="addressCapital"
                              className="pl-[32px]"
                              value={addressCapitalValue}
                              onChange={(e) =>
                                setAddressCapitalValue(e.target.value)
                              }
                              placeholder="Las Heras 2304"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {err && <p className="text-red-600 self-start">{err}</p>}

                  <div className="w-full max-w-sm lg:w-[10rem]">
                    <DefaultButton>Guardar cambios</DefaultButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default EditProfile;
