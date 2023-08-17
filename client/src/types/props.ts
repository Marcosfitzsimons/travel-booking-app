export type AccountStatusProps = {
    children: React.ReactNode;
    isActive: boolean;
}

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
    image?: string;
    price: number;
    available: boolean;
    passengers: any[];
  }

  export type ProfileProps = {
    setIsUserInfo: (value: boolean) => void;
  };