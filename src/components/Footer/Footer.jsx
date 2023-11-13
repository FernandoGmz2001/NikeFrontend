import styles from "./Footer.module.css";
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__column}>
        <p>Hola </p>
      </div>
      <div className={styles.footer__column}>
        <p>Como</p>
      </div>
      <div className={styles.footer__column}>
        <p>Estas</p>
      </div>
    </div>
  );
}

export default Footer;
