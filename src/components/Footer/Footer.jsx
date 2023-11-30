import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__column}>
        <p>fernandogmz2001@gmail.com</p>
        <p>867 738 7388</p>
        <p>Instituto Tecnologico de Nuevo Laredo</p>
      </div>
      <div className={`${styles.footer__column} ${styles.footer__socials}`}>
        <a href="https://www.facebook.com/bryantfgo/">
          <FaFacebookF color="white" />
        </a>
        <a href="https://www.instagram.com/fernandogomez1941/">
          <FaInstagram color="white" />
        </a>
        <a href="https://www.linkedin.com/in/fernando-gomez-387998204/">
        <FaLinkedin color="white"/>
        </a>
      </div>
      <div className={styles.footer__column}>
        <p>Todos los derechos reservados © 2023 ZT Studios.</p>
      </div>
    </div>
  );
}

export default Footer;
