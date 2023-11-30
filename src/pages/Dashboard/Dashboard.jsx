import Products from "./components/Products/Products";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbar from "./components/Toolbar/Toolbar";
import styles from "./Dashboard.module.css";
import { useState } from 'react';


function Dashboard() {
  const [activeItem, setActiveItem] = useState('Productos')

  const handleItemClick = (item) => {
    setActiveItem(item)
  };
  return (
    <div className={styles.dashboard}>
       {/* <div className={styles.backgroundImage}></div> */}
      <div className={styles.sidebar}>
        <Sidebar onItemClick={handleItemClick}/>
      </div>
      <main className={styles.main__container}>
        <div className={styles.toolbar}>
          <Toolbar/>
        </div>
        <div className={styles.products}>
          {
            activeItem === 'Productos' ? <Products/> : <h1>Ordenes</h1>
          }
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
