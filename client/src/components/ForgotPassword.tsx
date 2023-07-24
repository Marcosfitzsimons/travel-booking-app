import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import BackButton from "./BackButton";
import { Check, CheckCircle } from "lucide-react";

// TO DO...
const ForgotPassword = () => {
  const { id, token } = useParams();

  const history = useNavigate();

  const [data, setData] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const { toast } = useToast();

  const userValid = async () => {
    try {
      const res = await axios.get(
        `https://fabebus-api-example.onrender.com/api/auth/forgotpassword/${id}/${token}`
      );
      console.log(`User valid: ${res}`);
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        description: "Tu link ha expirado. Debes enviar uno nuevo",
      });
      history("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === "") {
      toast({
        variant: "destructive",
        description: "Contraseña es requerida",
      });
    } else if (password.length < 6) {
      toast({
        variant: "destructive",
        description: "Contraseña no puede ser tan corta",
      });
    } else if (password.length > 25) {
      toast({
        variant: "destructive",
        description: "Contraseña no puede ser tan larga",
      });
    } else {
      try {
        const res = await axios.post(
          `https://fabebus-api-example.onrender.com/api/auth/changepassword/${id}/${token}`,
          {
            password: password,
          }
        );
        console.log(res);
        toast({
          description: (
            <div className="flex items-center gap-1">
              {<CheckCircle className="w-[15px] h-[15px]" />} Contraseña
              guardada con éxito.
            </div>
          ),
        });
        setPassword("");
        setMessage(true);
      } catch (err) {
        console.log(err);
        setPassword("");
        toast({
          variant: "destructive",
          description: "Error al guardar su contraseña. Intentar más tarde.",
        });
      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {data ? (
        <section className="flex flex-col items-center mt-2">
          {message ? (
            <div className="w-full relative flex flex-col items-center gap-3 mt-6">
              <div className="absolute -top-4 flex items-center justify-center w-8 aspect-square rounded-full border-2 bg-[#4E8D7C] border-white">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div className="w-11/12 pt-6 mx-auto flex flex-col text-center items-center gap-1 p-3 rounded-md bg-[#4E8D7C] text-white">
                <h3 className="">Contraseña ha sido actualizada con éxito!</h3>
              </div>
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
            <div className="w-full flex flex-col gap-6">
              <h1 className="w-full text-lg text-center">
                Escribí tu contraseña nueva
              </h1>
              <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="w-full flex flex-col gap-2">
                  <Label htmlFor="password">Contraseña nueva</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    placeholder="..."
                  />
                  <div className="self-end flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                    <Button className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white ">
                      Enviar
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ForgotPassword;
