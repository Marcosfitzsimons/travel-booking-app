import { ReactElement, useContext } from "react";
import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import Welcome from "./pages/Welcome";
import ForgotPassword from "./components/ForgotPassword";

type Props = {
  children: ReactElement;
};

function App() {
  const [isUserInfo, setIsUserInfo] = useState(true);

  const location = useLocation();

  const ProtectedRoute = ({ children }: Props) => {
    const { user } = useContext(AuthContext);
    if (!user || user.status != "Active") {
      return <Navigate to="/login" />;
    }
    return children;
  };

  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

  return (
    <div className="">
      <Header setIsUserInfo={setIsUserInfo} />
      <main className="pt-20 w-[min(95%,1200px)] mx-auto py-2">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm/:confirmationCode" element={<Welcome />} />
            <Route
              path="/forgotpassword/:id/:token"
              element={<ForgotPassword />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/viajes" element={<Trips />} />
            <Route
              path="/payment-success/:userid/:tripid"
              element={<PaymentSuccess setIsUserInfo={setIsUserInfo} />}
            />
            <Route path="/payment-failure" element={<PaymentFailure />} />
            <Route
              path="/viajes/:id"
              element={
                <ProtectedRoute>
                  <Trip setIsUserInfo={setIsUserInfo} />
                </ProtectedRoute>
              }
            />
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
  );
}

export default App;
