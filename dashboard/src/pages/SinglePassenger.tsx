import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import BackButton from "../components/BackButton";
import { ContactIcon, Mail, MapPin, Phone, Upload, User } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "../hooks/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useForm } from "react-hook-form";
import DefaultButton from "../components/DefaultButton";
import { Button } from "../components/ui/button";
import Loading from "../components/Loading";

type UserData = {
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  addressCda: string | undefined;
  addressCapital: string | undefined;
  phone: number | undefined;
  dni: number | undefined;
  image?: string | undefined;
};

const INITIAL_STATES = {
  username: "",
  fullName: "",
  email: "",
  addressCda: "",
  addressCapital: "",
  phone: undefined,
  dni: undefined,
  image: "",
};

const SinglePassenger = () => {
  const [data, setData] = useState(INITIAL_STATES);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | string>("");
  const [err, setErr] = useState<any>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      phone: undefined,
      dni: undefined,
      image: "",
      addressCda: "",
      addressCapital: "",
    },
  });

  let { userId, tripId } = useParams();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleOnSubmit = async (data: UserData) => {
    setLoading(true);

    const imgData = new FormData();
    imgData.append("file", image);
    imgData.append("upload_preset", "upload");

    try {
      if (!image) {
        const res = await axios.put(
          `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
          { data },
          { headers }
        );
        setLoading(false);
        toast({
          description: "Cambios guardados con exito.",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dioqjddko/image/upload",
          imgData
        );
        const { url } = uploadRes.data;
        const res = await axios.put(
          `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
          { ...data, image: url },
          { headers }
        );
        setLoading(false);
        toast({
          description: "Cambios guardados con exito.",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setLoading(false);
      setErr(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al guardar los cambios, intentar mas tarde.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
          {
            headers,
          }
        );
        setData(res.data.passenger.createdBy);
        const userData = res.data.passenger.createdBy;
        reset({
          username: userData.username,
          email: userData.email,
          fullName: userData.fullName,
          phone: userData.phone,
          dni: userData.dni,
          addressCda: userData.addressCda,
          addressCapital: userData.addressCapital,
          image: userData.image ? userData.image : "",
        });
      } catch (err: any) {
        setErr(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col gap-3">
      <SectionTitle>Información del pasajero:</SectionTitle>
      <p className="text-red-600 font-medium">
        {`<- Fix update passenger functionality ->`}
      </p>
      <div className="self-start mb-2">
        <BackButton linkTo={`/trips/${tripId}`} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative self-center flex flex-col gap-3 p-5 w-full max-w-md rounded-md">
          <div className="flex flex-col items-center gap-3">
            <div className="w-full relative flex flex-col items-center lg:basis-1/3">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                  src={data?.image}
                  alt="avatar"
                />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-xl dark:text-white ">
                {data?.fullName}
              </h3>
              <h4 className="text-[#737373]">@{data?.username}</h4>
            </div>
            <div className="w-full flex flex-col items-center gap-5">
              <ul className="flex flex-col w-full overflow-hidden bg-white gap-2 items-start max-w-sm border border-border-color p-4 shadow-inner rounded-md dark:bg-black/60 dark:border-zinc-500">
                <li className="flex items-center gap-1 shrink-0">
                  <MapPin className="w-4 h-4 text-icon-color dark:text-icon-color-dark shrink-0" />
                  <span className="font-medium shrink-0">
                    Dirrección Carmen:
                  </span>
                  <span className="shrink-0">{data?.addressCda}</span>
                </li>
                <li className="flex items-center gap-1 shrink-0">
                  <MapPin className="w-4 h-4 text-icon-color dark:text-icon-color-dark shrink-0" />
                  <span className="font-medium shrink-0">
                    Dirrecion Capital:
                  </span>
                  <span className="shrink-0">{data?.addressCapital}</span>
                </li>
                <li className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-icon-color dark:text-icon-color-dark shrink-0" />
                  <span className="font-medium">Celular:</span> {data?.phone}
                </li>
                <li className="flex items-center gap-1 shrink-0">
                  <ContactIcon className="w-4 h-4 text-icon-color dark:text-icon-color-dark shrink-0" />
                  <span className="font-medium shrink-0">DNI:</span>
                  <span className="shrink-0">{data?.dni}</span>
                </li>
                <li className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-icon-color dark:text-icon-color-dark shrink-0" />
                  <span className="font-medium">Email:</span>
                  {data?.email}
                </li>
              </ul>
              <Dialog>
                <div className="relative w-full max-w-sm mx-auto after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:h-8 lg:w-[9rem]">
                  <DialogTrigger asChild>
                    <Button className="relative w-full bg-[#9e4a4f] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 max-w-sm dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f] lg:h-8 lg:w-[9rem]">
                      Editar
                    </Button>
                  </DialogTrigger>
                </div>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar perfil</DialogTitle>
                    <DialogDescription>
                      Hace cambios en el perfil del usuario.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="w-full flex flex-col items-center gap-5">
                    <div className="w-full flex flex-col items-center gap-5">
                      <form
                        onSubmit={handleSubmit(handleOnSubmit)}
                        className="w-full flex flex-col items-center gap-3"
                      >
                        <div className="relative flex flex-col items-center ">
                          <Avatar className="w-32 h-32">
                            <AvatarImage
                              className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                              src={
                                image instanceof File
                                  ? URL.createObjectURL(image)
                                  : data?.image
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
                              className="flex items-center gap-2 cursor-pointer h-7 px-3 py-2 rounded-lg shadow-sm shadow-blue-lagoon-900/30 border border-blue-lagoon-200 bg-white hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-black dark:hover:border-blue-lagoon-300/80"
                            >
                              Subir
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
                              <p className="text-red-600">
                                {errors.image.message}
                              </p>
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
                                message:
                                  "Por favor, ingresa tu nombre de usuario.",
                              },
                              minLength: {
                                value: 3,
                                message:
                                  "Nombre de usuario debe ser mas corto.",
                              },
                              maxLength: {
                                value: 15,
                                message:
                                  "Nombre de usuario debe ser mas largo.",
                              },
                            })}
                          />
                          {errors.username && (
                            <p className="text-red-600">
                              {errors.username.message}
                            </p>
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
                                message:
                                  "Por favor, ingresa tu nombre completo.",
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
                          {errors.fullName && (
                            <p className="text-red-600">
                              {errors.fullName.message}
                            </p>
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
                          {errors.phone && (
                            <p className="text-red-600">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                        <div className="grid w-full max-w-md items-center gap-2">
                          <Label htmlFor="dni">DNI</Label>
                          <Input
                            type="number"
                            id="dni"
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
                            <p className="text-red-600">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="grid w-full max-w-md items-center gap-2">
                          <Label htmlFor="addressCda">Dirección (Carmen)</Label>
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
                          <Label htmlFor="addressCda">
                            Dirección (Capital)
                          </Label>
                          <Input
                            type="text"
                            id="addressCapital"
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
                        {err && (
                          <p className="text-red-600 self-start">
                            {err.message}
                          </p>
                        )}
                        <DialogFooter>
                          <div className="w-[min(28rem,100%)] flex justify-center">
                            <DefaultButton loading={loading}>
                              Guardar cambios
                            </DefaultButton>
                          </div>
                        </DialogFooter>
                      </form>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SinglePassenger;
