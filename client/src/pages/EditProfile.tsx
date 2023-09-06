import { useEffect, useState } from "react";
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
import SectionTitle from "../components/SectionTitle";
import { useToast } from "../components/ui/use-toast";
import DefaultButton from "../components/DefaultButton";
import BackButton from "../components/BackButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import EditProfileSkeleton from "@/components/skeletons/EditProfileSkeleton";
import { UserData } from "@/types/types";
import sectionVariants from "@/lib/variants/sectionVariants";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import axios from "../api/axios";

const INITIAL_VALUES = {
  username: "",
  fullName: "",
  email: "",
  phone: undefined,
  dni: undefined,
  addressCda: {
    street: "",
    streetNumber: undefined,
    crossStreets: "",
  },
  addressCapital: "",
  image: "",
};

const EditProfile = () => {
  const [userData, setUserData] = useState(INITIAL_VALUES);
  const [image, setImage] = useState<File | string>(userData.image ?? "");
  const [addressCapitalValue, setAddressCapitalValue] = useState(
    userData.addressCapital ?? ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<null | string>(null);

  const { auth, setAuth } = useAuth();
  const user = auth?.user;

  // Fix header image update when updating user profile

  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      username: userData.username,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      dni: userData.dni,
      addressCda: {
        street: userData.addressCda.street,
        streetNumber: userData.addressCda.streetNumber,
        crossStreets: userData.addressCda.crossStreets,
      },
    },
  });

  const { toast } = useToast();

  const navigate = useNavigate();

  const handleOnSubmit = async (data: UserData) => {
    if (
      !isDirty &&
      addressCapitalValue === userData.addressCapital &&
      (!image || (typeof image === "string" && image === userData.image))
    ) {
      return toast({
        variant: "destructive",
        description: "Es necesario realizar cambios antes de enviar",
      });
    }
    setIsLoading(true);

    try {
      let userDataToUpdate = {
        ...data,
        addressCapital: addressCapitalValue,
      };

      if (image instanceof File) {
        const imgData = new FormData();
        imgData.append("file", image);
        imgData.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dioqjddko/image/upload",
          imgData
        );

        userDataToUpdate = {
          ...userDataToUpdate,
          image: uploadRes.data.url,
        };
      }

      const res = await axiosPrivate.put(`/users/${user?._id}`, {
        userData: userDataToUpdate,
      });

      setAuth((prev) => ({
        ...prev,
        user: {
          image: res.data.user.image,
          _id: user?._id,
          status: user?.status,
        },
      }));
      setUserData(res.data.user);
      setIsLoading(false);
      toast({
        description: "Cambios guardados con éxito.",
      });
      setTimeout(() => {
        navigate("/mi-perfil");
      }, 100);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setAuth({ user: null });
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
      setIsLoading(false);
      setErr(
        err.response?.data?.msg || "Error al editar perfil, intente más tarde."
      );
      toast({
        variant: "destructive",
        title: "Error al crear cuenta",
        description:
          err.response?.data?.msg ||
          "Error al editar perfil, intente más tarde.",
      });
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file instanceof File) {
      setImage(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get(`/users/${user?._id}`);
      const userData = res.data.user;
      setUserData(userData);
      reset({
        username: userData.username,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        dni: userData.dni,
        addressCda: {
          street: userData.addressCda.street,
          streetNumber: userData.addressCda.streetNumber,
          crossStreets: userData.addressCda.crossStreets,
        },
      });
      setAddressCapitalValue(userData.addressCapital);
      setImage(userData.image ? userData.image : "");
      setIsLoading(false);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setAuth({ user: null });
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute left-0">
          <BackButton linkTo="/mi-perfil" />
        </div>
        <SectionTitle>Editar perfil</SectionTitle>
      </div>
      {isLoading ? (
        <EditProfileSkeleton />
      ) : (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="w-full mb-16 flex flex-col items-center gap-5">
            <div className="w-full flex flex-col items-center gap-5 md:w-11/12">
              <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="w-full flex flex-col items-center gap-3 lg:flex-row lg:gap-10 lg:items-start"
              >
                <div className="relative flex flex-col items-center mb-2 lg:px-6">
                  <Avatar className="w-24 h-24 lg:w-32 lg:h-32">
                    <AvatarImage
                      className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : userData.image
                      }
                      alt="avatar"
                    />
                    <AvatarFallback>
                      <User className="w-12 h-12 dark:text-blue-lagoon-100" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -bottom-0.5">
                    <Label
                      htmlFor="image"
                      className="flex items-center gap-1 cursor-pointer h-6 px-3 rounded-lg shadow-sm shadow-blue-lagoon-900/30 border bg-white dark:text-blue-lagoon-100 dark:bg-black dark:hover:border-zinc-300"
                    >
                      <Upload className="w-4 h-4" />
                      {userData.image ? "Editar" : "Subir"}
                    </Label>
                    <Input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col items-center gap-5 lg:max-w-2xl">
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-col items-center ">
                      <h5 className="text-center w-full font-medium dark:text-white lg:mb-2 lg:text-start lg:text-xl">
                        Datos personales
                      </h5>
                    </div>

                    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-2 lg:max-w-5xl lg:flex-row lg:items-start">
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
                                pattern: {
                                  value: /^(?=.*[0-9])[a-zA-Z0-9]{3,}$/,
                                  message:
                                    "El nombre de usuario debe tener al menos 3 caracteres y contener al menos un número.",
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
                                pattern: {
                                  value: /^[a-zA-Z\s]+$/,
                                  message:
                                    "Nombre y apellido deben contener solo letras.",
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
                          <Label htmlFor="phone">Celular</Label>
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

                  <div className="w-full flex flex-col items-center gap-3 lg:gap-1">
                    <div className="w-full flex flex-col items-center">
                      <h5 className="text-center w-full font-medium dark:text-white lg:text-start lg:text-xl">
                        Domicilios
                      </h5>
                    </div>

                    <div className="w-full  max-w-sm flex flex-col gap-3 lg:max-w-5xl">
                      <div className="w-full flex flex-col gap-2 lg:flex-row">
                        <div className="w-full flex flex-col gap-2">
                          <div className="w-full flex flex-col gap-2">
                            <h6 className="font-serif text-accent ">
                              Carmen de Areco
                            </h6>
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
                                        message:
                                          "Por favor, ingresar domicilio.",
                                      },
                                      minLength: {
                                        value: 3,
                                        message:
                                          "Domicilio no puede ser tan corto.",
                                      },
                                      maxLength: {
                                        value: 25,
                                        message:
                                          "Domicilio no puede ser tan largo.",
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
                              <Label htmlFor="crossStreets">
                                Calles que cruzan
                              </Label>
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
                        </div>

                        <div className="w-full flex flex-col gap-2 ">
                          <h6 className="font-serif text-accent ">
                            Capital Federal
                          </h6>
                          <div className="grid w-full items-center gap-2">
                            <Label htmlFor="editProfileAddressCapital">
                              Dirección
                            </Label>
                            <div className="w-full">
                              <AddressAutocomplete
                                id="editProfileAddressCapital"
                                value={addressCapitalValue}
                                setValue={setAddressCapitalValue}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {err && <p className="text-red-600 self-start">{err}</p>}

                  <div className="w-full mt-4 max-w-sm lg:w-[10rem]">
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
