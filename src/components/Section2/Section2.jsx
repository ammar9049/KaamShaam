import React from 'react';

const Section2 = () => {
  // Define the scrollToSection function here
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='About' className="relative h-screen bg-white">
      {/* Section Content */}
      <div className="relative z-20 flex items-center justify-between h-full px-8">
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 text-center flex flex-col items-center justify-center pr-[5%]">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-6 text-[#583b15]">About Us</h1>
          <p className="text-base sm:text-lg lg:text-[18px] mb-6 w-[90%] text-black">
            At KaamShaam, we connect you with skilled professionals in a wide range of services, from carpenters and painters to car washers and beyond. We understand that your time is valuable, and that’s why we’ve created a seamless platform where you can easily find the right worker for your needs, schedule an appointment, and have them come directly to you.

            Whether you need a quick repair, a new project completed, or a specialized service, our team of reliable experts is just a click away. We pride ourselves on quality, reliability, and convenience, ensuring that every job is done to your satisfaction.

            With KaamShaam, getting the help you need has never been easier. Book an appointment today, and let us handle the rest!
          </p> 
          
          {/* Button to scroll to the Contact section */}
          <button
            onClick={() => scrollToSection('#Contact')}
            className="px-6 py-3 bg-[#583b15] hover:bg-[#fff0dd] rounded-full transition duration-300 text-white hover:text-black"
          >
            Contact Us
          </button>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-cover overflow-hidden bg-no-repeat shadow-lg"
        style={{
          backgroundImage: "url('src/assets/bb8ebd382a.jpg')",
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center center',
        }}
      ></div>
    </section>
  );
};

export default Section2;
