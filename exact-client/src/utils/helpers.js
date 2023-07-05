export const queryStringify = (queries) => {
  let string = "";
  let isFirst = true;

  for (const key in queries) {
    if (Array.isArray(queries[key]) && queries[key].length > 0) {
      const selects = queries[key].map((el) => {
        return isNaN(+el) ? `'${el}'` : el;
      });
      if (!isFirst) {
        string += " and ";
      } else {
        isFirst = false;
      }

      string += `${key} in [${selects.join(",")}]`;
    } else if (key === "minPrice" || key === "maxPrice") {
      const operator = key === "minPrice" ? ">=" : "<=";
      if (!isFirst) {
        string += " and ";
      } else {
        isFirst = false;
      }
      string += `price${operator}${queries[key]}`;
    }
  }

  return string;
};
