import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { useToast } from "../hooks/ui/use-toast";
import DefaultButton from "./DefaultButton";
import { Upload } from "lucide-react";
import Autocomplete from "react-google-autocomplete";
import PlacesAutocomplete from "./PlacesAutocomplete";
interface InputValidation {
  required: {
    value: boolean;
    message: string;
  };
  minLength: {
    value: number;
    message: string;
  };
  maxLength: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}

interface UserInput {
  id: any;
  label: string;
  type: string;
  placeholder?: string;
  validation?: InputValidation;
  icon?: any;
}

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

type NewUserFormProps = {
  inputs: UserInput[];
};

const NewUserForm = ({ inputs }: NewUserFormProps) => {
  const [image, setImage] = useState<File | string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<null | string>(null);

  let imageInput: UserInput = {
    id: "imageInput",
    label: "Subir",
    type: "file",
    icon: <Upload className="w-4 h-4" />,
    // check validation
  };

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
      address1: "",
      imageInput: "",
    },
  });

  const handleOnSubmit = async (data: User) => {
    setIsLoading(true);
    const imgData = new FormData();
    imgData.append("file", image);
    imgData.append("upload_preset", "upload");
    try {
      if (!image) {
        await axios.post(
          "https://fabebus-api-example.onrender.com/api/auth/register",
          {
            ...data,
          }
        );
        setIsLoading(false);
        toast({
          description: "Usuario creado con éxito.",
        });
      } else {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dioqjddko/image/upload",
          imgData
        );
        const { url } = uploadRes.data;

        await axios.post(
          "https://travel-booking-api-production.up.railway.app/api/auth/register",
          {
            ...data,
            image: url,
          }
        );
        setIsLoading(false);
        toast({
          description: "Usuario creado con éxito.",
        });
      }
      navigate("/users");
    } catch (err: any) {
      console.log(err);
      const errorMsg = err.response.data.msg;
      setIsLoading(false);
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
        <div className="w-full relative flex flex-col items-center lg:basis-1/3">
          <Avatar className="w-32 h-32 relative">
            <AvatarImage
              className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle object-cover"
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt="avatar"
            />
            <AvatarFallback>
              <User className="w-12 h-12 dark:text-blue-lagoon-100" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0">
            <Label
              className="flex items-center gap-2 cursor-pointer h-7 px-3 py-2 rounded-lg shadow-sm shadow-blue-lagoon-900/30 border border-border-color bg-white dark:border-border-color-dark dark:text-blue-lagoon-100 dark:bg-black dark:hover:text-white dark:hover:border-zinc-300"
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
                  const file = e.target.files[0];
                  if (file instanceof File) {
                    setImage(file);
                  } else {
                    console.error("Invalid file type");
                  }
                },
              })}
            />
            {errors.imageInput && (
              <p className="text-red-600">{errors.imageInput.message}</p>
            )}
          </div>
        </div>

        {/* <div className="w-full relative flex flex-col items-center lg:basis-1/3">
          <PlacesAutocomplete />
        </div>} */}

        <div className="w-full flex flex-col items-center gap-2 lg:basis-2/3 lg:grid lg:grid-cols-2 lg:gap-3">
          {inputs.map((input) => (
            <div key={input.id} className="grid w-full items-center gap-2">
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                type={input.type}
                id={input.id}
                placeholder={input.placeholder}
                {...register(input.id, input.validation)}
              />
              {errors[input.id as keyof typeof errors] && (
                <p className="text-red-600">
                  {errors[input.id as keyof typeof errors]?.message}
                </p>
              )}
            </div>
          ))}
          {err && <p className="text-red-600 self-start">{err}</p>}
          <div className="w-full mt-2 lg:flex lg:self-end lg:justify-end">
            <DefaultButton loading={isLoading}>
              {isLoading ? "Creando..." : "Crear usuario"}
            </DefaultButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
