import React, { useEffect, useRef } from 'react'; // Importamos React y useRef
import { gsap } from 'gsap'; // Importamos GSAP para animaciones
import IonIcon from '@reacticons/ionicons';

const WordCloud = () => {
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]); // Referencia para los iconos
  const words = [
    { name: 'logo-javascript', icon: <IonIcon name="logo-javascript" className='hover:text-yellow-500'/> },
    { name: 'logo-github', icon: <IonIcon name="logo-github" /> },
    { name: 'logo-sql', icon: <IonIcon name="server" className='hover:text-green-600'/> },
    { name: 'logo-laravel', icon: <IonIcon name="logo-laravel" className='hover:text-orange-600'/> },
    { name: 'logo-sass', icon: <IonIcon name="logo-sass" className='hover:text-purple-700'/> },
    // { name: 'logo-bootstrap', icon: <IonIcon name="logo-bootstrap" /> },
    // { name: 'php', icon: <IonIcon name="logo-sqlite" /> },
    { name: 'logo-python', icon: <IonIcon name="logo-python" className='hover:text-blue-700'/> },
    { name: 'logo-css3', icon: <IonIcon name="logo-css3" className='hover:text-blue-800'/> },
    { name: 'logo-html5', icon: <IonIcon name="logo-html5" className='hover:text-orange-500'/> }
  ]; // Lista de iconos

  // Función para generar un tamaño aleatorio entre 10 y 24
  const getRandomSize = () => Math.floor(Math.random() * (20 - 5 + 5)) + 20;

  // Función que se activa al mover el mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e; // Obtenemos la posición del mouse
    wordsRef.current.forEach((word) => {
      if (word) {
        const rect = word.getBoundingClientRect(); // Obtenemos el tamaño y posición del icono
        const x = rect.left + rect.width / 2; // Calculamos el centro en X
        const y = rect.top + rect.height / 2; // Calculamos el centro en Y
        const deltaX = clientX - x; // Diferencia en X
        const deltaY = clientY - y; // Diferencia en Y

        // Animamos el icono para que se aleje del mouse
        gsap.to(word, {
          x: (deltaX / 10) * -1, // Movemos en dirección opuesta al mouse
          y: (deltaY / 10) * -1, // Movemos en dirección opuesta al mouse
          duration: 0.5,
          ease: 'power1.out'
        });
      }
    });
  };

  // Función que se activa al entrar el mouse en un icono
  const handleMouseEnter = (index: number) => {
    if (wordsRef.current[index]) {
      gsap.to(wordsRef.current[index], {
        scale: 2.5, // Aumentamos el tamaño del icono
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  };

  // Función que se activa al salir el mouse de un icono
  const handleMouseLeave = (index: number) => {
    if (wordsRef.current[index]) {
      gsap.to(wordsRef.current[index], {
        scale: 1.5, // Regresamos al tamaño original
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  };

  // Usamos useEffect para limpiar el código y evitar fugas de memoria
  useEffect(() => {
    const handleMouseLeaveWindow = () => {
      // Función para manejar el evento de salir de la ventana
      wordsRef.current.forEach((word) => {
        if (word) {
          gsap.to(word, {
            x: 0, // Regresamos a la posición original
            y: 0,
            duration: 0.5,
            ease: 'elastic.out'
          });
        }
      });
    };

    window.addEventListener('mouseleave', handleMouseLeaveWindow); // Agregamos el evento

    // Limpiamos el evento al desmontar el componente
    return () => {
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove} // Evento para mover el mouse
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '15rem', position: 'relative', alignContent: 'center' }}
      id='skills'
    >
      {words.map((word, index) => (
        <div
          key={index}
          ref={el => wordsRef.current[index] = el} // Asignamos la referencia
          style={{
            fontSize: `${getRandomSize()}px`, // Tamaño aleatorio inicial
            margin: '20px',
            opacity: 1.8,
            transition: 'opacity 0.5s',
            cursor: 'pointer'
          }}
          onMouseEnter={() => handleMouseEnter(index)} // Evento al entrar
          onMouseLeave={() => handleMouseLeave(index)} // Evento al salir
        >
          {word.icon} {/* Renderizamos el icono */}
        </div>
      ))}
    </div>
  );
};

export default WordCloud; // Exportamos el componente