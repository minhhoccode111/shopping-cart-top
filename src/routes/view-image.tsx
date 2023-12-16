import { useLoaderData } from 'react-router-dom';
import { getBook } from '../methods/books';

export const loader = async ({ params }) => {
  const id = params.bookId;
  console.log(id);
  const { image, title } = await getBook(id);
  return { image, title };
};

const View: React.FC = () => {
  const { image, title } = useLoaderData();
  return (
    <div className="">
      <div className="w-full max-w-[400px] mx-auto">
        <img src={image} alt={`Image of ${title}`} className="block w-full rounded-3xl border-white border-4" />
      </div>
    </div>
  );
};

export default View;
