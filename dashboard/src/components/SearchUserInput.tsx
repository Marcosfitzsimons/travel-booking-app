import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import DefaultButton from "./DefaultButton";

type User = {
  _id: string | undefined;
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  addressCda: string | undefined;
  addressCapital?: string | undefined;
  phone: number | undefined;
  image?: string | undefined;
};

type SearchUserInputProps = {
  list: User[];
  setFilteredList: (users: User[]) => void;
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
              className=""
            />
          </div>
          <div className="">
            <DefaultButton>Buscar</DefaultButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchUserInput;
