import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment-timezone";
import "moment/locale/es";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useToast } from "../hooks/ui/use-toast";
import BackButton from "../components/BackButton";
import SectionTitle from "../components/SectionTitle";
import DefaultButton from "../components/DefaultButton";

type Publication = {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

const INITIAL_STATES = {
  _id: "",
  title: "",
  subtitle: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  image: "",
};

const SinglePublication = () => {
  const [data, setData] = useState(INITIAL_STATES);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);
  const [err, setErr] = useState<null | string>(null);

  let { id } = useParams();
  const { toast } = useToast();

  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      createdAt: "",
      image: "",
    },
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleOnSubmit = async (data: Publication) => {
    setLoading(true);

    // do the image upload stuff

    try {
      const res = await axios.put(
        `https://fabebus-api-example.onrender.com/api/publications/${id}`,
        { ...data },
        { headers }
      );
      setLoading(false);
      toast({
        description: "Cambios guardados con exito.",
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setLoading(false);
      setErr(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al guardar los cambios, intentar mas tarde.",
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://fabebus-api-example.onrender.com/api/publications/${id}`,
          {
            headers,
          }
        );
        setData(res.data);
        const publicationData = res.data;
        reset({
          title: publicationData.title,
          subtitle: publicationData.subtitle,
          description: publicationData.description
            ? publicationData.description
            : "",
          image: publicationData.image ? publicationData.image : "",
          createdAt: publicationData.createdAt,
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
      <SectionTitle>Publicación completa</SectionTitle>
      <div className="self-start mb-2">
        <BackButton linkTo="/publications" />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <article className="w-full flex justify-center items-center relative mx-auto rounded-md shadow-md pb-4 max-w-[600px] bg-white/40 border border-border-color dark:bg-black/60">
            <div className="w-full px-4 pt-9">
              <div className="flex flex-col gap-2">
                <div className="absolute right-4 top-2 flex items-center gap-2">
                  <p>{data.createdAt}</p>
                </div>

                <div className="flex flex-col gap-3 mt-4 lg:mt-7">
                  <div className="flex flex-col">
                    <h2 className="font-bold text-lg dark:text-white lg:text-xl">
                      {data.title}
                    </h2>
                    {data.subtitle && (
                      <h3 className="font-bold text-lg l dark:text-white lg:text-xl">
                        {data.subtitle}
                      </h3>
                    )}
                    <p>{data.description}</p>
                  </div>

                  <Dialog>
                    <div className="lg:flex lg:items-center lg:justify-end">
                      <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:w-auto lg:h-[31px]">
                        <DialogTrigger className="relative w-full rounded-lg px-6 py-1.5 lg:py-0 bg-[#9e4a4f] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f] lg:w-auto lg:h-[31px]">
                          Editar
                        </DialogTrigger>
                      </div>
                    </div>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl lg:text-3xl">
                          Editar viaje
                        </DialogTitle>
                        <DialogDescription className="text-center lg:text-lg">
                          Hace cambios en el viaje.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="w-full flex flex-col items-center gap-5">
                        <div className="w-full flex flex-col items-center gap-5">
                          <form
                            onSubmit={handleSubmit(handleOnSubmit)}
                            className="w-full flex flex-col items-center gap-3"
                          >
                            <div className="grid w-full max-w-md items-center gap-2">
                              <Label htmlFor="title">Titulo</Label>
                              <Input
                                type="text"
                                id="title"
                                {...register("title", {
                                  required: {
                                    value: true,
                                    message: "Por favor, ingresar título.",
                                  },
                                  minLength: {
                                    value: 3,
                                    message:
                                      "El título no puede ser tan corto.",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "El título no puede ser tan largo.",
                                  },
                                })}
                              />
                              {errors.title && (
                                <p className="text-red-600">
                                  {errors.title.message}
                                </p>
                              )}
                            </div>
                            <div className="grid w-full items-center gap-2">
                              <Label htmlFor="subtitle">Subtitulo</Label>
                              <Input
                                type="text"
                                id="subtitle"
                                {...register("subtitle", {
                                  minLength: {
                                    value: 3,
                                    message:
                                      "El subtítulo no puede ser tan corto.",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "El subtítulo no puede ser tan largo.",
                                  },
                                })}
                              />
                              {errors.subtitle && (
                                <p className="text-red-600">
                                  {errors.subtitle.message}
                                </p>
                              )}
                            </div>
                            <div className="grid w-full items-center gap-2">
                              <Label htmlFor="description">Descripción</Label>
                              <Input
                                type="text"
                                id="description"
                                {...register("description", {
                                  required: {
                                    value: true,
                                    message: "Por favor, ingresar descripción.",
                                  },
                                  minLength: {
                                    value: 3,
                                    message:
                                      "La descripción no puede ser tan corto.",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "La descripción no puede ser tan largo.",
                                  },
                                })}
                              />
                              {errors.description && (
                                <p className="text-red-600">
                                  {errors.description.message}
                                </p>
                              )}
                            </div>

                            {err && (
                              <p className="text-red-600 self-start">{err}</p>
                            )}
                            <DialogFooter>
                              <div className="w-[min(28rem,100%)] flex justify-center">
                                <DefaultButton loading={isSubmitted}>
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
          </article>
        </div>
      )}
    </section>
  );
};

export default SinglePublication;
