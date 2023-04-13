import { useContext, ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NewTrip from "./pages/NewTrip";
import NewUser from "./pages/NewUser";
import SingleUser from "./pages/SingleUser";
import List from "./pages/List";
import { AuthContext } from "./context/AuthContext";
import { passengerInputs, tripInputs, userInputs } from "./formSource";
import { passengerColumns, tripColumns, userColumns } from "./datatablesource";
import SingleTrip from "./pages/SingleTrip";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

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
    <div className="App flex w-[min(90%,1400px)] mx-auto">
      <SideBar />
      <div className="flex-[6]">
        <Header />
        <main className="pt-6 w-[min(100%,1200px)] mx-auto py-2">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
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
                        linkText="Crear usuario"
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
                        title="Viajes"
                        linkText="Crear viaje"
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
                      <NewTrip inputs={tripInputs} title="Crear viaje nuevo" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="passengers">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List
                        title="Pasajeros"
                        columns={passengerColumns}
                        linkText="Crear pasajero"
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
                        inputs={passengerInputs}
                        title="Crear pasajero nuevo"
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
