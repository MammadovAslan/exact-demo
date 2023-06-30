import { useEffect, useState } from "react";
import data from "../utils/data.json";
import Product from "./Product";

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);
  const [apiData, setApiData] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const getData = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 10,

          expr: 'brand in ["Apple", "Samsung"]',
        }),
      });
      const data = await response.json();
      setApiData(data.result);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setProducts(data.data);
    getData();
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
