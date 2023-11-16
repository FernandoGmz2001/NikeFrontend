import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Login.module.css";
import { Input } from "@nextui-org/react";
function Login() {
  return (
    <div className={styles.login}>
      <div className="wrapper">
        <Navbar />
      </div>
      <div className={styles.login__form}>
        <div className={styles.login__header}>
            <img src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Nike-1.png" alt="nike-logo"/> 
          <h1>YOUR ACCOUNT FOR EVERYTHING NIKE</h1>
        </div>
        <form action="" className={styles.form}>
          <Input size="sm" type="email" label="Email" />
          <Input
            size="sm"
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
        </form>
        <button className={styles.btnLogin}>Iniciar sesion</button>
        <p>No eres un miembro? <a href="/register">Regístrate aquí</a></p>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
