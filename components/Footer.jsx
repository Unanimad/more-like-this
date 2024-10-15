import React from 'react';

const Footer = () => {
    return (
        <footer className="absolute bottom-0">
            <span>&copy; {new Date().getFullYear()} Todos os direitos reservados.</span>
        </footer>
    );
};

export default Footer;
