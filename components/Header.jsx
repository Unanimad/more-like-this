import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full text-gray-700 flex justify-between items-center p-4 shadow-md">
      <div className="text-xl font-bold">
        More-like-this
      </div>
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center space-x-2 hover:bg-gray-700 hover:text-white text-gray-700 font-bold py-2 px-4 rounded"
      >
        <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
      </a>
    </header>
  );
};

export default Header;
