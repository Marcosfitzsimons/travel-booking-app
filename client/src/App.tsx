import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Trip from "./pages/Trip";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="">
      <Header />
      <main className="pt-20 w-[min(90%,1200px)] mx-auto py-2">
        <Home />
        <Trips />
        <Trip />
        <Profile />
      </main>
      <Footer />
    </div>
  );
}

export default App;
