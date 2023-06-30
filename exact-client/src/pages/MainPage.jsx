import {useState} from 'react';
import Form from "../components/Form";
import ProductsContainer from "../components/ProductsContainer";

const MainPage = () => {

  const [products, setProducts] = useState([]);

  return (
    <div>
      <Form products={products} setProducts={setProducts}/>
      <ProductsContainer products={products} setProducts={setProducts}/>
    </div>
  );
};

export default MainPage;
