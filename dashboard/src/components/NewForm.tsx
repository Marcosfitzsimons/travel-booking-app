import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useState } from "react";
import { User } from "lucide-react";

const NewForm = ({ inputs }) => {
  const [file, setFile] = useState("");
  const filteredInputs = inputs.filter((input) => input.id !== "file");
  const fileInput = inputs.find((input) => input.id === "file");
  return (
    <div className="">
      <form
        onSubmit={() => {}}
        className="relative w-full mt-6 p-3 py-6 flex flex-col gap-5 items-center lg:flex-row lg:items-start "
      >
        {fileInput && (
          <div className="w-full relative flex flex-col items-center lg:basis-1/3">
            <Avatar className="w-32 h-32">
              <AvatarImage
                className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                src={file ? URL.createObjectURL(file) : ""}
                alt="avatar"
              />
              <AvatarFallback>
                {" "}
                <User className="w-12 h-12 dark:text-blue-lagoon-100" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0">
              <Label
                className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-md border bg-white/80 "
                htmlFor={fileInput.id}
              >
                {fileInput.label} {fileInput.icon}
              </Label>
              <Input
                type={fileInput.type}
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                id={fileInput.id}
              />
            </div>
          </div>
        )}
        <div className="w-full flex flex-col items-center lg:basis-2/3">
          {filteredInputs.map((input) => (
            <div key={input.id} className="grid w-full items-center gap-2">
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                type={input.type}
                id={input.id}
                placeholder={input.placeholder}
              />
            </div>
          ))}

          <Button className="mt-2">Crear usuario</Button>
        </div>
      </form>
    </div>
  );
};

export default NewForm;
