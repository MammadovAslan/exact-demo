const apiUrl = import.meta.env.VITE_API_URL;

const getData = async (expr, sort, order = 0) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expr: expr,
        sort: sort || "price",
        reverse: order,
        aggregate: [
          "max:price",
          "min:price",
          "distinct:width",
          "distinct:aspectRatio",
          "distinct:brand",
          "distinct:rimDiameter",
        ],
      }),
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getData;
