import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosCloseCircleOutline, IoIosCart, IoIosLogIn } from 'react-icons/io';
import { getCarts } from '../methods/carts';

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
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono flex-1 whitespace-nowrap">
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

        <nav className={'sm:hidden'}>
          <button className="mt-1 text-xl" onClick={() => setIsShowMenu(!isShowMenu)}>
            <GiHamburgerMenu />
          </button>
        </nav>

        {/* mobile hamburger menu */}
        <nav
          className={
            'flex flex-col gap-3 sm:gap-5 md:gap-7 lg:gap-9 text-4xl fixed top-0 bottom-0 right-0 z-20 bg-[#ffffff99] px-8 py-16 shadow-2xl text-right transition-all w-3/4 origin-right backdrop-blur-sm' +
            ' ' +
            (isShowMenu ? 'scale-x-100' : 'scale-x-0')
          }
        >
          <button className="mt-1 text-4xl absolute top-0 right-0 p-4" onClick={() => setIsShowMenu(!isShowMenu)}>
            <IoIosCloseCircleOutline className="text-red-500 rounded-full hover:text-white hover:bg-red-500 transition-colors" />
          </button>
          <NavLink
            onClick={() => setIsShowMenu(!isShowMenu)}
            className={({ isActive, isPending }) =>
              (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '') +
              ' ' +
              'transition-colors hover:bg-sky-500 hover:text-slate-100 hover:shadow-xl my-2 p-4 rounded-3xl'
            }
            to={'/'}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setIsShowMenu(!isShowMenu)}
            className={({ isActive, isPending }) =>
              (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '') +
              ' ' +
              'transition-colors hover:bg-sky-500 hover:text-slate-100 hover:shadow-xl my-2 p-4 rounded-3xl'
            }
            to={'shop'}
          >
            Shop
          </NavLink>
          <NavLink
            onClick={() => setIsShowMenu(!isShowMenu)}
            className={({ isActive, isPending }) =>
              (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '') +
              ' ' +
              'transition-colors hover:bg-sky-500 hover:text-slate-100 hover:shadow-xl my-2 p-4 rounded-3xl'
            }
            to={'about'}
          >
            About
          </NavLink>

          <div className="flex gap-2 justify-end">
            <NavLink
              onClick={() => setIsShowMenu(!isShowMenu)}
              className={({ isActive, isPending }) =>
                (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '') +
                ' ' +
                'transition-colors hover:bg-sky-500 hover:text-slate-100 hover:shadow-xl my-2 p-4 rounded-3xl relative'
              }
              to={'cart'}
            >
              <IoIosCart className="text-6xl" />
              <span className="absolute text-xl font-bold top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full text-white bg-red-500">{inCart}</span>
            </NavLink>
            <div className="border border-slate-900 w-0"></div>
            <NavLink
              onClick={() => setIsShowMenu(!isShowMenu)}
              className={({ isActive, isPending }) =>
                (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '') +
                ' ' +
                'transition-colors hover:bg-sky-500 hover:text-slate-100 hover:shadow-xl my-2 p-4 rounded-3xl'
              }
              to={'login'}
            >
              <IoIosLogIn className="text-6xl" />
            </NavLink>
          </div>
        </nav>

        <nav className="max-sm:hidden flex items-center gap-3 sm:gap-5 md:gap-7 lg:gap-9 text-lg md:text-xl">
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '')} to={'/'}>
            Home
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '')} to={'shop'}>
            Shop
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '')} to={'about'}>
            About
          </NavLink>
          <div className="flex gap-2 md:gap-4">
            <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '') + ' ' + 'relative'} to={'cart'}>
              <IoIosCart className="text-2xl md:text-3xl" />
              <span className="absolute text-xs font-bold top-0 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full text-white bg-red-500">{inCart}</span>
            </NavLink>
            <div className="border border-slate-900 w-0"></div>
            <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '')} to={'login'}>
              <IoIosLogIn className="text-2xl md:text-3xl" />
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet context={{ increase, decrease, reset }} />
      </main>
      {pathname !== '/' && (
        <footer className="hidden">
          <h2 className="text-xl">Made with love by minhhoccode</h2>
        </footer>
      )}
    </>
  );
};
export default Root;
