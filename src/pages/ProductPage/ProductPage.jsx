import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
      const data = await response.json();
      setProduct(data[0]);
    }
    getProduct();
  }, [id]);

  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const sendOrder = () => {
    const order = {
      productName: product.productName,
      productPrice: product.productPrice,
      productImage: product.productImage,
      productDescription: product.productDescription,
      productGender: product.productGender,
      productQuantity: counter,
    };
    console.log(order);
  }

  return (
    <div className="productPage wrapper">
      <Navbar />
      <main className="product__main">
        <div className="product__information">
          <picture className="productImage__container">
            <img src={product.productImage} width={400} height={400} alt="" />
          </picture>
          <div className="product__details">
            <h1>{product.productName}</h1>
            <h2>${product.productPrice}</h2>
            <p>{product.productDescription}</p>
            <div>
            <button onClick={decreaseCounter}>-</button>
              {counter}
              <button onClick={increaseCounter}>+</button>
            </div>
            <button className="btnBuyNow" onClick={sendOrder}>Comprar ahora</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
