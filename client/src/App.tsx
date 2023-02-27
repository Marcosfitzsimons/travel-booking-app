import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Trip from "./pages/Trip";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div className="">
      <Header />
      <main className="pt-20 w-[min(90%,1200px)] mx-auto py-2">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viajes" element={<Trips />} />
            <Route path="/viajes/:id" element={<Trip />} />
            <Route path="/mi-perfil" element={<Profile />} />
            <Route path="/mi-perfil/editar-perfil" element={<EditProfile />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
