import { MoreVertical } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <article className="w-full max-w-lg p-5 border">
      <div className="flex items-center justify-between">
        <h3>Ingresos totales</h3>
        <MoreVertical />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[10rem]">
          <CircularProgressbar
            value={70}
            text={"70%"}
            styles={buildStyles({
              rotation: 0.25,
              textSize: "16px",
              pathTransitionDuration: 0.5,
              // Colors
              pathColor: `#007287`,
              textColor: "#007287",
            })}
          />
        </div>
        <p>Total de dinero hecho hoy</p>
        <p>$420</p>
        <div className="">
          <p>
            Target <span>$12k</span>
          </p>
          <p>
            Last week <span>$12k</span>
          </p>
          <p>
            Last Month <span>$12k</span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default Featured;
