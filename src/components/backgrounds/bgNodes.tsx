'use client'; // Indica que este componente se ejecuta en el lado del cliente

import React, { useRef, useMemo, useEffect } from 'react'; // Importa React y hooks necesarios
import { Canvas, useFrame } from '@react-three/fiber'; // Importa Canvas y useFrame de la biblioteca de React Three Fiber
import * as THREE from 'three'; // Importa la biblioteca Three.js

const NODE_COUNT = 2000; // Define el número total de nodos
const ACTIVE_CONNECTIONS_PERCENT = 1; // Define el porcentaje de conexiones activas
const MAX_DISTANCE = 55; // Define la distancia máxima para conectar nodos

function Nodes() {
  const pointsRef = useRef<THREE.Points>(null!); // Crea una referencia para los puntos
  const linesRef = useRef<THREE.LineSegments>(null!); // Crea una referencia para las líneas

  // Usa useMemo para calcular posiciones y colores de los nodos
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 6); // Crea un array para las posiciones de los nodos
    const colors = new Float32Array(NODE_COUNT * 4); // Crea un array para los colores de los nodos
    const color = new THREE.Color(0xFFFFFF); // Define un color blanco

    // Genera posiciones aleatorias para cada nodo
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * window.innerWidth; // Genera una posición X aleatoria
      const y = (Math.random() - 0.5) * window.innerHeight; // Genera una posición Y aleatoria
      const z = (Math.random() - 0.5) * 300; // Genera una posición Z aleatoria

      positions[i * 3] = x; // Asigna la posición X al array
      positions[i * 3 + 1] = y; // Asigna la posición Y al array
      positions[i * 3 + 2] = z; // Asigna la posición Z al array

      color.toArray(colors, i * 3); // Convierte el color a un array y lo asigna
    }

    return [positions, colors]; // Devuelve las posiciones y colores
  }, []);

  // Crea un array para las posiciones de las líneas
  const linePositions = useMemo(() => new Float32Array(NODE_COUNT * NODE_COUNT * 3 * 2), []);
  // Crea un array para los colores de las líneas
  const lineColors = useMemo(() => new Float32Array(NODE_COUNT * NODE_COUNT * 3 * 2), []);

  // Usa useFrame para actualizar las líneas en cada frame
  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return; // Verifica que las referencias existan

    const time = state.clock.getElapsedTime(); // Obtiene el tiempo transcurrido
    let lineIndex = 0; // Inicializa el índice de las líneas

    // Itera sobre cada par de nodos
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3]; // Calcula la diferencia en X
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]; // Calcula la diferencia en Y
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]; // Calcula la diferencia en Z
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz); // Calcula la distancia entre nodos

        // Verifica si la distancia es menor que la máxima permitida
        if (distance < MAX_DISTANCE) {
          const shouldConnect = Math.sin(time * 0.5 + i * j) > 1 - ACTIVE_CONNECTIONS_PERCENT; // Determina si se debe conectar

          if (shouldConnect) {
            // Asigna las posiciones de la línea
            linePositions[lineIndex * 6] = positions[i * 3];
            linePositions[lineIndex * 6 + 1] = positions[i * 3 + 1];
            linePositions[lineIndex * 6 + 2] = positions[i * 3 + 2];
            linePositions[lineIndex * 6 + 3] = positions[j * 3];
            linePositions[lineIndex * 6 + 4] = positions[j * 3 + 1];
            linePositions[lineIndex * 6 + 5] = positions[j * 3 + 2];

            const alpha = 1 - distance / MAX_DISTANCE; // Calcula la opacidad basada en la distancia
            // Asigna los colores de la línea
            lineColors[lineIndex * 6] = colors[i * 3] * alpha;
            lineColors[lineIndex * 6 + 1] = colors[i * 3 + 1] * alpha;
            lineColors[lineIndex * 6 + 2] = colors[i * 3 + 2] * alpha;
            lineColors[lineIndex * 6 + 3] = colors[j * 3] * alpha;
            lineColors[lineIndex * 6 + 4] = colors[j * 3 + 1] * alpha;
            lineColors[lineIndex * 6 + 5] = colors[j * 3 + 2] * alpha;

            lineIndex++; // Incrementa el índice de la línea
          }
        }
      }
    }

    // Actualiza la geometría de las líneas con las nuevas posiciones y colores
    linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIndex * 6), 3));
    linesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(lineColors.slice(0, lineIndex * 6), 3));
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2); // Establece el rango de dibujo
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={NODE_COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={NODE_COUNT} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.5} toneMapped />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={0} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={0} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial toneMapped />
      </lineSegments>
    </>
  );
}

const BackgroundNodes = () => {
  return (
    <Canvas
      className="hidden sm:block w-full h-full -z-10 nodeBg"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <Nodes />
    </Canvas>
  );
};

export default BackgroundNodes;