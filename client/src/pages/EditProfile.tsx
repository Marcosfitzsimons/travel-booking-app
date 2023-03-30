import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
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
                onSubmit={handleOnSubmit}
                className="w-full flex flex-col items-center gap-3"
              >
                <div className="relative flex flex-col items-center">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                      src={image}
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
      </motion.div>
    </section>
  );
};

export default EditProfile;
