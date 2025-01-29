'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import IonIcon from '@reacticons/ionicons';
import axios from 'axios';

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
  const [error, setError] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validar los datos del formulario
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setError('Por favor, completa todos los campos del formulario.');
        return;
      }

      if (!isValidEmail(formData.email)) {
        setError('Por favor, ingresa un correo electrónico válido.');
        return;
      }

      if (formData.phone && !/^\d{11}$/.test(formData.phone)) {
        setError('Por favor, ingresa un número de teléfono válido (11 dígitos).');
        return;
      }

      // Crear un objeto FormData
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message);

      // Enviar los datos al servidor usando Axios
      const response = await axios.post('http://localhost/api/sendForm.php', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Asegurarse de que se envíe como formulario
        },
      });

      if (response.data.status === 'success') {
        setResponseMessage(response.data.message);
        setError('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setResponseMessage('');
        setError(response.data.message || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setResponseMessage('');
      setError('Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const isValidEmail = (email) => {
    // Expresión regular básica para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 overflow-hidden mt-12">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/5 p-8 rounded-lg shadow-xl relative z-10 backdrop-filter backdrop-blur-sm bg-opacity-80"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
          Contáctame
        </h2>
        <div className="space-y-4">
          <Input label="Nombre" name="name" type="text" placeholder="Your name" onChange={handleChange} />
          <Input label="Email" name="email" type="email" placeholder="your@email.com" onChange={handleChange} />
          <Input label="Telefono" name="phone" type="tel" placeholder="Your phone number" onChange={handleChange} />
          <div className="relative">
            <label htmlFor="message" className="text-[#f0f8ff] block mb-2">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              onChange={handleChange}
              className="w-full px-3 py-2 text-[#f0f8ff] bg-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0f8ff] transition-all duration-300 ease-in-out"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4a4a4a] to-[#3a3a3a] text-[#f0f8ff] py-2 px-4 rounded-md hover:from-[#5a5a5a] hover:to-[#4a4a4a] transition-all duration-300 ease-in-out"
          >
            Enviar
          </button>
        </div>
        {responseMessage && <p className="text-center text-[#f0f8ff] mt-4">{responseMessage}</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
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
      onChange={onChange}
      className="w-full px-3 py-2 text-[#f0f8ff] bg-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0f8ff] transition-all duration-300 ease-in-out"
      placeholder={placeholder}
    />
  </div>
);

export default ContactForm;