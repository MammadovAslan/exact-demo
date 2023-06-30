import data from './data.json'

const getProperty = (property) => {
  return [
    ...new Set(
      data.data
        .map((item) => item[property].toString())
        .sort((a, b) => {
          return a - b;
        })
    ),
  ];
};

export default getProperty;
