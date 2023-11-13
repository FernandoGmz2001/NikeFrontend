import styles from "./NewArrivals.module.css";
import TenisCard from "./components/TenisCard";

function NewArrivals() {
  return (
    <div className={styles.newArrivals}>
      <div className={styles.newArrivals__title}>
        <h3>Lo mejor de airmax</h3>
      </div>
      <div className={styles.newArrivals__grid}>
        <TenisCard cardImage="/public/images/homePage/nike air max pulse.png" cardTitle="Nike Air Max Pulse" cardPrice="$12,999"/>
        <TenisCard cardImage="/public/images/homePage/nike air max 97 SE.png" cardTitle="Nike Air Max 97 SE" cardPrice="$11,999"/>
        <TenisCard cardImage="/public/images/homePage/nike air max SC.png" cardTitle="Nike Air Max SC" cardPrice="$15,999"/>
      </div>
    </div>
  );
}

export default NewArrivals;
