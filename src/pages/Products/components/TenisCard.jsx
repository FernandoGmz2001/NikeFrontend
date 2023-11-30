import styles from "./TenisCard.module.css";
function TenisCard({img, name, price}) {
  return (
    <div className={styles.tenis__card}>
      <img src={img} alt="tenis__image" />
      <p className={styles.tenis__status}>Just In</p>
      <p className={styles.tenis__name}>{name}</p>
      <p className={styles.tenis__gender}>Men</p>
      <p className={styles.tenis__price}>$ {price}</p>
    </div>
  );
}

export default TenisCard;
