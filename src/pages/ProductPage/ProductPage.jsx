import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import './ProductPage.css'

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        async function getProduct() {
            const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
            const data = await response.json();
            setProduct(data[0]);
        }
        getProduct();
    }, [id]);

    return (
        <div className="wrapper h-[100vh]">
            <Navbar/>
            <main className="product__main"> 
                <div className="product__information"><picture><img src={product.productImage} width={400} height={400} alt="" /></picture></div>
                <div className="product__buy"><button>Comprar ahora</button></div>
            </main>
        </div>
    );
}

export default ProductPage;