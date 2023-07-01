export const getProperty = (data, property) => {
  return data.length > 0
    ? [
        ...new Set(
          data
            .map((item) => item[property].toString())
            .sort((a, b) => {
              return a - b;
            })
        ),
      ]
    : [];
};

export const getPrice = (data, isMin) => {
  const price = data.sort((a, b) => (isMin ? a?.price - b?.price : b?.price - a?.price))[0]?.price;

  return parseInt(price);
};
