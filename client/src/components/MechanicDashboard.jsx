import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FaTachometerAlt, FaCreditCard, FaRegClock, FaBell, FaInbox, FaUserAlt, FaArrowLeft } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const MechanicDashboard = () => {
  const navigate = useNavigate(); // Create a navigate instance for programmatic navigation
  const [activeSection, setActiveSection] = useState('analytics');
  const [serviceRequests, setServiceRequests] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [analytics, setAnalytics] = useState({
    waitingClients: 0,
    completedOrders: 0,
    totalPayments: 0,
    performanceData: [],
  });

  useEffect(() => {
    fetchServiceRequests();
    fetchPaymentHistory();
    fetchNotifications();
    fetchMessages();
    calculateAnalytics();
  }, []);

  // Mock data fetching
  const fetchServiceRequests = async () => {
    setServiceRequests([
      { id: 1, serviceType: 'Towing', customerName: 'John Doe', status: 'Not Started', date: '2024-10-01' },
      { id: 2, serviceType: 'Mechanical', customerName: 'Jane Smith', status: 'In Progress', date: '2024-10-05' },
      { id: 3, serviceType: 'Towing', customerName: 'Mary Johnson', status: 'Finished', date: '2024-10-10' },
    ]);
  };

  const fetchPaymentHistory = async () => {
    setPaymentHistory([
      { id: 1, customerName: 'John Doe', amount: 100, date: '2024-10-01', status: 'Paid' },
      { id: 2, customerName: 'Jane Smith', amount: 150, date: '2024-10-05', status: 'Paid' },
      { id: 3, customerName: 'Mary Johnson', amount: 100, date: '2024-10-10', status: 'Paid' },
    ]);
  };

  const fetchNotifications = async () => {
    setNotifications([
      { id: 1, message: 'New service request for Towing from John Doe', type: 'request' },
      { id: 2, message: 'Your service request is now Ongoing for Jane Smith', type: 'update' },
      { id: 3, message: 'New message from client: John Doe: "Can you please confirm the timing?"', type: 'message' },
    ]);
  };

  const fetchMessages = async () => {
    setMessages([
      { id: 1, from: 'John Doe', content: 'Can you please confirm the timing?', status: 'unread' },
      { id: 2, from: 'Jane Smith', content: 'Is the mechanical service still on track?', status: 'read' },
    ]);
  };

  const calculateAnalytics = () => {
    const waitingClients = serviceRequests.filter((request) => request.status === 'Not Started').length;
    const completedOrders = serviceRequests.filter((request) => request.status === 'Finished').length;
    const totalPayments = paymentHistory.reduce((total, payment) => total + payment.amount, 0);

    const performanceData = serviceRequests.reduce((acc, request) => {
      const date = request.date.split('-').slice(1).join('-');
      if (!acc[date]) {
        acc[date] = { completed: 0, pending: 0, payments: 0 };
      }
      if (request.status === 'Finished') acc[date].completed += 1;
      if (request.status === 'Not Started') acc[date].pending += 1;
      const payment = paymentHistory.find((payment) => payment.customerName === request.customerName);
      if (payment) acc[date].payments += payment.amount;
      return acc;
    }, {});

    const labels = Object.keys(performanceData);
    const completedData = labels.map((date) => performanceData[date].completed);
    const pendingData = labels.map((date) => performanceData[date].pending);
    const paymentsData = labels.map((date) => performanceData[date].payments);

    setAnalytics({
      waitingClients,
      completedOrders,
      totalPayments,
      performanceData: { labels, completedData, pendingData, paymentsData },
    });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Mechanic Performance',
        color: 'white',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          title: function (tooltipItems) {
            return `Date: ${tooltipItems[0].label}`;
          },
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: analytics.performanceData.labels,
        title: {
          display: true,
          text: 'Date',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count/Amount',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  const chartData = {
    labels: analytics.performanceData.labels || [],
    datasets: [
      {
        type: 'bar',
        label: 'Completed Orders',
        data: analytics.performanceData.completedData || [],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.7)',
        fill: true,
      },
      {
        type: 'bar',
        label: 'Pending Orders',
        data: analytics.performanceData.pendingData || [],
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.7)',
        fill: true,
      },
      {
        type: 'line',
        label: 'Total Payments ($)',
        data: analytics.performanceData.paymentsData || [],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-6 fixed md:relative md:h-full z-10 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Mechanic Dashboard</h2>
        <ul className="space-y-4">
          {[
            { name: 'serviceRequests', icon: <FaRegClock /> },
            { name: 'paymentHistory', icon: <FaCreditCard /> },
            { name: 'notifications', icon: <FaBell /> },
            { name: 'messages', icon: <FaInbox /> },
            { name: 'analytics', icon: <FaUserAlt /> },
          ].map((section) => (
            <li key={section.name}>
              <button
                onClick={() => setActiveSection(section.name)}
                className={`flex items-center space-x-4 py-3 text-left px-4 rounded hover:bg-gray-700 transition duration-300 ease-in-out ${activeSection === section.name ? 'bg-gray-700' : ''}`}
              >
                <span className="text-2xl">{section.icon}</span>
                <span className="text-lg font-medium">
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1).replace(/([A-Z])/g, ' $1')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:w-3/4 p-6 md:ml-1/4 overflow-auto md:pl-24">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')} // Navigate to the landing page
            className="flex items-center text-blue-400 hover:text-white transition duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Landing
          </button>
          <h3 className="text-3xl font-bold text-blue-400">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/([A-Z])/g, ' $1')}
          </h3>
        </div>

        {/* Dynamic Content */}
        {activeSection === 'analytics' && (
          <div>
            <h4 className="text-xl font-bold mb-4">Analytics</h4>
            <ul className="space-y-4 mb-6">
              <li className="p-4 bg-gray-800 rounded-md">Waiting Clients: {analytics.waitingClients}</li>
              <li className="p-4 bg-gray-800 rounded-md">Completed Orders: {analytics.completedOrders}</li>
              <li className="p-4 bg-gray-800 rounded-md">Total Payments: ${analytics.totalPayments}</li>
            </ul>
            <div className="bg-gray-800 p-6 rounded-md shadow-lg">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Other sections (Service Requests, Payment History, etc.) */}
      </div>
    </div>
  );
};

export default MechanicDashboard;
