import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import Logo from "../components/Logo";
import DefaultButton from "../components/DefaultButton";

const Login = () => {
  const [credentials, setCredentials] = useState({
    emailOrUsername: undefined,
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
    <section className="section flex flex-col items-center lg:flex-row lg:justify-around lg:gap-20">
      <Separator
        orientation="vertical"
        className="h-52 bg-gradient-to-t from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12] lg:hidden"
      />
      <div className="">
        <h2 className="text-3xl py-2 font-medium text-center lg:text-start lg:px-3 dark:text-white">
          Entra a tu cuenta
        </h2>
        <p className="text-center lg:text-start lg:px-3">
          Una vez dentro de tu cuenta vas a poder reservar tu lugar.
        </p>
        <form
          onSubmit={handleOnSubmit}
          className="relative w-full mt-6 p-3 py-6 flex flex-col gap-5 items-center"
        >
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="emailOrUsername">Email o nombre de usuario</Label>
            <Input
              onChange={handleOnChange}
              type="text"
              id="emailOrUsername"
              placeholder="example@correo.com"
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              onChange={handleOnChange}
              type="password"
              id="password"
              placeholder="Tu contraseña"
            />
          </div>
          <DefaultButton>Entrar</DefaultButton>
          {error && <span>{error.message}</span>}
          <p className="lg:self-start">
            ¿No tenes cuenta?{" "}
            <Link to="/register" className="font-medium text-blue-lagoon-500">
              Crear una cuenta nueva
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-6">
        <Separator
          orientation="vertical"
          className="h-80 bg-gradient-to-t from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12]"
        />
        <Logo />
        <Separator
          orientation="vertical"
          className="h-80 bg-gradient-to-b from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12]"
        />
      </div>

      <Separator
        orientation="vertical"
        className="h-52 bg-gradient-to-b from-neutral-800 to-blue-lagoon-50 dark:from-blue-lagoon-200 dark:to-[#0d0f12] lg:hidden"
      />
    </section>
  );
};

export default Login;
