import { Link } from 'react-router-dom'
import styles from "./Sidebar.module.css";
function Sidebar({ onItemClick }) {
  const handleClick = (event) => {
    onItemClick(event.target.innerText);
  };
  return (
    <div className={styles.sidebar}>
      <header className={styles.sidebar__header}>
        <Link to='/'>
        <img
          src="https://pngimg.com/uploads/nike/nike_PNG7.png"
          alt="nike-logo"
          width={100}
          height={50}
        />
        </Link>
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
