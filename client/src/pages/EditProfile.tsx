import { useContext, useEffect, useState } from "react";
import { ArrowLeft, Edit, Pencil, Edit2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/ui/SectionTitle";
import { toast } from "../hooks/ui/use-toast";
import axios from "axios";
import DefaultButton from "../components/DefaultButton";
import BackButton from "../components/BackButton";
import Cookies from "js-cookie";

type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: number;
  image?: string;
  addressCda: string;
  addressCapital?: string;
  password: string;
};

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [addressCda, setAddressCda] = useState("");
  const [addressCapital, setAddressCapital] = useState("");
  const [image, setImage] = useState("");

  const { user, error } = useContext(AuthContext);
  const userData = {
    username: username,
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
    addressCda: addressCda,
    addressCapital: addressCapital,
    image: image,
  };
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // When I submit the data, I want to update that placeholder data
  // just how I did in the profile section with myTrips and userData.
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    try {
      const { data } = await axios.put(
        `http://localhost:8800/api/users/${user._id}`,
        { userData },
        { headers }
      );
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast({
        description: "Cambios guardados con exito.",
      });
      navigate("/mi-perfil");
    } catch (err: any) {
      console.log(err);
      toast({
        variant: "destructive",
        description: "Error al guardar los cambios, intentar mas tarde.",
      });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setUsername(user.username);
      setFullName(user.fullName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddressCda(user.addressCda);
      user.addressCapital
        ? setAddressCapital(user.addressCapital)
        : setAddressCapital("");
      user.image ? setImage(user.image) : setImage("");
    }
  }, [user]);

  return (
    <section className="section">
      <SectionTitle>Editar perfil</SectionTitle>
      <div className="w-full mx-auto mt-6 bg-transparent flex flex-col gap-5 items-center">
        <div className="w-full relative bg-white rounded-md border border-blue-lagoon-700/50 px-3 py-16 flex flex-col items-center gap-5 md:w-8/12 md:py-12 dark:bg-[#262626] dark:border-neutral-600">
          <div className="absolute top-4 left-4">
            <BackButton />
          </div>
          <div className="w-full flex flex-col items-center gap-5">
            <form
              onSubmit={handleOnSubmit}
              className="w-full flex flex-col items-center gap-3"
            >
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                    src={image}
                    alt="avatar"
                  />
                  <AvatarFallback>
                    {" "}
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="absolute -bottom-1 -right-1 rounded-full p-2 bg-slate-800 border-2 border-[#fdfafa] dark:border-[#262626] dark:bg-white"
                      >
                        <Pencil className="w-4 h-4 text-slate-200 dark:text-slate-700" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar imagen</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="grid w-full max-w-md items-center gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-md items-center gap-2">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-md items-center gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-md items-center gap-2">
                <Label htmlFor="confirmPassword">Confirmar contrase</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-md items-center gap-2">
                <Label htmlFor="tel">Celular</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-md items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-md items-center gap-2">
                <Label htmlFor="address">Direccion (Carmen)</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={addressCda}
                  onChange={(e) => setAddressCda(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-md items-center gap-2">
                <Label htmlFor="address-cap">Direccion (Capital)</Label>
                <Input
                  type="text"
                  name="addressCapital"
                  value={addressCapital}
                  onChange={(e) => setAddressCapital(e.target.value)}
                  id="addressCapital"
                />
              </div>
              {error && <span>{error.message}</span>}
              <div className="w-[min(28rem,100%)]">
                <DefaultButton>Guardar cambios</DefaultButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
