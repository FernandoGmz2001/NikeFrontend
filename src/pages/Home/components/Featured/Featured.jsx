import styles from "./Featured.module.css";
import { Link } from "react-router-dom";

function Featured() {
  return (
    <div className={styles.featured}>
      <picture className={styles.featured__picture}>
        <img src="/public/images/homePage/Nike airmax pulse hero.png" alt="hero image" />
      </picture>
      <div className={styles.featured__content}>
        <h1>STEP INTO WHAT FEELS GOOD</h1>
        <p>Cause everyone should know the feeling of running in that perfect pair.</p>
        <Link to='/products'>
          <button className={styles.featured__tenis}>Find Your Shoe</button>
        </Link>
      </div>
    </div>
  );
}

export default Featured;
