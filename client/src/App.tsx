import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Trip from "./pages/Trip";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";

function App() {
  return (
    <div className="">
      <Header />
      <main className="pt-20 w-[min(90%,1200px)] mx-auto py-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viajes" element={<Trips />} />
          <Route path="/viajes/:id" element={<Trip />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mi-perfil" element={<Profile />} />
          <Route path="/mi-perfil/editar-perfil" element={<EditProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
