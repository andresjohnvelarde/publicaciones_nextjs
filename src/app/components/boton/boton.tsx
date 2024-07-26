import React from 'react';
import styles from './boton.module.css';
import { useRouter } from 'next/navigation';

interface BotonProps {
  ruta: string;
}

export default function Boton({ ruta }: BotonProps) {
  const router = useRouter();
  const volverPublicaciones = () => {
    router.push(ruta);
  };
  return (
    <button className={styles.botonVolver} onClick={volverPublicaciones}>Volver a publicaciones</button>
  );
};