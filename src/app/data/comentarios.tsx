import { useEffect, useState } from 'react';
import getComentarios from '../services/comentarios';
import { Comentario } from '../types/comentario';
'../services/comentarios';

export default function useComentarios(idPub: string) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  useEffect(() => {
    const fetchComentarios = async (idPub: string) => {
      const comentarios = await getComentarios(idPub);
      setComentarios(comentarios);
    };
    fetchComentarios(idPub);
  }, []);

  return { comentarios };
}