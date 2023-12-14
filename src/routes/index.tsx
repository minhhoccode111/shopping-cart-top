import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <>
      <section className="">
        <h1>This is Index element or Default page</h1>
        <Link className="underline" to={'shop'}>
          Shop now!
        </Link>
      </section>
    </>
  );
};

export default Index;
