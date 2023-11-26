import React, {  useState } from "react";
import { Navigate } from "react-router-dom";
import LoginRegister from "../../components/LoginRegister/LoginRegister";
import styles from '../../components/LoginRegister/LoginRegister.module.css'
import { Input } from "@nextui-org/react";
import { ToastContainer,toast } from "react-toastify";
import { UserContext } from "../../context/UsernameContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const errorLogin = () =>
    toast("Usuario o contraseña incorrectas", { type: "error" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
        localStorage.setItem("username", data.email);
        setRedirect(true);
        if(data.userId == 3){
          localStorage.setItem("token", data.token);
        }
        return;
      }

      errorLogin();
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      errorLogin();
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <LoginRegister bottom_url={'No tienes cuenta?'} toLink={'Regístrate aquí'} link={'/register'}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          size="sm"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          size="sm"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.btnLogin} onClick={handleSubmit}>
          Iniciar sesión
        </button>
      </form>
      <ToastContainer />
    </LoginRegister>
  );
}

export default Login;
