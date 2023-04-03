import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Trip from "./pages/Trip";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "./components/ui/toaster";
import AboutUs from "./pages/AboutUs";

function App() {
  const [isUserInfo, setIsUserInfo] = useState(true);

  const location = useLocation();

  return (
    <div className="">
      <Header setIsUserInfo={setIsUserInfo} />
      <main className="pt-20 w-[min(90%,1000px)] mx-auto py-2">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/viajes" element={<Trips />} />
            <Route
              path="/viajes/:id"
              element={<Trip setIsUserInfo={setIsUserInfo} />}
            />
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/mi-perfil"
              element={
                <Profile
                  isUserInfo={isUserInfo}
                  setIsUserInfo={setIsUserInfo}
                />
              }
            />
            <Route path="/mi-perfil/editar-perfil" element={<EditProfile />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
