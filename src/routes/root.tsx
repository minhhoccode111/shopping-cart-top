import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosCloseCircleOutline, IoIosCart, IoIosLogIn } from 'react-icons/io';
import { getCarts } from '../methods/carts';
import Footer from '../components/footer';

const Root: React.FC = () => {
  const { pathname } = useLocation();
  const [isVietnamese, setIsVietnamese] = useState(true);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [inCart, setInCart] = useState(0);
  // init count items in cart with 2 default items
  useEffect(() => {
    const tmp = async () => {
      const carts = await getCarts();
      setInCart((c) => carts.length);
    };
    tmp();
  }, []);
  const increase = () => setInCart((c) => c + 1);
  const decrease = () => setInCart((c) => c - 1);
  const reset = () => setInCart((c) => 0);
  return (
    <>
      <header
        id="header"
        className={'flex gap-3 sm:gap-5 md:gap-7 lg:gap-9 items-center p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg shadow-gray-300 text-slate-700 bg-white' + ' ' + (pathname !== '/' && 'bg-slate-50')}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider flex-1 whitespace-nowrap">
          <Link to={'/'}>Vài Quyển Sách</Link>
        </h1>
        <div className="">
          <button
            type="button"
            className=""
            onClick={() => {
              setIsVietnamese(!isVietnamese);
            }}
          >
            {isVietnamese ? 'Vie' : 'Eng'}
          </button>
        </div>

        {/* hamburger */}
        <nav className={'sm:hidden'}>
          <button className="mt-1 text-xl" onClick={() => setIsShowMenu(!isShowMenu)}>
            <GiHamburgerMenu />
          </button>
        </nav>

        <nav
          className={
            'flex max-sm:flex-col max-sm:gap-8 max-sm:text-4xl max-sm:fixed max-sm:top-0 max-sm:bottom-0 max-sm:right-0 max-sm:z-20 max-sm:bg-[#ffffff99] max-sm:px-8 max-sm:py-20 max-sm:shadow-2xl max-sm:text-right max-sm:w-3/4 max-sm:backdrop-blur-sm max-sm:items-stretch transition-all origin-top items-center gap-1 md:gap-3 lg:gap-5 text-lg md:text-xl' +
            ' ' +
            (isShowMenu ? 'max-sm:scale-y-100' : 'max-sm:scale-y-0')
          }
        >
          <button className="sm:hidden mt-1 text-4xl absolute top-0 right-0 p-4" onClick={() => setIsShowMenu(!isShowMenu)}>
            <IoIosCloseCircleOutline className="text-red-500 rounded-full hover:text-white hover:bg-red-500 transition-all" />
          </button>
          <NavLink
            className={({ isActive }) => (isActive ? 'bg-sky-400 text-white' : 'hover:bg-gray-300 hover:text-black') + ' ' + 'max-sm:p-4 p-2 max-sm:rounded-xl rounded-md transition-all'}
            to={'/'}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'bg-sky-400 text-white' : 'hover:bg-gray-300 hover:text-black') + ' ' + 'max-sm:p-4 p-2 max-sm:rounded-xl rounded-md transition-all'}
            to={'shop'}
          >
            Shop
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'bg-sky-400 text-white' : 'hover:bg-gray-300 hover:text-black') + ' ' + 'max-sm:p-4 p-2 max-sm:rounded-xl rounded-md transition-all'}
            to={'about'}
          >
            About
          </NavLink>
          <div className="flex gap-2 md:gap-4 max-sm:justify-end">
            <NavLink
              className={({ isActive }) => (isActive ? 'bg-sky-400 text-white' : 'hover:bg-gray-300 hover:text-black') + ' ' + 'relative max-sm:p-4 p-2 max-sm:rounded-xl rounded-md transition-all'}
              to={'cart'}
            >
              <IoIosCart className="text-6xl sm:text-2xl md:text-3xl" />
              <span className="absolute text-xl sm:text-xs font-bold top-0 right-0 w-6 h-6 sm:w-4 sm:h-4 flex items-center justify-center rounded-full text-white bg-red-500">{inCart}</span>
            </NavLink>
            <div className="border border-slate-900 w-0"></div>
            <NavLink
              className={({ isActive }) => (isActive ? 'bg-sky-400 text-white' : 'hover:bg-gray-300 hover:text-black') + ' ' + 'max-sm:p-4 p-2 max-sm:rounded-xl rounded-md transition-all'}
              to={'login'}
            >
              <IoIosLogIn className="text-6xl sm:text-2xl md:text-3xl" />
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet context={{ increase, decrease, reset }} />
      </main>
      {pathname !== '/' && <Footer />}
    </>
  );
};
export default Root;
