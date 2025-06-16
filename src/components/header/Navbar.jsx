import React from 'react';
import { navBarLink } from '../../constants';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LuMenu } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { pathname } = location;

  const navfunction = () => {
    return (
      <div className="flex gap-3 font-semibold relative">
        {!mobileMenuOpen && (
          <div className="flex-center ">
            {pathname === '/signin' ? (
              <NavLink to="/signup">
                <button
                  className="button-21 max-sm:text-sm max-sm:py-2"
                  role="button"
                >
                  Sign up
                </button>
              </NavLink>
            ) : pathname === '/signup' ? (
              <NavLink to="/signin">
                <button
                  className="button-21 max-sm:text-sm max-sm:py-2"
                  role="button"
                >
                  Sign In
                </button>
              </NavLink>
            ) : (
              (pathname.startsWith('/signin') ||
                pathname.startsWith('/signup') ||
                pathname.startsWith('/')) && (
                <div className="flex-center gap-3">
                  <NavLink to="/signin">
                    <button
                      className="button-21 max-sm:text-sm max-sm:py-2"
                      role="button"
                    >
                      Sign In
                    </button>
                  </NavLink>

                  <NavLink to="/signup">
                    <button
                      className="button-21 max-sm:text-sm max-sm:py-2"
                      role="button"
                    >
                      Sign up
                    </button>
                  </NavLink>
                </div>
              )
            )}
          </div>
        )}

        <div
          className="sm:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <LuMenu size={38} className=" text-white" />

          {mobileMenuOpen && (
            <div className="fixed h-screen w-screen top-0 right-0 flex-center flex-col gap-10 pb-10 bg-black opacity-75 text-white">
              <IoMdClose size={30} className="text-white mb-10" />

              {navBarLink.map((navLink) => {
                return (
                  <NavLink
                    key={navLink.label}
                    to={navLink.link}
                    className={({ isActive }) =>
                      isActive
                        ? ' text-decoration-line: underline text-pink-500'
                        : ''
                    }
                  >
                    <div className=" px-3 text-xl hover:text-cyan-500 w-full ">
                      {navLink.label}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <nav
        className="flex-btwn-center h-20 w-screen px-24 backdrop-blur-sm backdrop-filter
            max-sm:px-5 fixed top-0 left-0 max-sm:h-16   z-40   border-b-1 border-black bg-gray-900"
      >
        <Link to="/" className="h-1/2 border-none">
          <img
            src={
              'https://tppwebsolutions.com/wp-content/uploads/logo-demo3.png'
            }
            alt="logo"
            className="h-full rounded-md 
                hover:shadow-md hover:shadow-pink-500 cursor-pointer transition-all duration-400 hover:scale-105"
          />
        </Link>

        <div className="flex gap-2 text-sm text-white font-medium max-sm:hidden">
          <h1>
            <b>Placement Management System</b>
          </h1>
        </div>

        {navfunction()}
      </nav>
    </>
  );
}

export default Navbar;
