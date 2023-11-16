import Navbar from "../../components/Navbar/Navbar";
import styles from "./Products.module.css";
import TenisCard from "./components/TenisCard";
function Products() {
  return (
    <>
      <div className="wrapper">
        <Navbar />
      </div>
      <div className="wrapper">
        <div className={styles.products__grid}>
          <TenisCard />
          <TenisCard />
          <TenisCard />
        </div>
      </div>
    </>
  );
}

export default Products;
