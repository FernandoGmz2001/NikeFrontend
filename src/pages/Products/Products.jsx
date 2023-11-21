import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Products.module.css";
import TenisCard from "./components/TenisCard";
function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([])
  useEffect(()=>{
    async function getProducts(){
      const response = await fetch('http://127.0.0.1:5000/products')
      const data = await response.json()
      setIsLoading(false)
      setProducts(data[0].productos)
      console.log(data[0].productos)
    }

    getProducts()
  },[])
  return (
    <>
      <div className="wrapper">
        <Navbar />
      </div>
      <div className="wrapper">
        <div className={styles.products__grid}>
          {
            isLoading ? <p>Loading...</p> : products.map((product,index)=>
               (<TenisCard key={index} img={product.productImage} name={product.productName} price={product.productPrice} />)
            ) 
          }
        </div>
      </div>
    </>
  );
}

export default Products;
