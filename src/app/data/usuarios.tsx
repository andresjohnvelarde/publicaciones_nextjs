import { useEffect, useState } from 'react';
import getUsuarios from '../services/usuarios';
import { Usuario } from '../types/usuario';

export default function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuarios = await getUsuarios();
      setUsuarios(usuarios);
      setLoading2(false);
    };

    fetchUsuarios();
  }, []);

  return { usuarios, loading2 };
}