import React, { useState } from 'react';

const Footer = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <section
      className="relative h-[250px] bg-cover bg-center bg-[#fff0dd] z-10"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random')", // Replace with your image URL
      }}
    >
      {/* Overlay for visual clarity */}
      <div className="absolute inset-0 bg-white opacity-50"></div>

      {/* Section Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-[#583b15] space-y-4">
        {/* Logo */}
        <div className="text-xl font-bold">
          <span>KaamShaam</span>
        </div>
        
        {/* Thanks Message */}
        <h1 className="text-3xl font-bold">Thanks for using us!</h1>
        <p className="text-lg">We hope to see you again soon :)</p>

        {/* Star Rating */}
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className={`cursor-pointer text-3xl ${
                star <= rating ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
