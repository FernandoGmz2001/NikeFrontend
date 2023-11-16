import styles from "./Featured.module.css";
import { Link } from "react-router-dom";

function Featured() {
  return (
    <div className={styles.featured}>
      <picture className={styles.featured__picture}>
        <img src="/images/homePage/featured.png" alt="" />
      </picture>
      <div className={styles.featured__content}>
        <h1>CORRER DEBE DE SENTIRSE BIEN</h1>
        <p>Todos deberian saber que se siente correr con el par correcto</p>
        <Link to='/products'>
          <button className={styles.featured__tenis}>Encuentra tu tenis</button>
        </Link>
      </div>
    </div>
  );
}

export default Featured;
