export const queryStringify = (queries) => {
  let string = "";
  let isFirst = true;

  for (const key in queries) {
    if (queries[key] !== 0 && queries[key].length !== 0) {
      if (!isFirst) {
        string += " and ";
      } else {
        isFirst = false;
      }
    }
    if (Array.isArray(queries[key]) && queries[key].length > 0) {
      const selects = queries[key].map((el) => {
        return isNaN(+el) ? `'${el}'` : el;
      });

      string += `${key} in [${selects.join(",")}]`;
    } else if (
      (key === "minPrice" && queries[key] !== 0) ||
      (key === "maxPrice" && queries[key] !== 0)
    ) {
      const operator = key === "minPrice" ? ">=" : "<=";

      string += `price${operator}${queries[key]}`;
    } else if (!isNaN(+queries[key]) && +queries[key] !== 0) {
      string += `${key} == ${queries[key]}`;
    }
  }

  return string;
};
