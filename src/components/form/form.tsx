'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import IonIcon from '@reacticons/ionicons';
import axios from 'axios'; // Importar Axios

const ContactForm = () => {
  const formRef = useRef(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    timelineRef.current = gsap.timeline({ repeat: -1, yoyo: true });

    timelineRef.current
      .to(formRef.current, {
        boxShadow: '0 0 20px rgba(240, 248, 255, 0.5)',
        duration: 2,
        repeat: -1,
        yoyo: true,
      }, 0);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      // Enviar los datos al servidor usando Axios
      const response = await axios.post('http://localhost/server/form.php', formData);
      setResponseMessage(response.data.message); // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setResponseMessage('Error al enviar el mensaje.'); // Manejar el error
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 overflow-hidden mt-12">
      <form
        ref={formRef}
        onSubmit={handleSubmit} // Agregar el manejador de envío
        className="w-full max-w-lg bg-[#2a2a2a] p-8 rounded-lg shadow-xl relative z-10 backdrop-filter backdrop-blur-sm bg-opacity-80"
      >
        <h2 className="text-3xl font-bold mb-6 text-[#f0f8ff] text-center">Contact Us</h2>
        <div className="space-y-4">
          <Input label="Name" name="name" type="text" placeholder="Your name" onChange={handleChange}/>
          <Input label="Email" name="email" type="email" placeholder="your@email.com" onChange={handleChange} />
          <Input label="Phone" name="phone" type="tel" placeholder="Your phone number" onChange={handleChange} />
          <div className="relative">
            <label htmlFor="message" className="text-[#f0f8ff] block mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              onChange={handleChange} // Agregar el manejador de cambios
              className="w-full px-3 py-2 text-[#f0f8ff] bg-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0f8ff] transition-all duration-300 ease-in-out"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4a4a4a] to-[#3a3a3a] text-[#f0f8ff] py-2 px-4 rounded-md hover:from-[#5a5a5a] hover:to-[#4a4a4a] transition-all duration-300 ease-in-out"
          >
            Send Message
          </button>
        </div>
        {responseMessage && <p className="text-center text-[#f0f8ff] mt-4">{responseMessage}</p>} {/* Mensaje de respuesta */}
        <div className="flex justify-center space-x-4 mt-6 text-white text-2xl">
          <IonIcon className='cursor-pointer' name="logo-whatsapp"></IonIcon>
          <IonIcon className='cursor-pointer' name="logo-instagram"></IonIcon>
          <IonIcon className='cursor-pointer' name="logo-github"></IonIcon>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, name, type, placeholder, onChange }) => (
  <div className="relative">
    <label htmlFor={name} className="text-[#f0f8ff] block mb-2">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      onChange={onChange} // Agregar el manejador de cambios
      className="w-full px-3 py-2 text-[#f0f8ff] bg-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0f8ff] transition-all duration-300 ease-in-out"
      placeholder={placeholder}
    />
  </div>
);

export default ContactForm;