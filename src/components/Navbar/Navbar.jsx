import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close the mobile menu after clicking a link
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent text-[#583b15] z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div className="text-xl font-bold">
          <span>KaamShaam</span>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#583b15] focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 ml-[750px]">
          <a
            href="#Home"
            className="relative px-4 py-2 group"
            onClick={(e) => { e.preventDefault(); scrollToSection('Home'); }}
          >
            <span className="absolute inset-0 bg-[#583b15] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 hover:text-black "></span>
            <span className="relative z-10 group-hover:text-[#fff0dd]">Home</span>
          </a>
          <a
            href="#About"
            className="relative px-4 py-2 group"
            onClick={(e) => { e.preventDefault(); scrollToSection('About'); }}
          >
            <span className="absolute inset-0 bg-[#583b15] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10 group-hover:text-[#fff0dd]">About</span>
          </a>
          <a
            href="#Book"
            className="relative px-4 py-2 group"
            onClick={(e) => { e.preventDefault(); scrollToSection('Book'); }}
          >
            <span className="absolute inset-0 bg-[#583b15] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10 group-hover:text-[#fff0dd]">Book</span>
          </a>
          <a
            href="#Contact"
            className="relative px-4 py-2 group"
            onClick={(e) => { e.preventDefault(); scrollToSection('Contact'); }}
          >
            <span className="absolute inset-0 bg-[#583b15] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10 group-hover:text-[#fff0dd]">Contact</span>
          </a>
        </div>

        {/* Search Input */}
        <div className="hidden lg:block">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded bg-[#583b15] text-white focus:outline-none placeholder-white "
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#583b15] transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 lg:hidden`}
      >
        <div className="text-2xl ml-6 mt-6 font-bold text-[#fff0dd]">
          <span>Logo</span>
        </div>

        <div className="flex flex-col space-y-4 p-4 mt-6 text-[#fff0dd]">
          <a
            href="#Home"
            className="relative px-4 py-2 group"
            onClick={(e) => { e.preventDefault(); scrollToSection('Home'); }}
          >
            <span className="absolute inset-0 bg-[#fff0dd] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10 group-hover:text-[#583b15]">Home</span>
          </a>
          <a
            href="#About"
            className="relative px-4 py-2 group"
            onClick={(e) => { e.preventDefault(); scrollToSection('About'); }}
          >
            <span className="absolute inset-0 bg-[#fff0dd] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10 group-hover:text-[#583b15]">About</span>
          </a>
          <a
            href="#Book"
            className="relative px-4 py-2 group"
            onClick={(e) => { e.preventDefault(); scrollToSection('Book'); }}
          >
            <span className="absolute inset-0 bg-[#fff0dd] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10 group-hover:text-[#583b15]">Book</span>
          </a>
          <a
            href="#Contact"
            className="relative px-4 py-2 group"
            onClick={(e) => { e.preventDefault(); scrollToSection('Contact'); }}
          >
            <span className="absolute inset-0 bg-[#fff0dd] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10 group-hover:text-[#583b15]">Contact</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
