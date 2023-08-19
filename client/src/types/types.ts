import { TripProps } from "./props";

export type addressCda = {
    street: string;
    streetNumber: any;
    crossStreets: string;
  };

export type User = {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    phone: number;
    image?: string;
    isReminder: boolean;
    addressCda: addressCda;
    addressCapital: string;
    dni: number;
    password: string;
    status: "Pending" | "Active";
    myTrips: [];
};

export  type UserAddresses = {
    addressCda: addressCda;
    addressCapital: string;
};

export type LoginUserInputs = {
    emailOrUsername: String;
    password: String;
  };

export type UserInputs = {
  username: string;
  fullName: string;
  email: string;
  phone: number | null;
  dni: number | null;
  image?: string;
  addressCda: addressCda;
  addressCapital: string;
  password: string;
  cpassword: string;
};

export type Publication = {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  createdAt: string;
};

export type UserData = {
  _id: string;
  fullName: string;
  username: string;
  addressCda: addressCda;
  addressCapital: string;
  dni: number | undefined;
  phone: undefined | number;
  email: string;
  image?: string;
  myTrips: TripProps[];
  isReminder: boolean;
};