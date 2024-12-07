import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full bg-white text-gray-700 flex justify-between items-end p-4">
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-end space-x-2 hover:bg-gray-700 hover:text-white text-gray-700 font-bold py-2 px-4 rounded ml-auto"
      >
        <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
      </a>
    </header>
  );
};

export default Header;
