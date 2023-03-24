import { useState } from "react";
import { useToast } from "../hooks/ui/use-toast";
import { Separator } from "../components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import Logo from "../components/Logo";
import DefaultButton from "../components/DefaultButton";

type User = {
  username: string;
  fullName: string;
  email: string;
  phone: number;
  image?: string;
  addressCda: string;
  addressCapital?: string;
  password: string;
};

const Register = () => {
  const [inputs, setInputs] = useState<User>({
    username: "",
    fullName: "",
    password: "",
    email: "",
    phone: 0,
    addressCda: "",
  });
  const [err, setErr] = useState<null | string>(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      toast({
        description: "Registro exitoso. Ahora podes entrar a tu cuenta.",
      });
      navigate("/login");
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: "Registro fallido. Intentar mas tarde por favor.",
      });
    }
  };

  return (
    <section className="section flex flex-col items-center lg:flex-row lg:justify-around lg:gap-20">
      <Separator
        orientation="vertical"
        className="h-52 bg-gradient-to-t from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12] lg:hidden"
      />
      <div className="">
        <h2 className="text-3xl py-2 font-medium text-center lg:px-3 lg:text-start dark:text-white">
          Crear cuenta nueva
        </h2>
        <p className="text-center lg:px-3 lg:text-start">
          Una vez que tengas tu cuenta vas a poder reservar tu lugar.
        </p>
        <form
          onSubmit={handleOnSubmit}
          className="relative w-full mt-6 p-3 py-6 flex flex-col gap-5 items-center"
        >
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="fullname">Nombre completo</Label>
            <Input
              type="text"
              id="fullname"
              placeholder="Tu nombre completo"
              name="fullName"
              onChange={handleOnChange}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              type="text"
              id="username"
              placeholder="@tomasholder666"
              name="username"
              onChange={handleOnChange}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              placeholder="Tu contraseña"
              name="password"
              onChange={handleOnChange}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Tu email"
              name="email"
              onChange={handleOnChange}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="Celular">Celular</Label>
            <Input
              type="tel"
              id="Celular"
              placeholder="Tu numero celular"
              name="phone"
              onChange={handleOnChange}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="address">Domicilio (Carmen)</Label>
            <Input
              id="address"
              placeholder="Tu domicilio en Carmen"
              name="addressCda"
              onChange={handleOnChange}
            />
          </div>
          <DefaultButton>Crear cuenta</DefaultButton>
          <p className="lg:self-start">
            ¿Ya tenes cuenta?{" "}
            <Link to="/login" className="font-medium text-blue-lagoon-500">
              Iniciar Sesion
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-6">
        <Separator
          orientation="vertical"
          className="h-80 bg-gradient-to-t from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12]"
        />
        <Logo />
        <Separator
          orientation="vertical"
          className="h-80 bg-gradient-to-b from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12]"
        />
      </div>

      <Separator
        orientation="vertical"
        className="h-52 bg-gradient-to-b from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12] lg:hidden"
      />
    </section>
  );
};

export default Register;
