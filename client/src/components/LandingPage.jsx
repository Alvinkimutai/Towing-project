import React from 'react';
import { Link } from 'react-router-dom';

// Import images
import towingImage from '../assets/towing.jpg';
import mechanicImage from '../assets/mechanic.jpg';
import batteryImage from '../assets/battery-replacement-1160x773.jpeg';
import careEmergencyImage from '../assets/caremergency.avif';
import safetyInspectionImage from '../assets/Safety-Inspection.jpg';
import tyreServiceImage from '../assets/tyreservice.jpg'; // Import the new image

const LandingPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Towing Services</h1>
          <div className="space-x-6">
            <Link
              to="/user-dashboard"
              className="text-gray-200 hover:text-white transition duration-200"
            >
              User Dashboard
            </Link>
            <Link
              to="/admin-dashboard"
              className="text-gray-200 hover:text-white transition duration-200"
            >
              Admin Dashboard
            </Link>
            <Link
              to="/mechanic-dashboard"
              className="text-gray-200 hover:text-white transition duration-200"
            >
              Mechanic Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow p-6">
        <header className="text-center py-12">
          <h1 className="text-4xl font-bold text-white">Welcome to Towing Services</h1>
          <p className="text-xl text-gray-400 mt-4">Your one-stop solution for towing and mechanic services.</p>
        </header>

        {/* Services Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center text-white">Our Services</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Towing Service */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-yellow-400">Towing Service</h3>
              <img
                src={towingImage}
                alt="Towing Service"
                className="w-full h-60 object-cover rounded-lg mt-4"
              />
              <p className="text-gray-300 mt-2">
                We offer reliable towing services for all types of vehicles, including flatbed and hook & chain trucks.
              </p>
            </div>

            {/* Mechanical Service */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-yellow-400">Mechanical Service</h3>
              <img
                src={mechanicImage}
                alt="Mechanical Service"
                className="w-full h-60 object-cover rounded-lg mt-4"
              />
              <p className="text-gray-300 mt-2">
                From engine repairs to regular maintenance, we provide comprehensive mechanical services to get your car back on the road.
              </p>
            </div>

            {/* Emergency Assistance */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-yellow-400">Emergency Assistance</h3>
              <img
                src={careEmergencyImage}
                alt="Emergency Assistance"
                className="w-full h-60 object-cover rounded-lg mt-4"
              />
              <p className="text-gray-300 mt-2">
                Our team is available 24/7 for emergency roadside assistance, including battery replacements and fuel delivery.
              </p>
            </div>

            {/* Battery Replacement */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-yellow-400">Battery Replacement</h3>
              <img
                src={batteryImage}
                alt="Battery Replacement"
                className="w-full h-60 object-cover rounded-lg mt-4"
              />
              <p className="text-gray-300 mt-2">
                Quick and efficient battery replacements for any type of vehicle, available on-site.
              </p>
            </div>

            {/* Car Inspection */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-yellow-400">Car Inspection</h3>
              <img
                src={safetyInspectionImage}
                alt="Car Inspection"
                className="w-full h-60 object-cover rounded-lg mt-4"
              />
              <p className="text-gray-300 mt-2">
                Thorough vehicle inspections to ensure your car is in top condition and ready for the road.
              </p>
            </div>

            {/* Tyre Service */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-yellow-400">Tyre Service</h3>
              <img
                src={tyreServiceImage}
                alt="Tyre Service"
                className="w-full h-60 object-cover rounded-lg mt-4"
              />
              <p className="text-gray-300 mt-2">
                We provide tyre fitting, repairs, and replacements for all vehicle types. Stay safe on the road with our quality tyre services.
              </p>
            </div>
          </div>
        </div>

        {/* Client Testimonial Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-center text-white">What Our Clients Say</h2>
          <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
            <p className="text-gray-300">"This towing service saved me in a pinch! Quick, reliable, and professional. Highly recommended!"</p>
            <h4 className="text-yellow-400 mt-4">Steve John</h4>
            <p className="text-gray-500">Satisfied Customer</p>
          </div>
        </section>
      </main>

      {/* Footer with Contact and Social Media */}
      <footer className="bg-gray-900 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 Towing Services. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="mailto:contact@towingservices.com" className="text-gray-200 hover:text-white">Email Us</a>
            <a href="tel:+1234567890" className="text-gray-200 hover:text-white">Call Us</a>
          </div>
          <div className="mt-4 space-x-6">
            {/* Social Media Icons */}
            <a href="https://facebook.com/towingservices" className="text-gray-200 hover:text-white">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com/towingservices" className="text-gray-200 hover:text-white">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://instagram.com/towingservices" className="text-gray-200 hover:text-white">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
