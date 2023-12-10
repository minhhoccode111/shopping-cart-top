import React from 'react';
import data from '../methods/data';
import { categories } from '../methods/data-sort-to';

const Index: React.FC = () => {
  console.log(data);
  console.log(categories);
  return (
    <>
      <h1>This is Index element</h1>
    </>
  );
};

export default Index;
