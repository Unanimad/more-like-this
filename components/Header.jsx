import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white flex justify-between items-center p-4 shadow-md">
      <div className="text-xl font-bold">
        More-like-this
      </div>
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
      >
        <svg 
          className="w-6 h-6" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fillRule="evenodd" 
            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.201 2.393.099 2.646.64.699 1.029 1.592 1.029 2.683 0 3.842-2.337 4.687-4.563 4.935.36.31.682.92.682 1.855 0 1.338-.012 2.419-.012 2.75 0 .267.18.577.688.48C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" 
            clipRule="evenodd"
          />
        </svg>
        <span>GitHub</span>
      </a>
    </header>
  );
};

export default Header;
