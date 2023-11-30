import { useEffect, useState } from "react";
import styles from "./NewArrivals.module.css";
import TenisCard from "./components/TenisCard";
import { Route, Routes, useNavigate,Navigate  } from "react-router-dom";

function NewArrivals() {
  const [products,setProducts] = useState([])
  const navigate = useNavigate();

  async function getArrivals(){
    const response = await fetch('http://localhost:5000/products',{
      method: 'GET',
    })
    const data = await response.json()
    setProducts(data[0].productos)
  }

  useEffect(() => {
    getArrivals();
  }, []);

  function getSelectedProduct(product){
    console.log(product);
    navigate(`/product/${product.productId}`)
  }

  return (
    <div className={styles.newArrivals}>
      <div className={styles.newArrivals__title}>
        <h3>NEW PRODUCTS</h3>
      </div>
      <div className={styles.newArrivals__grid}>
      {products.slice(0, 3).map((product, index) => (
        <div key={index} onClick={()=>getSelectedProduct(product)}>
          <TenisCard
            key={index}
            cardImage={product.productImage}
            cardTitle={product.productName}
            cardPrice={product.productPrice}
            
          />
        </div>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
