const data = [{}];

const set = (data) => localStorage.setItem('carts', JSON.stringify(data));

export const getCarts = () => {
  const carts = localStorage.getItem('carts');
  if (carts === null) return data;
  else return JSON.parse(carts);
};
