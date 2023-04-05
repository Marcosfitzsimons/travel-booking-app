import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Trip from "./pages/Trip";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Users from "./pages/Users";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import NewTrip from "./pages/NewTrip";

function App() {
  return (
    <div className="App flex">
      <SideBar />
      <div className="flex-[6]">
        <Header />
        <main className="pt-6 w-[min(90%,1200px)] mx-auto py-2">
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="usuarios">
                <Route index element={<Users />} />
                <Route path=":id" element={<User />} />
                <Route path="usuario-nuevo" element={<NewUser />} />
              </Route>
              <Route path="viajes">
                <Route index element={<Trips />} />
                <Route path=":id" element={<Trip />} />
                <Route path="viaje-nuevo" element={<NewTrip />} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
