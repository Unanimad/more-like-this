import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 py-4 mt-8 z-1 relative">
      <div className="container mx-auto text-center">
        <span>&copy; {new Date().getFullYear()} Todos os direitos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;
