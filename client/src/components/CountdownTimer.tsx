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
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );

        let formattedTime = "";

        if (days > 0) {
          formattedTime += `${days}d `;
        }

        if (hours > 0 || days > 0) {
          formattedTime += `${hours}hr `;
        }

        formattedTime += `${minutes}min`;

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
