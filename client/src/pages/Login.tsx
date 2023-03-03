import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dispatch) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "http://localhost:8800/api/auth/login",
          credentials
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/viajes");
      } catch (err: any) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: err.response?.data,
        });
      }
    }
  };

  return (
    <section className="">
      <div className="">
        <h2 className="text-3xl font-medium text-center">Entra a tu cuenta</h2>
        <p>Una vez dentro vas a poder reservar tu lugar.</p>
        <form
          onSubmit={handleOnSubmit}
          className="relative w-10/12 max-w-2xl mx-auto mt-6 p-3 py-6 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center dark:bg-[#262626] dark:border-zinc-700"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              onChange={handleOnChange}
              type="text"
              id="username"
              placeholder="@yourusername"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              onChange={handleOnChange}
              type="password"
              id="password"
              placeholder="Tu contraseña"
            />
          </div>
          <Button disabled={loading} className="">
            Entrar
          </Button>
          {error && <span>{error.message}</span>}
        </form>
      </div>
    </section>
  );
};

export default Login;
