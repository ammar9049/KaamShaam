import React from 'react';

const Section1 = () => {
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="Home"
      className="relative h-screen bg-cover bg-center bg-[#583b15] z-10"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random')", // Replace with your image URL
      }}
    >
      {/* Overlay for visual clarity */}
      <div className="absolute inset-0 bg-[#fff0dd]"></div>

      {/* Section Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-[#583b15]">
        <h1 className="text-5xl font-bold mb-4">KaamShaam</h1>
        <p className="text-lg mb-6">The Perfect Place To Make Your Day Easy</p>
        <button
          onClick={() => scrollToSection('#Book')}
          className="px-6 py-3 bg-[#ffffff] hover:bg-[#583b15] rounded-full transition duration-300 text-black hover:text-white"
        >
          Book Now
        </button>
      </div>
    </section>
  );
};

export default Section1;
