import style from "./TenisCard.module.css";
import propTypes from "prop-types";

function TenisCard({cardTitle,cardPrice,cardImage}) {
  return (
    <div className={style.tenisCard}>
      <div className={style.tenisCard__header}>
        {/* <h3>Nike Savaleos</h3> */}
        <h3>{cardTitle}</h3>
        <p>{cardPrice}</p>
        {/* <p>$1499.99</p> */}
      </div>
      {/* <img src="/images/nike savaleos.png" className={style.tenisCard__image} width={300} alt="" /> */}
      <img src={cardImage} className={style.tenisCard__image} width={300} alt="" />
    </div>
  );
}

TenisCard.propTypes = {
    cardTitle: propTypes.string,
    cardPrice: propTypes.string,
    cardImage: propTypes.string
}
export default TenisCard;
