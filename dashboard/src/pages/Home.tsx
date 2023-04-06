import Featured from "../components/Featured";
import List from "../components/List";
import Widget from "../components/Widget";

const Home = () => {
  return (
    <section>
      <div className="flex flex-col gap-5 lg:flex-row">
        <Widget type="user" />
        <Widget type="trip" />
        <Widget type="earning" />
      </div>
      <div className="my-6 w-full flex justify-center items-center">
        <Featured />
      </div>
      <article className="p-5 border">
        <h3 className="font-bold text-blue-lagoon-800/30 mb-4">
          Ultimos movimientos
        </h3>
        <List />
      </article>
    </section>
  );
};

export default Home;
