const getProperty = (data, property) => {
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

export default getProperty;
