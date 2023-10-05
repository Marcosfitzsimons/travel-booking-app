import { useEffect, useState } from "react";

type CountdownTimerProps = {
  date: string;
  departureTime: string;
  isTripStarted?: boolean;
};

const CountdownTimer = ({
  isTripStarted,
  date,
  departureTime,
}: CountdownTimerProps) => {
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
    <div
      className={`${
        remainingTime ? "-top-[5px] group-hover:-top-[23px]" : "top-0"
      } absolute -z-10 transition-all min-w-[120px] text-xs text-white right-2 pt-[3px] bg-orange-600 rounded-t-md px-2 h-10 lg:right-4 dark:bg-orange-700`}
    >
      {isTripStarted ? (
        <p className="font-bold uppercase">Estamos en camino :)</p>
      ) : (
        <>
          <span className="font-bold uppercase">sale en: </span>
          <span>{remainingTime ? remainingTime : "..."}</span>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
