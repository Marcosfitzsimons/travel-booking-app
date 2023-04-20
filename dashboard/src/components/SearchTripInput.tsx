import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import DefaultButton from "./DefaultButton";

type SearchUserInputProps = {};
const SearchTripInput = ({ list, setFilteredList }: SearchUserInputProps) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1">
      <div className="flex flex-col gap-2">
        <Label>Buscar por nombre de usuario, email, o nombre:</Label>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <div className="">
            <Input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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

export default SearchTripInput;
