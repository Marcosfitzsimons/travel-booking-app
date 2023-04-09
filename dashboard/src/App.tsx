import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import New from "./pages/New";
import Single from "./pages/Single";
import List from "./pages/List";
import { tripInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App flex">
      <SideBar />
      <div className="flex-[6]">
        <Header />
        <main className="pt-6 w-[min(90%,1200px)] mx-auto py-2">
          <Routes>
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
              <Route path="usuarios">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="usuario-nuevo"
                  element={
                    <ProtectedRoute>
                      <New inputs={userInputs} title="Crear usuario nuevo" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="viajes">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="viaje-nuevo"
                  element={
                    <ProtectedRoute>
                      <New inputs={tripInputs} title="Crear viaje nuevo" />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="pasajeros">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="viaje-nuevo"
                  element={
                    <ProtectedRoute>
                      <New />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
