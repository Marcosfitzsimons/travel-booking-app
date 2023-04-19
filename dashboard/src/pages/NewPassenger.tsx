import BackButton from "../components/BackButton";
import SectionTitle from "../components/SectionTitle";

type NewPassengerProps = {
  title: string;
};

const NewPassenger = ({ title }: NewPassengerProps) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionTitle>{title}</SectionTitle>
      <div className="self-start mb-2">
        <BackButton linkTo="/users" />
      </div>
      <div className="p-5 rounded-md bg-white/40 border border-blue-lagoon-500/20 shadow-md dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-black">
        {/* 
            Show a list of users 
            with a search bar to search by Username or Email and when an User is selected,
            add it to the trip passengers array. 
            [ -CREATE NEW PASSENGER WITH THE USER INFORMATION. ]
            [ -ADD TRIP TO USER MYTRIPS ARRAY. ]
        */}
      </div>
    </section>
  );
};

export default NewPassenger;
