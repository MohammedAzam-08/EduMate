import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-6 mt-8">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} EduMate. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-blue-400">
            Facebook
          </a>
          <a href="https://www.twitter/w3chad.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-blue-400">
            Twitter
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-blue-400">
            LinkedIn
          </a>
          <a href="https://www.github/web3saad.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-blue-400">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
