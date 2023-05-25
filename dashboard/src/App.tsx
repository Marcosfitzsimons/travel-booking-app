import { useContext, ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Login from "./pages/Login";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Publications from "./pages/Publications";
import NewTrip from "./pages/NewTrip";
import NewUser from "./pages/NewUser";
import SingleUser from "./pages/SingleUser";
import List from "./pages/List";
import { AuthContext } from "./context/AuthContext";
import { publicationInputs, tripInputs, userInputs } from "./formSource";
import {
  tripColumns,
  userColumns,
  specialTripColumns,
} from "./datatablesource";
import SingleTrip from "./pages/SingleTrip";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import SinglePassenger from "./pages/SinglePassenger";
import NewPassenger from "./pages/NewPassenger";
import SinglePublication from "./pages/SinglePublication";
import NewPublication from "./pages/NewPublication";
import NewSpecialTrip from "./pages/NewSpecialTrip";
import SingleSpecialTrip from "./pages/SingleSpecialTrip";

type Props = {
  children: ReactElement;
};

function App() {
  const ProtectedRoute = ({ children }: Props) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App flex w-[min(90%,1300px)] mx-auto">
      <SideBar />
      <div className="flex-[6] w-[min(100%,1000px)]">
        <Header />
        <main className="pt-6 py-2">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List
                      columns={tripColumns}
                      title="Viajes semanales"
                      linkText="Agregar viaje"
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List
                      columns={tripColumns}
                      title="Viajes semanales"
                      linkText="Agregar viaje"
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="users">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List
                        columns={userColumns}
                        title="Usuarios"
                        linkText="Agregar usuario"
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <SingleUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewUser
                        inputs={userInputs}
                        title="Crear usuario nuevo"
                      />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="trips">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List
                        columns={tripColumns}
                        title="Viajes semanales"
                        linkText="Agregar viaje"
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <SingleTrip />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewTrip inputs={tripInputs} title="Crear viaje" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="special-trips">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List
                        columns={specialTripColumns}
                        title="Viajes particulares"
                        linkText="Agregar viaje"
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <SingleSpecialTrip />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewTrip inputs={tripInputs} title="Crear viaje" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="passengers">
                <Route
                  path=":userId/:tripId"
                  element={
                    <ProtectedRoute>
                      <SinglePassenger />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="newPassenger/:id"
                  element={
                    <ProtectedRoute>
                      <NewPassenger
                        title="Agregar pasajero"
                        columns={userColumns}
                      />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="publications">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Publications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <SinglePublication />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewPublication
                        inputs={publicationInputs}
                        title="Crear publicación"
                      />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="/mi-perfil"
                element={
                  <ProtectedRoute>
                    <Profile />
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
            </Route>
          </Routes>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
