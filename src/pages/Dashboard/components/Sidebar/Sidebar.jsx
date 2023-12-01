import { Link,useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import styles from "./Sidebar.module.css";
function Sidebar({ onItemClick }) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    onItemClick(event.target.innerText);
  };

  const handleGoBack = () => {
    navigate(-1); // Utiliza la función goBack() para regresar a la página anterior
  };

  return (
    <div className={styles.sidebar}>
      <header className={styles.sidebar__header}>
        <FaArrowLeft color='white' size={30} className='cursor-pointer' onClick={handleGoBack}/>
      </header>
      <section className={styles.sidebar__content}>
        <ul className={styles.sidebar__menu}>
          <li className={styles.menu__item} onClick={handleClick}>Productos</li>
          <li className={styles.menu__item} onClick={handleClick}>Ordenes</li>
        </ul>
      </section>
    </div>
  );
}
export default Sidebar;
