import React, { useState } from 'react';

const Section4 = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    message: ''
  });

  // State to control the popup visibility
  const [showPopup, setShowPopup] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/submit-contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result.message); // Display success message

      // Show popup on successful submission
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);

      // Reset the form data
      setFormData({
        name: '',
        phoneNumber: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section
      id='Contact'
      className="relative h-screen bg-cover bg-center bg-white z-10"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random')", // Replace with your image URL
      }}
    >
      {/* Overlay for visual clarity */}
      <div className="absolute inset-0 bg-white opacity-50"></div>

      {/* Section Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-[#583b15]">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>

        {/* Contact Us Form */}
        <form onSubmit={handleSubmitForm} className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] px-6 py-4 bg-white rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-lg mb-2">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              className="p-10 border border-gray-300 rounded w-full"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-[#583b15] text-white rounded-full transition duration-300 w-full"
          >
            Submit
          </button>
        </form>

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold">Form Submitted Successfully!</h3>
              <p className="mt-4">Your form has been submitted. Thank you :)</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Section4;
