import { useEffect, useState } from 'react';
import getPublicaciones from '../services/publicaciones';
import { Publicacion } from '../types/publicacion';

export default function usePublicaciones() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      const publicaciones = await getPublicaciones();
      setPublicaciones(publicaciones);
    };
    fetchPublicaciones();
  }, []);

  return { publicaciones };
}