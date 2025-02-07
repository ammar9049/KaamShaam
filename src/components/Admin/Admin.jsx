import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  // State to hold the form submissions and contact data
  const [formData, setFormData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("admin"); // Track which menu is active

  // Redirect if not logged in
  const isAdmin = localStorage.getItem("isAdmin");
  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  // Fetch form submissions from the backend
  useEffect(() => {
    if (activeMenu === "admin") {
      // Fetch form submissions when the admin view is active
      fetch("http://localhost:5000/get-submissions")
        .then((response) => response.json())
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching submissions:", error);
          setLoading(false);
        });
    } else if (activeMenu === "contact") {
      // Fetch contact data when the contact view is active
      fetch("http://localhost:5000/get-contact-info")
        .then((response) => response.json())
        .then((data) => {
          setContactData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching contact data:", error);
          setLoading(false);
        });
    }
  }, [activeMenu]);

  // Handle checkbox change to mark as done
  const handleCheckboxChange = (id, isDone, dataType) => {
    const newIsDone = !isDone;
  
    // Update the backend with the new isDone value
    fetch("http://localhost:5000/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        isDone: newIsDone,
        dataType, // Pass the data type (admin or contact) to identify which table to update
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // Update local state after successfully marking as done
        if (dataType === "admin") {
          setFormData((prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, isDone: newIsDone } : item
            )
          );
        } else if (dataType === "contact") {
          setContactData((prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, isDone: newIsDone } : item
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Menu */}
      <div className="flex justify-center space-x-4 mb-4 mt-5">
        <button
          className={`px-4 py-2 rounded ${activeMenu === "admin" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveMenu("admin")}
        >
          Admin
        </button>
        <button
          className={`px-4 py-2 rounded ${activeMenu === "contact" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveMenu("contact")}
        >
          Contact
        </button>
      </div>

      {/* Display different tables based on selected menu */}
      {activeMenu === "admin" ? (
        <div className="overflow-auto mb-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Admin Page</h1>
          <table className="table-auto w-full bg-white shadow-md rounded mb-4">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">End Date</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Done</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((item) => (
                <tr key={item.id} className={`border-t ${item.isDone ? "bg-red-200" : ""}`}>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.firstName} {item.lastName}</td>
                  <td className="px-4 py-2">{item.phoneNumber}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.additionalMessage}</td>
                  <td className="px-4 py-2">{item.startDate}</td>
                  <td className="px-4 py-2">{item.endDate}</td>
                  <td className="px-4 py-2">{item.address}</td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={item.isDone}
                      onChange={() => handleCheckboxChange(item.id, item.isDone, "admin")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-auto mb-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Contact Info</h1>
          <table className="table-auto w-full bg-white shadow-md rounded mb-4">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Done</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((item) => (
                <tr key={item.id} className={`border-t ${item.isDone ? "bg-red-200" : ""}`}>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.phoneNumber}</td>
                  <td className="px-4 py-2">{item.message}</td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={item.isDone}
                      onChange={() => handleCheckboxChange(item.id, item.isDone, "contact")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Logout button */}
      <div className="mb-4 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
