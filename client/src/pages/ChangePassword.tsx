import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ChangePasswordData } from "@/types/types";
import { Check, Lock, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      cpassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { auth, setAuth } = useAuth();
  const user = auth?.user;

  const axiosPrivate = useAxiosPrivate();

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOnSubmit = async (data: ChangePasswordData) => {
    setLoading(true);
    setError("");
    try {
      await axiosPrivate.put(`/users/changepassword/${user?._id}`, {
        ...data,
      });
      setLoading(false);
      toast({
        description: (
          <div className="flex gap-1">
            {<Check className="h-5 w-5 text-green-600 shrink-0" />} Contraseña
            ha sido actualizada con éxito
          </div>
        ),
      });
      navigate("/mi-perfil");
    } catch (err: any) {
      if (err.response?.status === 403) {
        setAuth({ user: null });
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
      const errorMsg = err.response?.data?.msg;
      setLoading(false);
      setError(errorMsg);
      toast({
        variant: "destructive",
        title: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
            guardar cambios
          </div>
        ) as any,
        description: errorMsg
          ? errorMsg
          : "Ha ocurrido un error al guardar cambios. Por favor, intentar más tarde",
      });
    }
  };

  return (
    <Dialog>
      <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
        <DialogTrigger asChild>
          <Button className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white">
            Cambiar contraseña
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="">
        <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
          <span className="w-8 h-[4px] bg-red-700 rounded-full " />
          <span className="w-4 h-[4px] bg-red-700 rounded-full " />
          <span className="w-2 h-[4px] bg-red-700 rounded-full " />
        </div>
        <div className="absolute bottom-[0.75rem] right-2.5 sm:right-4 flex flex-col rotate-180 gap-[3px]">
          <span className="w-8 h-[4px] bg-red-700 rounded-full " />
          <span className="w-4 h-[4px] bg-red-700 rounded-full " />
          <span className="w-2 h-[4px] bg-red-700 rounded-full " />
        </div>
        <AlertDialogHeader className="mt-7">
          <DialogTitle className="text-center lg:text-2xl">
            Cambiar contraseña
          </DialogTitle>
          <DialogDescription className="text-center lg:text-lg">
            Ingresa tu contraseña nueva
          </DialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="w-full flex flex-col items-center gap-3 mb-7"
        >
          <div className="w-full flex flex-col gap-2 max-w-sm">
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
                      message: "Por favor, ingresa tu contraseña",
                    },
                    minLength: {
                      value: 6,
                      message: "Contraseña no puede ser tan corta",
                    },
                    maxLength: {
                      value: 20,
                      message: "Contraseña no puede ser tan larga",
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
                      message: "Por favor, ingresa tu contraseña",
                    },
                    minLength: {
                      value: 6,
                      message: "Contraseña no puede ser tan corta",
                    },
                    maxLength: {
                      value: 20,
                      message: "Contraseña no puede ser tan larga",
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
            {error && (
              <p className="text-red-600 text-xs sm:text-sm">
                {error ? error : "Ha ocurrido un error, intentar más tarde"}
              </p>
            )}
          </div>

          <DialogFooter>
            <div className="w-full max-w-xs mt-5">
              <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-100/20 dark:after:shadow-highlight dark:after:shadow-slate-100/30 after:transition focus-within:after:shadow-slate-100 dark:focus-within:after:shadow-slate-100">
                <Button
                  disabled={loading}
                  className="relative w-full bg-primary text-slate-100 hover:text-white dark:text-slate-100 dark:bg-primary dark:hover:text-white h-7"
                >
                  Cambiar contraseña
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
