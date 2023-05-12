import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Upload, User, X } from "lucide-react";
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

type UserData = {
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  phone: number | undefined;
  dni: number | undefined;
  image?: string | undefined;
  addressCda: string | undefined;
  addressCapital: string | undefined;
};

const EditProfile = () => {
  const [image, setImage] = useState<File | string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<null | string>(null);
  const { user } = useContext(AuthContext);
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
      addressCda: user?.addressCda,
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
          `https://travel-booking-api-production.up.railway.app/api/users/${user?._id}`,
          { userData: { ...data } },
          { headers }
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoading(false);
        toast({
          description: "Cambios guardados con exito.",
        });
        setTimeout(() => {
          navigate(0);
        }, 2000);
      } else {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dioqjddko/image/upload",
          imgData
        );
        const { url } = uploadRes.data;

        const res = await axios.put(
          `https://travel-booking-api-production.up.railway.app/api/users/${user?._id}`,
          { userData: { ...data, image: url } },
          { headers }
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoading(false);
        toast({
          description: "Cambios guardados con exito.",
        });
        setTimeout(() => {
          navigate(0);
        }, 2000);
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
  return (
    <section className="">
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
            <div className="self-start">
              <BackButton toProfile={true} />
            </div>
            <div className="w-full flex flex-col items-center gap-5 md:w-8/12">
              <div className="w-full flex flex-col items-center gap-5">
                <form
                  onSubmit={handleSubmit(handleOnSubmit)}
                  className="w-full flex flex-col items-center gap-3"
                >
                  <div className="relative flex flex-col items-center">
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

                    <div className="absolute -bottom-1 ">
                      <Label
                        htmlFor="image"
                        className="flex items-center gap-2 cursor-pointer h-7 px-3 py-2 rounded-lg shadow-sm shadow-blue-lagoon-900/30 border border-border-color bg-white hover:border-blue-lagoon-300 dark:border-zinc-500 dark:text-blue-lagoon-100 dark:bg-black dark:hover:border-blue-lagoon-300/80"
                      >
                        Subir{" "}
                        <Upload className="w-4 h-4 dark:text-blue-lagoon-100" />
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
                  <div className="grid w-full max-w-md items-center gap-2">
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
                      <span className="absolute left-3 pb-[2px] select-none">
                        @
                      </span>
                    </div>
                    {errors.username && (
                      <p className="text-red-600">{errors.username.message}</p>
                    )}
                  </div>
                  <div className="grid w-full max-w-md items-center gap-2">
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input
                      type="text"
                      id="fullName"
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
                  <div className="grid w-full max-w-md items-center gap-2">
                    <Label htmlFor="tel">Celular</Label>
                    <Input
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
                          message: "Número celular debe incluir solo números.",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="grid w-full max-w-md items-center gap-2">
                    <Label htmlFor="dni">DNI</Label>
                    <Input
                      type="number"
                      id="dni"
                      className="appearance-none"
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
                  <div className="grid w-full max-w-md items-center gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
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
                    {errors.email && (
                      <p className="text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="grid w-full max-w-md items-center gap-2">
                    <Label htmlFor="addressCda">Direccion (Carmen)</Label>
                    <Input
                      type="text"
                      id="addressCda"
                      {...register("addressCda", {
                        required: {
                          value: true,
                          message: "Por favor, ingresa tu domicilio.",
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
                    {errors.addressCda && (
                      <p className="text-red-600">
                        {errors.addressCda.message}
                      </p>
                    )}
                  </div>
                  <div className="grid w-full max-w-md items-center gap-2">
                    <Label htmlFor="address-cap">Direccion (Capital)</Label>
                    <Input
                      type="text"
                      {...register("addressCapital", {
                        required: {
                          value: true,
                          message: "Por favor, ingresa tu domicilio.",
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
                    {errors.addressCapital && (
                      <p className="text-red-600">
                        {errors.addressCapital.message}
                      </p>
                    )}
                  </div>
                  {err && <p className="text-red-600 self-start">{err}</p>}
                  <div className="w-[min(28rem,100%)]">
                    <DefaultButton>Guardar cambios</DefaultButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default EditProfile;
