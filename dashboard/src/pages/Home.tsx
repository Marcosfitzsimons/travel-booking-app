import Featured from "../components/Featured";
import Table from "../components/Table";
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
        <h3>Ultimos movimientos</h3>
        <Table />
      </article>
    </section>
  );
};

export default Home;
