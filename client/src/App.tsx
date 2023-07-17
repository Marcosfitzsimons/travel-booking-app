import { ReactElement, useContext } from "react";
import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment-timezone";
import "moment/locale/es";
moment.locale("es"); // Set the default locale to Spanish
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
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import PhoneVerify from "./pages/PhoneVerify";

type Props = {
  children: ReactElement;
};

function App() {
  const [isUserInfo, setIsUserInfo] = useState(true);

  const location = useLocation();

  const ProtectedRoute = ({ children }: Props) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <div className="">
        <Header setIsUserInfo={setIsUserInfo} />
        <main className="pt-20 w-[min(95%,1200px)] mx-auto py-2">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/phone/verify" element={<PhoneVerify />} />
              <Route path="/" element={<Home />} />
              <Route path="/viajes" element={<Trips />} />
              <Route
                path="/payment-success/:userid/:tripid"
                element={<PaymentSuccess setIsUserInfo={setIsUserInfo} />}
              />
              <Route
                path="/payment-failure"
                element={<PaymentFailure setIsUserInfo={setIsUserInfo} />}
              />
              <Route
                path="/viajes/:id"
                element={
                  <ProtectedRoute>
                    <Trip setIsUserInfo={setIsUserInfo} />
                  </ProtectedRoute>
                }
              />
              <Route path="/nosotros" element={<AboutUs />} />
              <Route
                path="/mi-perfil"
                element={
                  <ProtectedRoute>
                    <Profile
                      isUserInfo={isUserInfo}
                      setIsUserInfo={setIsUserInfo}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mi-perfil/editar-perfil"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <Toaster />
      </div>
    </SkeletonTheme>
  );
}

export default App;
