export type AccountStatusProps = {
    children: React.ReactNode;
    isActive: boolean;
}

export type DataBoxProps = {
  icon: any;
  text: string;
  children: React.ReactNode;
};

export type PublicationProps = {
    _id?: string;
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;
    createdAt: string;
}

export type TripProps = {
    _id: number;
    name: string;
    date: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    maxCapacity: number;
    price: number;
    available: boolean;
    passengers: any[];
  }

  export type MyTripCardProps = {
    _id: number | number;
    name: string;
    date: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    maxCapacity: number;
    price: number;
    available: boolean;
    handleDelete: (e: any) => void;
  };
