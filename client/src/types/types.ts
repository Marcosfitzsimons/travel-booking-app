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

export type LoginUser = {
    emailOrUsername: String;
    password: String;
  };