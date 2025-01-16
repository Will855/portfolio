import React from 'react';
import  { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from "./components/navbar/NavMenu.tsx";
import { Home } from './pages/home.jsx';
import  Information  from './pages/information.tsx'
import { Proyects } from './pages/proyects.jsx';
import { Contact } from './pages/contact.jsx';
import BackgroundStars from './components/backgrounds/bgStars.js';
import BackgroundNodes from './components/backgrounds/bgNodes.tsx';
import ResponsiveMenu from './components/navbar/menuResponsive.tsx';
import CardDetails from './components/infoPage/carDetails.tsx';

function App() {
  return (
    <Router>
        <NavMenu />
        <BackgroundNodes/>
        <BackgroundStars/> //Responsive
        <ResponsiveMenu/> //Responsive
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/informacion" element={<Information/>} />
          <Route path="/proyectos" element={<Proyects />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/page/:id" element={<CardDetails />} />
        </Routes>
    </Router>
  )
}

export default App

