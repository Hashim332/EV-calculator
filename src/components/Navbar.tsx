import React from "react";

const Navbar = () => {
  return (
    <nav className='w-full bg-white shadow flex items-center justify-between px-6 py-4 mb-8'>
      <a className='text-xl font-bold focus:outline-none' href='/'>
        EV Calculator
      </a>
      <a
        className='text-gray-700 hover:text-violet-500 transition-colors focus:outline-none'
        href='/'
      >
        Contact
      </a>
    </nav>
  );
};

export default Navbar;
