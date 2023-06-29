import { useEffect, useState } from "react";
import data from "../utils/data.json";
import Product from "./Product";

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data.data);
  }, []);

  return (
    <div className="products-container">
      {products.length > 0 &&
        products.map((el) => (
          <Product
            aspectRatio={el.aspectRatio}
            availabitity={el.availability}
            description={el.description}
            diameter={el.rimDiameter}
            id={el.id}
            img={el.image}
            name={el.productName}
            price={el.price}
            season={el.seasonCategory}
            width={el.width}
            key={el.id}
          />
        ))}
    </div>
  );
};

export default ProductsContainer;
