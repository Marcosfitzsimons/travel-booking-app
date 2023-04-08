import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import New from "./pages/New";
import Single from "./pages/Single";
import List from "./pages/List";
import { tripInputs, userInputs } from "./formSource";

function App() {
  /* Delete frmer motion */
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
                <Route index element={<List />} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="usuario-nuevo"
                  element={
                    <New inputs={userInputs} title="Crear usuario nuevo" />
                  }
                />
              </Route>
              <Route path="viajes">
                <Route index element={<List />} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="viaje-nuevo"
                  element={
                    <New inputs={tripInputs} title="Crear viaje nuevo" />
                  }
                />
              </Route>
              <Route path="pasajeros">
                <Route index element={<List />} />
                <Route path=":id" element={<Single />} />
                <Route path="viaje-nuevo" element={<New />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
