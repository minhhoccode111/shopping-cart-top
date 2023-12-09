import React from 'react';
import data from './../methods/data';

const Index: React.FC = () => {
  console.log(data.length);
  console.log(data);
  return (
    <>
      <h1>This is Index element</h1>
      {/* <ul className="grid gap-3 grid-cols-autoFit200">
        {data.map((book) => (
          <li key={book.id} className="text-xs">
            <p className="">Title: {book.title}</p>
            <p className="">Author: {book.author}</p>
            <p className="">Price: {book.price}</p>
            <p className="">Category: {book.category}</p>
            <p className="">
              <a href={book.link} className="">
                <img src={book.image} alt="Book thumbnail" className="" />
              </a>
            </p>
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default Index;
