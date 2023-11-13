import styles from "./Featured.module.css";
function Featured() {
  return (
    <div className={styles.featured}>
      <picture className={styles.featured__picture}>
        <img src="/images/homePage/featured.png" alt="" />
      </picture>
      <div className={styles.featured__content}>
        <h1>CORRER DEBE DE SENTIRSE BIEN</h1>
        <p>Todos deberian saber que se siente correr con el par correcto</p>
        <button className={styles.featured__tenis}>Encuentra tu zapato</button>
      </div>
    </div>
  );
}

export default Featured;
