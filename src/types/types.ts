// types/types.ts
export interface CardProps {
  id: string;
  title: string;
  description: string;
  img: string; // Cambiar de img a imgSrc
  buttonText?: string; // Hacerla opcional si no es necesaria
}