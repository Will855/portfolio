'use client';
import React from 'react';
import '../App.css';
import Footer from '../components/footer/footer';
import InformationContent from '../components/information/informationContent';

// Componente principal que renderiza el fondo
function Information() {

  return (<>
    <div className="w-full max-h-screen overflow-scroll flex flex-col sm:justify-between pt-32 gap-20">
        <div>
          <InformationContent/>
        </div>
        <div>
        <Footer/>
        </div>
      </div> 
    </>
  );
}

export default Information; // Exportar el componente principal
