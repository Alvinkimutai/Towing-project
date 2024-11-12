import React, { useState } from 'react';
import { FaChartLine, FaWrench, FaCreditCard, FaClipboardList, FaRegUser, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock Data
  const mechanics = [
    { id: 1, name: 'Mike Johnson', gender: 'Male', skillset: 'Engine Repair', experience: 5, startDate: '2019-05-01', profilePic: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Sara Lee', gender: 'Female', skillset: 'Bodywork', experience: 3, startDate: '2021-02-15', profilePic: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Chris Martin', gender: 'Male', skillset: 'Electrical Systems', experience: 4, startDate: '2020-07-10', profilePic: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Anna West', gender: 'Female', skillset: 'AC Repair', experience: 2, startDate: '2022-01-20', profilePic: 'https://via.placeholder.com/50' },
    { id: 5, name: 'James Taylor', gender: 'Male', skillset: 'Suspension Repair', experience: 6, startDate: '2018-11-10', profilePic: 'https://via.placeholder.com/50' },
  ];

  const users = [
    { id: 1, name: 'John Doe', type: 'User' },
    { id: 2, name: 'Jane Smith', type: 'User' },
    { id: 3, name: 'Bob Lee', type: 'User' },
    { id: 4, name: 'Alice Brown', type: 'User' },
    { id: 5, name: 'Charlie Davis', type: 'User' },
    { id: 6, name: 'Emily White', type: 'User' },
  ];

  const payments = [
    { id: 1, user: 'John Doe', amount: 50, status: 'Completed' },
    { id: 2, user: 'Jane Smith', amount: 75, status: 'Pending' },
    { id: 3, user: 'Bob Lee', amount: 120, status: 'Completed' },
    { id: 4, user: 'Alice Brown', amount: 200, status: 'Completed' },
    { id: 5, user: 'Charlie Davis', amount: 180, status: 'Completed' },
    { id: 6, user: 'Emily White', amount: 60, status: 'Pending' },
  ];

  const servicesStatus = [
    { id: 1, serviceName: 'Towing Service', status: 'Ongoing' },
    { id: 2, serviceName: 'Engine Repair', status: 'Completed' },
    { id: 3, serviceName: 'Bodywork', status: 'Completed' },
    { id: 4, serviceName: 'AC Repair', status: 'Ongoing' },
  ];

  const reviews = [
    { id: 1, user: 'John Doe', review: 'Great service, very professional!' },
    { id: 2, user: 'Jane Smith', review: 'Excellent response time, highly recommend.' },
    { id: 3, user: 'Bob Lee', review: 'Friendly staff and fast service.' },
    { id: 4, user: 'Alice Brown', review: 'The repair was perfect, very satisfied.' },
    { id: 5, user: 'Charlie Davis', review: 'Good quality work, will use again.' },
  ];

  const complaints = [
    { id: 1, user: 'John Doe', complaint: 'The service was delayed by an hour.' },
    { id: 2, user: 'Jane Smith', complaint: 'The mechanic didn’t fix the issue properly.' },
    { id: 3, user: 'Bob Lee', complaint: 'Didn’t get an update on the service status.' },
    { id: 4, user: 'Alice Brown', complaint: 'The waiting time was too long.' },
    { id: 5, user: 'Charlie Davis', complaint: 'The technician was not polite.' },
  ];

  // Analytics Data for Chart.js
  const analyticsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Mechanics',
        data: [5, 6, 7, 8, 9, 10],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Total Payments',
        data: [500, 1200, 1500, 2000, 2500, 3000],
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
      {
        label: 'Total Clients',
        data: [50, 80, 100, 120, 140, 160],
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`w-20 bg-gray-800 p-4 flex flex-col items-center space-y-6 ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Admin</h2>
        {/* Sidebar buttons */}
        <button onClick={() => setSelectedSection('analytics')} className="text-gray-400 hover:text-white flex flex-col items-center">
          <FaChartLine size={24} />
          <span className="mt-2 text-xs">Analytics</span>
        </button>
        <button onClick={() => setSelectedSection('manageMechanics')} className="text-gray-400 hover:text-white flex flex-col items-center">
          <FaWrench size={24} />
          <span className="mt-2 text-xs">Mechanics</span>
        </button>
        <button onClick={() => setSelectedSection('payments')} className="text-gray-400 hover:text-white flex flex-col items-center">
          <FaCreditCard size={24} />
          <span className="mt-2 text-xs">Payments</span>
        </button>
        <button onClick={() => setSelectedSection('serviceStatus')} className="text-gray-400 hover:text-white flex flex-col items-center">
          <FaClipboardList size={24} />
          <span className="mt-2 text-xs">Services</span>
        </button>
        <button onClick={() => setSelectedSection('reviews')} className="text-gray-400 hover:text-white flex flex-col items-center">
          <FaUsers size={24} />
          <span className="mt-2 text-xs">Reviews</span>
        </button>
        <button onClick={() => setSelectedSection('complaints')} className="text-gray-400 hover:text-white flex flex-col items-center">
          <FaRegUser size={24} />
          <span className="mt-2 text-xs">Complaints</span>
        </button>

        {/* Toggle Sidebar for mobile */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full">
          <FaArrowLeft size={20} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-6 overflow-hidden">
        <button onClick={() => window.location.href = '/'} className="text-blue-500 hover:text-blue-700 transition p-2 mb-6">
          <FaArrowLeft /> Back to Landing Page
        </button>

        {/* Analytics Section */}
        {selectedSection === 'analytics' && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Performance Overview</h3>

            {/* Summary Divs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h4 className="font-bold">Total Mechanics</h4>
                <p className="text-3xl">{mechanics.length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h4 className="font-bold">Total Clients</h4>
                <p className="text-3xl">{users.length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h4 className="font-bold">Payments Made</h4>
                <p className="text-3xl">
                  ${payments.filter(p => p.status === 'Completed').reduce((acc, payment) => acc + payment.amount, 0)}
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="overflow-auto">
              <Line data={analyticsData} />
            </div>
          </div>
        )}

        {/* Manage Mechanics */}
        {selectedSection === 'manageMechanics' && (
          <div className="overflow-auto">
            <h3 className="text-2xl font-semibold mb-6">Manage Mechanics</h3>
            <button onClick={() => setSelectedSection('addMechanic')} className="bg-blue-500 text-white py-2 px-6 rounded mb-4">
              Add Mechanic
            </button>
            <ul>
              {mechanics.map((mechanic) => (
                <li key={mechanic.id} className="mb-4 p-4 border-b border-gray-700">
                  <div className="flex items-center">
                    <img src={mechanic.profilePic} alt={mechanic.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold">{mechanic.name}</h4>
                      <p>Gender: {mechanic.gender}</p>
                      <p>Skillset: {mechanic.skillset}</p>
                      <p>Experience: {mechanic.experience} years</p>
                      <p>Started: {mechanic.startDate}</p>
                    </div>
                    <button className="ml-auto text-yellow-500 hover:text-yellow-300">Edit</button>
                    <button className="ml-2 text-red-500 hover:text-red-300">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Payments Section */}
        {selectedSection === 'payments' && (
          <div className="overflow-auto">
            <h3 className="text-2xl font-semibold mb-6">Payments</h3>
            <ul>
              {payments.map((payment) => (
                <li key={payment.id} className="mb-4 p-4 border-b border-gray-700">
                  <p>User: {payment.user}</p>
                  <p>Amount: ${payment.amount}</p>
                  <p>Status: {payment.status}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Service Status Section */}
        {selectedSection === 'serviceStatus' && (
          <div className="overflow-auto">
            <h3 className="text-2xl font-semibold mb-6">Service Status</h3>
            <ul>
              {servicesStatus.map((service) => (
                <li key={service.id} className="mb-4 p-4 border-b border-gray-700">
                  <p>Service: {service.serviceName}</p>
                  <p>Status: {service.status}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reviews Section */}
        {selectedSection === 'reviews' && (
          <div className="overflow-auto">
            <h3 className="text-2xl font-semibold mb-6">Reviews</h3>
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="mb-4 p-4 border-b border-gray-700">
                  <p>User: {review.user}</p>
                  <p>Review: {review.review}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Complaints Section */}
        {selectedSection === 'complaints' && (
          <div className="overflow-auto">
            <h3 className="text-2xl font-semibold mb-6">Complaints</h3>
            <ul>
              {complaints.map((complaint) => (
                <li key={complaint.id} className="mb-4 p-4 border-b border-gray-700">
                  <p>User: {complaint.user}</p>
                  <p>Complaint: {complaint.complaint}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
