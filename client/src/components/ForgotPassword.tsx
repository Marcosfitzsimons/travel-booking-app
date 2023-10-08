import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import BackButton from "./BackButton";
import { Check, X } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import Error from "./Error";
import { Separator } from "./ui/separator";

const ForgotPassword = () => {
  const { id, token } = useParams();
  console.log("Extracted id:", id);
  console.log("Extracted token:", token);

  const originalToken = token?.replace(/_/g, ".");

  const history = useNavigate();

  const [data, setData] = useState(true);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(false);

  const { toast } = useToast();

  const userValid = async () => {
    try {
      const res = await axios.get(
        `/auth/forgotpassword/${id}/${originalToken}`
      );
      console.log(`User valid: ${res}`);
    } catch (err: any) {
      console.log(err);
      setError(true);
      const errorMsg = err.response?.data?.msg;
      toast({
        variant: "destructive",
        title: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Ha ocurrido un
            error
          </div>
        ) as any,
        description: errorMsg
          ? errorMsg
          : "Tu link ha expirado. Debes enviar uno nuevo",
      });
      history("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      toast({
        variant: "destructive",
        description: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Contraseña es
            requerida
          </div>
        ),
      });
    } else if (password.length < 6 || confirmPassword.length < 6) {
      toast({
        variant: "destructive",
        description: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Contraseña no
            puede ser tan corta
          </div>
        ),
      });
    } else if (password.length > 25 || confirmPassword.length > 25) {
      toast({
        variant: "destructive",
        description: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Contraseña no
            puede ser tan larga
          </div>
        ),
      });
    } else {
      try {
        await axios.post(`/auth/changepassword/${id}`, {
          password: password,
          cpassword: confirmPassword,
          token: originalToken,
        });
        toast({
          description: (
            <div className="flex gap-1">
              {<Check className="h-5 w-5 text-green-600 shrink-0" />} Contraseña
              actualizada con éxito
            </div>
          ),
        });
        setPassword("");
        setMessage(true);
      } catch (err: any) {
        const errorMsg = err.response?.data?.msg;
        setPassword("");
        setConfirmPassword("");
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-1">
              {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
              guardar contraseña
            </div>
          ) as any,
          description: errorMsg
            ? errorMsg
            : "Ha ocurrido un error al guardar contraseña. Intentar más tarde",
        });
      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <section className="flex flex-col items-center mt-2">
          <div className="self-start pb-3">
            <BackButton linkTo="/viajes" />
          </div>
          {error ? (
            <div className="pt-3">
              <Error />
            </div>
          ) : (
            <>
              {message ? (
                <div className="w-full relative flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center">
                    <Check className="text-[#3d8f78] w-20 h-20 drop-shadow-sm lg:w-24 lg:h-24 dark:text-[rgba(75,270,200,1)]" />
                    <p className="text-center">
                      Tu contraseña ha sido actualizada con éxito!
                    </p>
                  </div>
                  <Separator className="w-2" />

                  <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                    <Button
                      onClick={() => history("/login")}
                      className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white "
                    >
                      Entrar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center gap-3 max-w-md">
                  <h1 className="w-full text-lg text-center">
                    Ingresa tu contraseña nueva
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm flex flex-col gap-2"
                  >
                    <div className="w-full flex flex-col gap-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        placeholder="..."
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Label htmlFor="confirmPassword">
                        Confirmar contraseña
                      </Label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="..."
                      />
                    </div>
                    <div className="self-end flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                      <Button className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white ">
                        Enviar
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        <div className="flex flex-col items-center gap-7">
          <Skeleton className="h-7 aspect-square self-start" />
          <div className="w-full flex flex-col items-center gap-3 max-w-md">
            <Skeleton className="h-5 w-48" />
            <div className="w-full flex flex-col gap-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-full max-w-sm" />
            </div>
            <Skeleton className="h-7 w-[60px] self-end" />
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
