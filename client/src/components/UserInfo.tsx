import { Crop, Fingerprint, Mail, Milestone, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./DefaultButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import DataBox from "./DataBox";
import { UserData } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface UserInfoProps {
  userData: UserData;
}

const UserInfo = ({ userData }: UserInfoProps) => {
  const [isPersonalData, setIsPersonalData] = useState(false);
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate("/mi-perfil/editar-perfil");
  };

  return (
    <div className="w-full mt-3 mb-16 bg-transparent flex flex-col gap-5">
      <div className="w-full relative flex flex-col items-center gap-5 md:w-11/12 md:mx-auto">
        <Avatar className="w-24 h-24">
          <AvatarImage
            className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
            src={userData?.image}
            alt="avatar"
          />
          <AvatarFallback>
            <User className="w-12 h-12" />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center">
          <h3 className="font-medium text-xl dark:text-white ">
            {userData?.fullName}
          </h3>
          <h4 className="text-[#737373] dark:text-slate-500">
            @{userData?.username}
          </h4>
        </div>

        <Tabs defaultValue="personal" className="w-full max-w-[25rem] ">
          <TabsList className="grid w-full grid-cols-2 rounded-full p-1 bg-slate-100 dark:bg-border">
            <TabsTrigger value="personal" className="rounded-full ">
              Datos personales
            </TabsTrigger>
            <TabsTrigger value="addresses" className="rounded-full">
              Domicilios
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="max-w-sm mx-auto">
            <ul className="flex flex-col w-full gap-1">
              <DataBox
                icon={<Mail className="h-5 w-5 text-accent shrink-0 " />}
                text="Email"
              >
                {userData?.email}
              </DataBox>
              <DataBox
                icon={<Phone className="h-5 w-5 text-accent shrink-0 " />}
                text="Celular"
              >
                {userData?.phone}
              </DataBox>
              <DataBox
                icon={<Fingerprint className="h-5 w-5 text-accent shrink-0 " />}
                text="DNI"
              >
                {userData?.dni}
              </DataBox>
            </ul>
          </TabsContent>
          <TabsContent value="addresses" className="max-w-sm mx-auto">
            <div className="flex flex-col w-full gap-1">
              <h6 className="font-serif text-accent">Carmen de Areco</h6>

              <ul className="flex flex-col gap-1 lg:basis-[55%]">
                <DataBox
                  icon={<Milestone className="h-5 w-5 text-accent shrink-0 " />}
                  text="Dirreción"
                >
                  {`${userData?.addressCda.street} ${userData?.addressCda.streetNumber}`}
                </DataBox>
                <DataBox
                  icon={<Crop className="h-5 w-5 text-accent shrink-0 " />}
                  text="Calles que cruzan"
                >
                  {userData?.addressCda.crossStreets}
                </DataBox>
              </ul>

              <div className="flex-col gap-1 lg:basis-[50%]">
                <h6 className="font-serif text-accent">Capital Federal</h6>

                <ul className="w-full ">
                  <DataBox
                    icon={
                      <Milestone className="h-5 w-5 text-accent shrink-0 " />
                    }
                    text="Dirreción"
                  >
                    {userData?.addressCapital}
                  </DataBox>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="w-full max-w-sm lg:w-[10rem]" onClick={goToEditProfile}>
          <DefaultButton>Editar perfil</DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
