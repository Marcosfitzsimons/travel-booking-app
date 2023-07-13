import { useEffect, useState } from "react";

type CountdownTimerProps = {
  date: string;
  departureTime: string;
};

const CountdownTimer = ({ date, departureTime }: CountdownTimerProps) => {
  const [remainingTime, setRemainingTime] = useState("");

  const combinedDateTime = `${date.split("T")[0]}T${departureTime}`;

  useEffect(() => {
    const calculateTimeDifference = () => {
      const targetDateTime = new Date(combinedDateTime); // Convert the date string to a Date object

      // Calculate the time difference in milliseconds between the target time and the current time
      const timeDifference = targetDateTime.getTime() - new Date().getTime();

      if (timeDifference > 0) {
        // Convert the time difference to hours, minutes, and seconds
        const hours = Math.floor(timeDifference / 3600000);
        const minutes = Math.floor((timeDifference % 3600000) / 60000);
        const seconds = Math.floor((timeDifference % 60000) / 1000);

        // Format the remaining time as HH:MM:SS
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        setRemainingTime(formattedTime);
      } else {
        setRemainingTime("Timer expired");
      }
    };

    const timer = setInterval(calculateTimeDifference, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [combinedDateTime]);

  return (
    <p className="text-xs">
      <span className="font-bold uppercase">sale en: </span>
      <span>{remainingTime}</span>
    </p>
  );
};

export default CountdownTimer;
