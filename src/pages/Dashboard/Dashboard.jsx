import Products from "./components/Products/Products";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbar from "./components/Toolbar/Toolbar";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
       <div className={styles.backgroundImage}></div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <main className={styles.main__container}>
        <div className={styles.toolbar}>
          <Toolbar/>
        </div>
        <div className={styles.products}>
          <Products />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
