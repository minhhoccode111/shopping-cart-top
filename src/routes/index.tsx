import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RiArrowRightDoubleLine } from 'react-icons/ri';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Loading from '../components/loading';
import Error from '../components/error';

const Index: React.FC = () => {
  const [flag, setFlag] = useState(0);
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);
  const [loadingQuoteError, setLoadingQuoteError] = useState(false);
  useEffect(() => {
    const getQuote = async () => {
      try {
        const data = await fetch('https://api.quotable.io/random', { mode: 'cors' }).then((response) => response.json());
        console.log(data.content);
        setCurrentQuote(data.content);
        setCurrentAuthor(data.author);
      } catch (error) {
        console.log(error);
        setLoadingQuoteError(true);
      } finally {
        setIsLoadingQuote(false);
      }
    };
    getQuote(); // TODO turn on back when finishing develop
  }, [flag]);
  return (
    <section className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-16 sm:gap-32">
        <div className="flex flex-col gap-4 text-slate-700">
          {loadingQuoteError ? (
            <Error />
          ) : isLoadingQuote ? (
            <Loading />
          ) : (
            <>
              <h2 className="flex items-center justify-center text-2xl sm:text-4xl gap-2">
                <span className="self-start">
                  <FaQuoteLeft />
                </span>
                <span className="text-center">{currentQuote}</span>
                <span className="self-end">
                  <FaQuoteRight />
                </span>
              </h2>
              <h3 className="text-2xl text-center text-slate-900 font-bold">-{currentAuthor}-</h3>
            </>
          )}
        </div>
        <div className="border-2 h-0 border-sky-500 relative self-stretch">
          <button
            className="ripper px-8 py-8 underline hover:decoration-2 underline-offset-4 flex items-center tracking-widest absolute right-1/2 translate-x-1/2 bottom-0 translate-y-1/2 z-10"
            onClick={() => {
              setFlag(Math.random());
              setIsLoadingQuote(true);
              setLoadingQuoteError(false);
            }}
          >
            <span className="text-xl font-bold whitespace-nowrap">New quote</span>
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <Link className="ripper pl-8 pr-4 py-8 underline hover:decoration-2 underline-offset-4 flex items-center" to={'shop'}>
          <span className="tracking-widest text-xl font-bold mb-1">Shop now! </span>
          <span className="text-4xl">
            <RiArrowRightDoubleLine />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Index;
