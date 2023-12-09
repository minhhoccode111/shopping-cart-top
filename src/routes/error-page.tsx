import React from 'react';
import { Link } from 'react-router-dom';

const ErrorElement: React.FC = () => {
  return (
    <>
      <h1>Oops! Something went wrong</h1>
      <Link to={'/'}>Go back</Link>
    </>
  );
};

export default ErrorElement;
