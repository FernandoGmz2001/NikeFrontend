import { useEffect, useState } from "react";
import { Route, Routes, useNavigate,Navigate  } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Products.module.css";
import TenisCard from "./components/TenisCard";
function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    async function getProducts(){
      const response = await fetch('http://127.0.0.1:5000/products')
      const data = await response.json()
      setIsLoading(false)
      setProducts(data[0].productos)
    }

    getProducts()
  },[])

  function getSelectedProduct(product){
    console.log(product);
    navigate(`/product/${product.productId}`)
  }


  return (
    <>
        <Navbar />
      <div className="wrapper">
        <div className={styles.products__grid}>
          {
            isLoading ? <p>Loading...</p> : products.map((product,index)=>
               (<div onClick={()=>getSelectedProduct(product)} key={index}>
                 <TenisCard key={index} img={product.productImage} name={product.productName} price={product.productPrice} />
                </div>)
            ) 
          }
        </div>
      </div>
    </>
  );
}

export default Products;
