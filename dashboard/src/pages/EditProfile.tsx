import { useContext, useState } from "react";
import { Upload, User, UserCog } from "lucide-react";
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

type UserData = {
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  phone: number | undefined;
  image?: string | undefined;
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
      image: user?.image,
    },
  });

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
          { userData: { ...data } },
          { headers }
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoading(false);
        toast({
          description: "Cambios guardados con éxito.",
        });
      } else {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dioqjddko/image/upload",
          imgData
        );
        const { url } = uploadRes.data;

        const res = await axios.put(
          `https://fabebus-api-example.onrender.com/api/users/${user?._id}`,
          { userData: { ...data, image: url } },
          { headers }
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoading(false);
        toast({
          description: "Cambios guardados con éxito.",
        });
      }
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setIsLoading(false);
      setErr(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al guardar los cambios, intentar más tarde.",
      });
    }
  };

  return (
    <section className="">
      <SectionTitle>
        <UserCog className="w-6 h-6 text-accent sm:h-7 sm:w-7" />
        Editar perfil
      </SectionTitle>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="">
          <div className="w-full mt-5 mb-16 flex flex-col items-center gap-5">
            <div className="self-start">
              <BackButton linkTo="/mi-perfil" />
            </div>
            <div className="w-full flex flex-col items-center gap-5 md:w-8/12">
              <div className="w-full flex flex-col items-center gap-5 md:max-w-sm">
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
                        <User className="w-12 h-12 dark:text-slate-200" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="absolute -bottom-1 ">
                      <Label
                        htmlFor="image"
                        className="flex items-center gap-1.5 cursor-pointer h-7 px-3 py-2 rounded-lg shadow-sm shadow-slate-200/40 border border-black/60 bg-secondary text-secondary-foreground hover:border-slate-100 dark:border-slate-600 dark:hover:border-slate-100"
                      >
                        Editar
                        <Upload className="w-4 h-4 text-secondary-foreground" />
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
                  {err && <p className="text-red-600 self-start">{err}</p>}
                  <div className="w-full flex justify-center my-1 lg:w-[10rem]">
                    <DefaultButton>Guardar cambios</DefaultButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditProfile;
