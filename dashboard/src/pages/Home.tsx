import Featured from "../components/Featured";
import List from "../components/List";
import Widget from "../components/Widget";

const Home = () => {
  return (
    <section>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Widget type="user" />
        <Widget type="trip" />
      </div>
      <article className="my-5 p-5 rounded-md shadow-md bg-white/80 border border-blue-lagoon-500/20 dark:bg-black dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300">
        <h3 className="font-bold text-blue-lagoon-600 mb-4 dark:text-blue-lagoon-300">
          Ultimos movimientos
        </h3>
        <List />
      </article>
    </section>
  );
};

export default Home;
