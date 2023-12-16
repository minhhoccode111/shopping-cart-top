import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [flag, setFlag] = useState(0);
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');
  useEffect(() => {
    const getQuote = async () => {
      try {
        const data = await fetch('https://api.quotable.io/random', { mode: 'cors' }).then((response) => response.json());
        console.log(data.content);
        setCurrentQuote(data.content);
        setCurrentAuthor(data.author);
      } catch (error) {
        console.log(error);
      }
    };
    // getQuote(); // TODO turn on back when finishing develop
  }, [flag]);
  return (
    <>
      <section className="p-4">
        <h1 className="">{currentQuote}</h1>
        <h2 className="">{currentAuthor}</h2>
        <button className="border rounded border-sky-500 text-sky-500 px-4 py-2" onClick={() => setFlag(Math.random())}>
          New quote
        </button>
        <Link className="underline" to={'shop'}>
          Shop now!
        </Link>
      </section>
    </>
  );
};

export default Index;
