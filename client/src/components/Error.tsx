import { Frown } from "lucide-react";

const Error = () => {
  return (
    <div className="flex justify-center h-[60vh]">
      <p className="text-center flex items-center flex-col gap-1">
        Ha ocurrido un error al intentar cargar información{" "}
        <Frown className="w-5 h-5 shrink-0" />
      </p>
    </div>
  );
};

export default Error;
