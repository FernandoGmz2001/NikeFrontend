import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./LoginRegister.module.css";

function Login({ bottom_url, children,link,toLink }) {
  return (
    <div className={styles.login}>
        {/* <Navbar /> */}
      <div className={styles.login__form}>
        <div className={styles.login__header}>
          <img
            src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Nike-1.png"
            alt="nike-logo"
          />
          <h1>YOUR ACCOUNT FOR EVERYTHING NIKE</h1>
        </div>
        {children}
        <p>{bottom_url} <span><a href={link}>{toLink}</a></span></p>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
