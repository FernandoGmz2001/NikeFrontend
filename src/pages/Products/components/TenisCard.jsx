import styles from "./TenisCard.module.css";
function TenisCard() {
  return (
    <div className={styles.tenis__card}>
      <img src="/public/images/Products page/tenis.png" alt="tenis" />
      <p className={styles.tenis__status}>Recien llegados</p>
      <p className={styles.tenis__name}>Nike Air Force 1 PLT.AF.ORM</p>
      <p className={styles.tenis__price}>$1999,99</p>
    </div>
  );
}

export default TenisCard;
