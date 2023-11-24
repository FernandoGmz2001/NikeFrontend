import LoginRegister from '../../components/LoginRegister/LoginRegister'
import { useState } from "react";
import { Input } from "@nextui-org/react";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    }).then(res => res.json())
    console.log("Email:", email);
    console.log("Password:", password);
  };

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
    </LoginRegister>
  );
}

export default Login;
