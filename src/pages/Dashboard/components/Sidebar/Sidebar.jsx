import { Link } from 'react-router-dom'
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <header className={styles.sidebar__header}>
        <Link to='/'>
        <img
          src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Nike-1.png"
          alt="nike-logo"
          width={100}
          height={50}
        />
        </Link>
      </header>
      <section className={styles.sidebar__content}>
        <ul className={styles.sidebar__menu}>
          <li className={styles.menu__item}>Productos</li>
        </ul>
      </section>
    </div>
  );
}
export default Sidebar;
