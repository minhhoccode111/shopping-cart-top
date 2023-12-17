import { useFetcher, Link, useLoaderData, useSubmit } from 'react-router-dom';
import { getCategory, sortBooks } from '../methods/books';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const sort = url.searchParams.get('sort');
  console.log(category, sort);
  const booksInCategory = await getCategory(category);
  const books = await sortBooks(booksInCategory, sort);
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

      <div className="">
        <fetcher.Form method="get" className="">
          <label className="">
            <span className="">Filter:</span>
            <select
              name="category"
              onChange={(e) => {
                submit(e.target.form);
              }}
              className="uppercase"
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
    </>
  );
};

export default Shop;
