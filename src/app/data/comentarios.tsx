import { useEffect, useState } from 'react';
import getComentarios from '../services/comentarios';
 '../services/comentarios';

export default function useComentarios(idPub:string) {
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComentarios = async (idPub:string) => {
      const comentarios = await getComentarios(idPub);
      setComentarios(comentarios);
      setLoading(false);
    };

    fetchComentarios(idPub);
  }, []);

  return { comentarios, loading };
}