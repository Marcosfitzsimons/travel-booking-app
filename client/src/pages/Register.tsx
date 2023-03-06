import { Separator } from "../components/ui/separator";
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Register = () => {
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="section flex flex-col items-center lg:flex-row lg:justify-around">
      <Separator
        orientation="vertical"
        className="h-48 bg-gradient-to-t from-neutral-400 to-[#fafafa] dark:from-neutral-200 dark:to-[#2c2c2c] lg:hidden"
      />
      <div className="">
        <h2 className="text-3xl py-2 font-medium text-center lg:px-3 lg:text-start dark:text-white">
          Crear una cuenta nueva
        </h2>
        <p className="text-center lg:px-3 lg:text-start">
          Una vez que tengas tu cuenta vas a poder reservar tu lugar.
        </p>
        <form
          onSubmit={handleOnSubmit}
          className="relative w-full mt-6 p-3 py-6 flex flex-col gap-5 items-center"
        >
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input type="text" id="username" placeholder="@yourusername" />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="password">Contraseña</Label>
            <Input type="password" id="password" placeholder="Tu contraseña" />
          </div>
          <Button className="w-full bg-black text-white dark:bg-white dark:text-black">
            Crear cuenta
          </Button>
          <p className="lg:self-start">
            ¿Ya tenes cuenta?{" "}
            <Link to="/login" className="text-orange-700">
              Iniciar Sesion
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-6">
        <Separator
          orientation="vertical"
          className="h-48 bg-gradient-to-t from-neutral-400 to-[#fafafa] lg:h-80 dark:from-neutral-200 dark:to-[#2c2c2c]"
        />
        <p className="font-serif tracking-wider lg:text-2xl cursor-default">
          <span className="font-medium text-3xl">F</span>
          <span className="inline-block rotate-3">a</span>
          <span className="inline-block -rotate-6">b</span>
          <span className="inline-block rotate-1">e</span>
          <span className="font-medium text-3xl">B</span>
          <span className="inline-block rotate-6">u</span>
          <span className="inline-block -rotate-3">s</span>
        </p>
        <Separator
          orientation="vertical"
          className="h-52 bg-gradient-to-b from-neutral-800 to-[#fafafa] lg:h-80 dark:from-neutral-200 dark:to-[#2c2c2c]"
        />
      </div>

      <Separator
        orientation="vertical"
        className="h-52 bg-gradient-to-b from-neutral-800 to-[#fafafa] dark:from-neutral-200 dark:to-[#2c2c2c] lg:hidden"
      />
    </section>
  );
};

export default Register;
