import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -z-10"></div>

     
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center animate-fadeIn">
        Welcome to <span className="text-blue-600">product management</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl animate-fadeIn delay-100">
        Explore the best fake products around the globe. High-quality UI, smooth transitions, and blazing fast performance.
      </p>
      <Link
        to="/products"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg transition duration-300 animate-fadeIn delay-200"
      >
        Go to Product Page
      </Link>
    </div>
  );
};

export default Home;
