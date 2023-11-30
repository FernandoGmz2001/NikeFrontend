import style from "./TenisCard.module.css";
import propTypes from "prop-types";

function TenisCard({ cardTitle, cardPrice, cardImage }) {
  return (
    <div className={style.tenisCard}>
      <img
        src={cardImage}
        className={style.tenisCard__image}
        width={350}
        height={350}
        alt=""
      />
      <div className={style.tenisCard__content}>
        <div className={style.tenisCard__left}>
          <p className={style.tenisCard__title}>{cardTitle}</p>
          <p className={style.tenisCard__category}>Men</p>
        </div>
        <div className={style.tenisCard__right}>
          <p>{cardPrice}</p>
        </div>
      </div>
    </div>
  );
}

TenisCard.propTypes = {
  cardTitle: propTypes.string,
  cardPrice: propTypes.number,
  cardImage: propTypes.string,
};
export default TenisCard;
