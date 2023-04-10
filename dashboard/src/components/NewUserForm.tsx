import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { useToast } from "../hooks/ui/use-toast";

type User = {
  username: string;
  fullName: string;
  email: string;
  phone: number | null;
  image?: string;
  addressCda: string;
  addressCapital?: string;
  password: string;
};

const NewUserForm = ({ inputs }) => {
  // Add react-hook-form validations.
  const [image, setImage] = useState("");
  const [err, setErr] = useState<null | string>(null);
  const filteredInputs = inputs.filter((input) => input.id !== "image");
  const imageInput = inputs.find((input) => input.id === "image");

  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      password: "",
      email: "",
      phone: null,
      addressCda: "",
      addressCapital: "",
      image: "",
    },
  });

  const handleOnSubmit = async (data: User) => {
    const imgData = new FormData();
    imgData.append("file", image);
    imgData.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dioqjddko/image/upload",
        imgData
      );
      const { url } = uploadRes.data;

      await axios.post("http://localhost:8800/api/auth/register", {
        ...data,
        image: url,
      });
      toast({
        description: "Usuario creado con éxito.",
      });
      navigate("/users");
    } catch (err: any) {
      console.log(err);
      const errorMsg = err.response.data.err.message;
      setErr(errorMsg);
      toast({
        description: "Error al crear usuario. Intentar más tarde.",
      });
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="relative w-full mt-6 p-3 py-6 flex flex-col gap-5 items-center lg:flex-row lg:items-start "
      >
        {imageInput && (
          <div className="w-full relative flex flex-col items-center lg:basis-1/3">
            <Avatar className="w-32 h-32 relative">
              <AvatarImage
                className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle object-cover"
                src={image ? URL.createObjectURL(image) : ""}
                alt="avatar"
              />
              <AvatarFallback>
                <User className="w-12 h-12 dark:text-blue-lagoon-100" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0">
              <Label
                className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-md border bg-white/80 "
                htmlFor={imageInput.id}
              >
                {imageInput.label} {imageInput.icon}
              </Label>
              <Input
                type={imageInput.type}
                accept="image/*"
                className="hidden"
                id={imageInput.id}
                {...register(imageInput.id, {
                  onChange: (e) => {
                    setImage(e.target.files[0]);
                  },
                })}
              />
              {errors[imageInput.id] && (
                <p className="text-red-600">{errors[imageInput.id].message}</p>
              )}
            </div>
          </div>
        )}
        <div className="w-full flex flex-col items-center lg:basis-2/3 lg:grid lg:grid-cols-2 lg:gap-3">
          {filteredInputs.map((input) => (
            <div key={input.id} className="grid w-full items-center gap-2">
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                type={input.type}
                id={input.id}
                placeholder={input.placeholder}
                {...register(input.id, input.validation)}
              />
              {errors[input.id] && (
                <p className="text-red-600">{errors[input.id].message}</p>
              )}
            </div>
          ))}
          {err && <p className="text-red-600 self-start">{err}</p>}
          <div className="mt-2 lg:flex lg:self-end justify-end">
            <Button className="">Crear usuario</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
