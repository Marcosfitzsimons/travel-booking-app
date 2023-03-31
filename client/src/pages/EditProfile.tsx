import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/ui/SectionTitle";
import { toast } from "../hooks/ui/use-toast";
import axios from "axios";
import DefaultButton from "../components/DefaultButton";
import BackButton from "../components/BackButton";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";

type User = {
  id: string | undefined;
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  phone: number | undefined;
  image?: string | undefined;
  addressCda: string | undefined;
  addressCapital?: string | undefined;
};

const EditProfile = () => {
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

  const handleOnSubmit = async (data) => {
    localStorage.removeItem("user");
    try {
      const res = await axios.put(
        `http://localhost:8800/api/users/${user._id}`,
        { data },
        { headers }
      );
      console.log(res);
      localStorage.setItem("user", JSON.stringify(data));
      toast({
        description: "Cambios guardados con exito.",
      });
      navigate("/mi-perfil");
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setErr(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al guardar los cambios, intentar mas tarde.",
      });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

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
        className=""
      >
        <SectionTitle>Editar perfil</SectionTitle>

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
                      src={user ? user.image : ""}
                      alt="avatar"
                    />
                    <AvatarFallback>
                      {" "}
                      <User className="w-12 h-12 dark:text-blue-lagoon-100" />
                    </AvatarFallback>
                  </Avatar>

                  <Button
                    type="button"
                    className="h-7 px-3 py-2 absolute flex items-center gap-1 text-sm -bottom-1 bg-white/50 rounded-lg border border-blue-lagoon-200 backdrop-blur-sm shadow-sm shadow-blue-lagoon-900/30 hover:bg-white hover:border-blue-lagoon-600/50 dark:text-blue-lagoon-100  dark:bg-blue-lagoon-900/10 dark:border-blue-lagoon-300/50 dark:hover:text-white dark:hover:bg-blue-lagoon-900/60"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </Button>
                </div>
                <div className="grid w-full max-w-md items-center gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Por favor, ingresa tu nombre de usuario.",
                      },
                      minLength: {
                        value: 3,
                        message: "Nombre de usuario debe ser mas corto.",
                      },
                      maxLength: {
                        value: 15,
                        message: "Nombre de usuario debe ser mas largo.",
                      },
                    })}
                  />
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
                        message: "Por favor, ingresa tu nombre completo.",
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
                    <p className="text-red-600">{errors.addressCda.message}</p>
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
    </section>
  );
};

export default EditProfile;
