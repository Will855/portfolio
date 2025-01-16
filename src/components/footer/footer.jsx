import React from 'react';
import './Footer.css'; // Asegúrate de crear un archivo CSS para los estilos
import { div } from 'framer-motion/client';
import BackgroundNodes from '../backgrounds/bgNodes';

const Footer = () => {
  return (
    <div>
      <footer className="footer text-white p-5 text-center">
        <div className="footer-content mb-3">
          <h3 className='text-xl mb-3 font-semibold'>Contacto</h3>
          <p>Email: <a href="mailto:tuemail@gmail.com">tuemail@gmail.com</a></p>
          <p>Teléfono: <a href="tel:+1234567890">+1 234 567 890</a></p>
          <div className="whatsapp-qr">
            <p>WhatsApp:</p>
            <img src="ruta/a/tu/qr.png" alt="Código QR de WhatsApp" />
          </div>
          <p>
            GitHub: <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer">tuusuario</a>
          </p>
        </div>
        <div className="footer-bottom text-sm mt-3">
          <p>&copy; {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.</p>
        </div>
    </footer>
    </div>
  );
};

export default Footer;