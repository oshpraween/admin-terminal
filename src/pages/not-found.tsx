import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-background-dark">
      <div className="max-w-md w-full p-8 bg-white dark:bg-card-dark rounded-lg shadow-lg text-center">
        <h1 className="text-8xl font-bold text-primary-500 dark:text-primary-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-3 text-text-light dark:text-text-dark">
          Page not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors dark:bg-primary-700 dark:hover:bg-primary-600"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
