import { useEffect, useState } from 'react';
import getPublicaciones from '../services/publicaciones';

export default function usePublicaciones() {
  const [publicaciones, setPublicaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      const publicaciones = await getPublicaciones();
      setPublicaciones(publicaciones);
      setLoading(false);
    };

    fetchPublicaciones();
  }, []);

  return { publicaciones, loading };
}