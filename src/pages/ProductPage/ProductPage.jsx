import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer,toast } from "react-toastify";
import "./ProductPage.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Footer from "../../components/Footer/Footer";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [counter, setCounter] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userData = JSON.parse(localStorage.getItem("userData"));

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

  const sendOrder = async () => {
    try{
      const response = await fetch('http://127.0.0.1:5000/orders',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          userId: userData.userId,
          productId: product.productId,
          quantity: counter,
          total: product.productPrice * counter,
        })
      })
      const data = await response.json()
      toast("Orden registrada con exito", { type: "success" });
      console.log(data);
    }catch(err){
      throw new Error(err)
    }
  }

  const handleConfirm = () => {
    sendOrder()
    onOpenChange();
  }

  return (
    <div className="productPage">
      <Navbar />
      <main className="product__main">
        <div className="product__information">
          <picture className="productImage__container">
            <img src={product.productImage} width={500} height={500} alt="" />
          </picture>
          <div className="product__details">
            <h1>{product.productName}</h1>
            <h2>${product.productPrice}</h2>
            <p>{product.productDescription}</p>
            <div className="product__actions">
            <button onClick={decreaseCounter} className="btnCounter">-</button>
              {counter}
              <button onClick={increaseCounter} className="btnCounter">+</button>
            </div>
            <button className="btnBuyNow" onClick={onOpen}>Comprar ahora</button>
          </div>
        </div>
      </main>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar compra
              </ModalHeader>
              <ModalBody>
                <h1>Desea comprar el siguiente producto?</h1>
                <div className="dialog__product">
                  <picture>
                    <img src={product.productImage} alt=""  width={100} height={100}/>
                  </picture>
                  <div>
                    <h2>{product.productName}</h2>
                    <p>Cantidad : <span>{counter}</span></p>
                    <p>Precio : $ {product.productPrice * counter}</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
      <Footer/>
    </div>
  );
}

export default ProductPage;
