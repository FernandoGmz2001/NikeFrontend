import styles from "./NewArrivals.module.css";
import TenisCard from "./components/TenisCard";

function NewArrivals() {
  return (
    <div className={styles.newArrivals}>
      <div className={styles.newArrivals__title}>
        <h3>RECIEN LLEGADOS</h3>
      </div>
      <div className={styles.newArrivals__grid}>
        <TenisCard cardImage="/images/nike savaleos.png" cardPrice="$1499.99" cardTitle="Nike Savaleos"/>
        <TenisCard />
        <TenisCard />
      </div>
    </div>
  );
}

export default NewArrivals;
