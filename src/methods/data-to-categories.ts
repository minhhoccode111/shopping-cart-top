import data from './data';

interface Total {
  [key: string]: Array<{ title: string; author: string; price: number | string; category: string; image: string; id: string }>;
}

const categories = data.reduce((total: Total, current) => {
  const category = current.category;
  const count = total[category] || [];
  return { ...total, [category]: [...count, current] };
}, {});

export default categories;
