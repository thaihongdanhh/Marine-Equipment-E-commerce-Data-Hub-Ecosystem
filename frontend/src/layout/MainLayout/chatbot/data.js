export const getData = async () => {
  let data = await fetch(
    `https://marine-parts.ailab.vn:5002/products/fetch/analytics`
  );
  data = await data.json();
  return data.data;
};

export const getData2 = async () => {
  let data = await fetch(
    `https://marine-parts.ailab.vn:5002/images/fetch/analytics`
  );
  data = await data.json();
  return data.data;
};
