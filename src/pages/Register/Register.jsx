import LoginRegister from '../../components/LoginRegister/LoginRegister'
import { useState } from "react";
import { Input } from "@nextui-org/react";
import styles from "./Register.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [redirect, setRedirect] = useState(false);
  

  const successRegistration = () => toast("Usuario creado exitosamente");
  const errorRegistration = () => toast("El usuario ya existe",{type: "error"});

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      fetch('http://127.0.0.1:5000/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'password': password,
          'username': username, 
        })
      }).then(res => res.json())
      setRedirect(true);
      // successRegistration()
    }catch(err){
      errorRegistration()
      throw new Error(err)
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <LoginRegister bottom_url={'Ya tienes cuenta?'} toLink={'Inicia sesion'} link={'/login'}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <Input
          size="sm"
          type="email"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          Regístrate
        </button>
      </form>
      <ToastContainer />
    </LoginRegister>
  );
}

export default Register;
