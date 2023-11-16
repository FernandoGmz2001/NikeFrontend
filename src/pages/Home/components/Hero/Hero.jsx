import styles from "./Hero.module.css";
function Hero() {
  return (
    <div className={styles.hero__container}>
      <div className={styles.hero__left}>
        <h1>NIKE DUNK LOW RETRO</h1>
        <button className={styles.shopNow}>Comprar</button>
      </div>
        <img
          src="/images/nike dunk low retro 2.png"
          alt=""
          className={styles.hero__image}
          width={1000}
        />
        <img src="/images/nike logo bg.png" className={styles.hero__bg} alt="" />
        <div className={styles.hero__sideLogo}>
          <h1>NIKE</h1>
        </div>
      </div>
  );
}

export default Hero;
