import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import SectionTitle from "../components/SectionTitle";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "../hooks/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useForm } from "react-hook-form";
import DefaultButton from "../components/DefaultButton";
import { Button } from "../components/ui/button";
import Loading from "../components/Loading";
import UserInfo from "../components/UserInfo";

type TripProps = {
  id: string;
  name: string;
  date: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  maxCapacity: number;
  price: number;
  available: boolean;
};

type addressCda = {
  street: string;
  streetNumber: number | undefined;
  crossStreets: string;
};

type UserData = {
  _id: string;
  fullName: string;
  username: string;
  addressCda: addressCda;
  addressCapital: string;
  dni: number | undefined;
  phone: undefined | number;
  email: string;
  image?: string;
};

const INITIAL_STATES = {
  _id: "",
  username: "",
  fullName: "",
  addressCda: {
    street: "",
    streetNumber: undefined,
    crossStreets: "",
  },
  addressCapital: "",
  phone: undefined,
  dni: undefined,
  email: "",
  image: "",
};

const SinglePassenger = () => {
  const [data, setData] = useState(INITIAL_STATES);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | string>("");
  const [err, setErr] = useState<any>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      phone: undefined,
      dni: undefined,
      image: "",
      addressCda: "",
      addressCapital: "",
    },
  });

  let { userId, tripId } = useParams();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleOnSubmit = async (data: UserData) => {
    setLoading(true);

    const imgData = new FormData();
    imgData.append("file", image);
    imgData.append("upload_preset", "upload");

    try {
      if (!image) {
        const res = await axios.put(
          `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
          { data },
          { headers }
        );
        setLoading(false);
        toast({
          description: "Cambios guardados con exito.",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dioqjddko/image/upload",
          imgData
        );
        const { url } = uploadRes.data;
        const res = await axios.put(
          `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
          { ...data, image: url },
          { headers }
        );
        setLoading(false);
        toast({
          description: "Cambios guardados con exito.",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setLoading(false);
      setErr(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al guardar los cambios, intentar mas tarde.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
          {
            headers,
          }
        );
        setData(res.data.passenger.createdBy);
        const userData = res.data.passenger.createdBy;
        reset({
          username: userData.username,
          email: userData.email,
          fullName: userData.fullName,
          phone: userData.phone,
          dni: userData.dni,
          addressCda: userData.addressCda,
          addressCapital: userData.addressCapital,
          image: userData.image ? userData.image : "",
        });
      } catch (err: any) {
        setErr(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col gap-3">
      <SectionTitle>Información del pasajero:</SectionTitle>
      <p className="text-red-600 font-medium">
        {`<- Fix update passenger functionality ->`}
      </p>
      <div className="self-start mb-2">
        <BackButton linkTo={`/trips/${tripId}`} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col items-center">
          <UserInfo userData={data} />
          <div className="my-4 px-2 w-full max-w-sm lg:w-[10rem] lg:self-center">
            <DefaultButton>Editar</DefaultButton>
          </div>
        </div>
      )}
    </section>
  );
};

export default SinglePassenger;
