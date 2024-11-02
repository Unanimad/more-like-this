import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <span>&copy; {new Date().getFullYear()} Todos os direitos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;
