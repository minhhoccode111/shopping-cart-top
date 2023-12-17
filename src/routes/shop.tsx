import { useFetcher, Link, useLoaderData, useSubmit } from 'react-router-dom';
import { RiArrowUpDoubleLine } from 'react-icons/ri';
import { getCategory, sortBooks, searchBooks } from '../methods/books';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const sort = url.searchParams.get('sort');
  const q = url.searchParams.get('q');
  console.log(q);
  const booksInCategory = await getCategory(category);
  const booksSorted = await sortBooks(booksInCategory, sort);
  const books = await searchBooks(booksSorted, q);
  return { books };
};

export const action = async () => {
  return null;
};

const Shop: React.FC = () => {
  const { books } = useLoaderData();
  const fetcher = useFetcher();
  const submit = useSubmit();
  return (
    <>
      <h2 className="">This is in Shop</h2>

      <>
        <div className="">
          <fetcher.Form method="get" className="">
            <label className="">
              <span className="">Filter:</span>
              <select
                name="category"
                onChange={(e) => {
                  submit(e.target.form);
                }}
                className=""
              >
                <option value="all">All</option>
                <option value="tam-ly">Tâm lý</option>
                <option value="phat-trien-ban-than">Phát triển bản thân</option>
                <option value="tieu-thuyet">Tiểu thuyết</option>
                <option value="kien-thuc-tong-hop">Kiến thức tổng hợp</option>
                <option value="van-hoc">Văn học</option>
                <option value="triet-hoc">Triết học</option>
                <option value="suc-khoe">Sức khỏe</option>
                <option value="ky-nang-song">Kỹ năng sống</option>
                <option value="marketing-ban-hang">Marketing - Bán hàng</option>
                <option value="truyen">Truyện</option>
                <option value="thuong-thuc">Thường thức</option>
                <option value="thieu-nhi">Thiếu nhi</option>
                <option value="nuoi-day-con">Nuôi dạy con</option>
                <option value="trinh-tham">Trinh thám</option>
                <option value="ky-nang-lam-viec">Kỹ năng làm việc</option>
                <option value="lich-su">Lịch sử</option>
              </select>
            </label>
            <label className="">
              <span className="">Sort:</span>
              <select
                name="sort"
                onChange={(e) => {
                  submit(e.target.form);
                }}
              >
                <option value="a-z">Title A-Z</option>
                <option value="z-a">Title Z-A</option>
                <option value="0-9">Price 0-9</option>
                <option value="9-0">Price 9-0</option>
              </select>
            </label>
          </fetcher.Form>
        </div>

        <div className="">
          <fetcher.Form method="get" role="search" className="">
            <input
              type="search"
              placeholder="Search"
              className=""
              name="q"
              onChange={(e) => {
                submit(e.target.form);
              }}
            />
          </fetcher.Form>
        </div>
      </>

      <div className="grid grid-cols-auto gap-2 p-4">
        {books.map((book) => {
          const percent = book.sale;
          const before = Math.round((book.price * (100 + percent)) / 100);
          const after = book.price;
          return (
            <Link className="border" key={book.id} to={`book/${book.id}`}>
              <div className="grid grid-cols-2 gap-1 aspect-video">
                <div className="">
                  <img src={book.image} alt={`${book.title} image`} className="object-center object-contain block w-full" />
                </div>
                <div className="">
                  <div className="p-2 aspect-video border">
                    <p className="">
                      <span className="text-sm line-through">{before} 000</span>
                      <span className="border border-red-500 text-red-500 text-xs p-1 rounded">-{percent}%</span>
                    </p>
                    <p className="">{after} 000</p>
                  </div>
                  <div className="">
                    <h2 className="">{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.category}</p>
                    <p>{book.id}</p>
                    <p className="text-green-700">{book.inCart ? 'Added' : ''}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="fixed right-5 bottom-5">
        <a href="#header" className="">
          <RiArrowUpDoubleLine className="text-4xl text-white bg-black flex items-center justify-center w-12 h-12 rounded-full" />
        </a>
      </div>
    </>
  );
};

export default Shop;
