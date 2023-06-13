import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

type addressCda = {
  street: string;
  streetNumber: number | null;
  crossStreets: string;
};

type User = {
  _id: string | undefined;
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  dni: number | undefined;
  addressCda: addressCda | undefined;
  addressCapital: string | undefined;
  phone: number | undefined;
  image?: string | undefined;
};

type SearchUserInputProps = {
  list: User[];
  setFilteredList: (users: any) => void;
};
const SearchUserInput = ({ list, setFilteredList }: SearchUserInputProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = searchInput.trim().toLocaleLowerCase();
    const matchingUsers = list.filter((user) => {
      return (
        user.username?.toLowerCase().includes(inputValue) ||
        user.fullName?.toLowerCase().includes(inputValue) ||
        user.email?.toLowerCase().includes(inputValue)
      );
    });
    setFilteredList(matchingUsers);
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="w-full flex flex-col gap-2">
        <Label>Ingresa nombre de usuario, email, o nombre:</Label>
        <div className="flex items-center gap-1">
          <div className="">
            <Input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="relative w-auto h-[31px] after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200">
            <Button className="relative w-auto h-[31px] bg-[#9e4a4f] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f]">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchUserInput;
