const apiUrl = import.meta.env.VITE_API_URL;

const getData = async (expr, setProducts) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 20,
        expr: expr,
      }),
    });
    const data = await response.json();
    setProducts(data.result);
  } catch (error) {
    console.error(error);
  }
};

export default getData;

// "brand in ['Michelin','Continental']"
// "width in [255]"
// "aspectRatio in [60]" 
// "rimDiameter in [18]"
