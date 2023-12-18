import { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Root: React.FC = () => {
  const { pathname } = useLocation();
  const [isVietnamese, setIsVietnamese] = useState(true);
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <>
      <header id="header" className={'flex gap-3 sm:gap-5 md:gap-7 lg:gap-9 items-center p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg text-slate-700 bg-white' + ' ' + (pathname !== '/' && 'bg-slate-50')}>
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
            to={'cart'}
          >
            Cart
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
          <NavLink
            onClick={() => setIsShowMenu(!isShowMenu)}
            className={({ isActive, isPending }) =>
              (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '') +
              ' ' +
              'transition-colors hover:bg-sky-500 hover:text-slate-100 hover:shadow-xl my-2 p-4 rounded-3xl'
            }
            to={'login'}
          >
            Login
          </NavLink>
        </nav>

        <nav className="max-sm:hidden flex items-center gap-3 sm:gap-5 md:gap-7 lg:gap-9 sm:text-lg md:text-xl">
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '')} to={'/'}>
            Home
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '')} to={'shop'}>
            Shop
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '')} to={'cart'}>
            Cart
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '')} to={'about'}>
            About
          </NavLink>
          <NavLink className={({ isActive, isPending }) => (isActive ? 'underline hover:decoration-2 underline-offset-4' : isPending ? 'pending' : '')} to={'login'}>
            Login
          </NavLink>
        </nav>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      {pathname !== '/' && (
        <footer className="text-center">
          <p>Copyright 2022</p>
        </footer>
      )}
    </>
  );
};
export default Root;
