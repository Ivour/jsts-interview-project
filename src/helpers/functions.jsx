export const stringToLowerCase = (str) => {
  return [...str]
    .map((v) => {
      if (typeof v === "string") return v.toLowerCase();
      return v;
    })
    .join("");
};
