import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Section3 = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    category: '',
    additionalMessage: ''
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

    const completeData = {
        ...formData,
        startDate,
        endDate,
    };

    try {
        const response = await fetch('http://localhost:5000/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(completeData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Response from server:', result);

            // Show popup on successful submission
            setShowPopup(true);

            // Hide the popup after 3 seconds
            setTimeout(() => {
              setShowPopup(false);
            }, 1000);

            // Reset the form
            setFormData({
              firstName: '',
              lastName: '',
              phoneNumber: '',
              address: '',
              category: '',
              additionalMessage: ''
            });
            setStartDate(null);
            setEndDate(null);
            setShowCalendar(true);
        } else {
            alert('Error submitting the form!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    }
  };

  return (
    <section id='Book' className="relative min-h-screen bg-[#fff0dd] flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#583b15] mt-10 sm:mt-0">Book Now</h1>
          <p className="text-base sm:text-lg mb-6">
            Ready to get started? Booking a professional has never been easier! Simply choose the service you need, select a time that works best for you, and let us take care of the rest. Our trusted workers will be on their way to your location at the scheduled time.
            Don’t wait – secure your appointment today and experience hassle-free service at your doorstep.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex justify-center items-center bg-[#fff0dd] rounded-l-lg">
        <div className="w-full max-w-md">
          {showCalendar ? (
            <div className="flex items-center justify-center w-full">
              <div className="w-full max-w-md">
                <h2 className="text-2xl sm:text-3xl mb-4 text-center">Select Appointment Dates</h2>
                <div className="mb-4 flex flex-col items-center">
                  <label className="block text-lg mb-2">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy/MM/dd"
                    className="p-2 border border-gray-300 rounded w-full max-w-xs"
                  />
                </div>
                <div className="mb-4 flex flex-col items-center">
                  <label className="block text-lg mb-2">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy/MM/dd"
                    className="p-2 border border-gray-300 rounded w-full max-w-xs"
                  />
                </div>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="px-6 py-3 bg-[#583b15] text-white rounded-full transition duration-300 w-full sm:mt-0 mt-3"
                >
                  Proceed to Form
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl sm:text-3xl mb-4">Booking Form</h2>
              <form onSubmit={handleSubmitForm}>
                <div className="mb-4">
                  <label className="block text-lg mb-2">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleFormChange} className="p-2 border border-gray-300 rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleFormChange} className="p-2 border border-gray-300 rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Phone Number</label>
                  <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleFormChange} className="p-2 border border-gray-300 rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="p-2 border border-gray-300 rounded w-full" required />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Category</label>
                  <select name="category" value={formData.category} onChange={handleFormChange} className="p-2 border border-gray-300 rounded w-full" required>
                    <option value="" disabled>Select a category</option>
                    <option value="Painter">Painter</option>
                    <option value="Car Wash">Car Wash</option>
                    <option value="Carpenter">Carpenter</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Additional Message</label>
                  <textarea name="additionalMessage" value={formData.additionalMessage} onChange={handleFormChange} className="p-2 border border-gray-300 rounded w-full" rows="4"></textarea>
                </div>
                <button type="submit" className="px-6 py-3 bg-[#583b15] text-white rounded-full transition duration-300 w-full">Submit</button>
              </form>
            </div>
          )}

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
      </div>
    </section>
  );
};

export default Section3;
