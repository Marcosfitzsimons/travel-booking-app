import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import DefaultButton from "./DefaultButton";

type SearchUserInputProps = {};
const SearchUserInput = ({ list, setFilteredList }: SearchUserInputProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = searchInput.trim().toLocaleLowerCase();
    const matchingUsers = list.filter((user) => {
      return (
        user.username.toLowerCase().includes(inputValue) ||
        user.fullName.toLowerCase().includes(inputValue) ||
        user.email.toLowerCase().includes(inputValue)
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
              className="w-[]"
            />
          </div>
          <div className="md:w-[80px]">
            <DefaultButton>Buscar</DefaultButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchUserInput;
