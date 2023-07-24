import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

// adapt this component to my project endpoint and check if all works together.
const ForgotPassword = () => {
  const { id, token } = useParams();

  const history = useNavigate();

  const [data, setData] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const { toast } = useToast();

  const userValid = async () => {
    try {
      const res = await axios.get(
        `https://fabebus-api-example.onrender.com/api/auth/forgotpassword/${id}/${token}`
      );
      console.log(res);
      console.log("uservalid");
    } catch (err) {
      console.log(err);
      // history("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === "") {
      toast({
        variant: "destructive",
        description: "Contraseña es requerida",
      });
    } else if (password.length < 6) {
      toast({
        variant: "destructive",
        description: "Contraseña no puede ser tan corta",
      });
    } else {
      try {
        const res = await axios.post(
          `https://fabebus-api-example.onrender.com/api/auth/changepassword/${id}/${token}`,
          {
            password: password,
          }
        );
        console.log(res);
        setPassword("");
        setMessage(true);
      } catch (err) {
        console.log(err);
        toast({
          variant: "destructive",
          description: "Tu link ha expirado. Debes enviar uno nuevo",
        });
      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {data ? (
        <section>
          <div className="form_data">
            <div className="form_heading">
              <h1>Escribí tu contraseña nueva</h1>
            </div>

            <form onSubmit={handleSubmit}>
              {message ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Contraseña ha sido actualizada con éxito.{" "}
                </p>
              ) : (
                ""
              )}
              <div className="form_input">
                <Label htmlFor="password">Contraseña nueva</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="Enter Your new password"
                />
              </div>

              <Button>Send</Button>
            </form>
            <p>
              <Link to="/">Home</Link>
            </p>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ForgotPassword;
