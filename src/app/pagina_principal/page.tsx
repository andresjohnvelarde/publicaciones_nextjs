"use client";

import usePublicaciones from "../data/publicaciones";
import styles from './page.module.css';
import imagen_b from '../../assets/imagenes/buscar.jpg';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
export default function Page() {

  const router = useRouter();
  const { publicaciones, loading } = usePublicaciones();
  const publicacionesPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPages = Math.ceil(publicaciones.length / publicacionesPorPagina);
  const [buscar, setBuscar] = useState("");
  const [publicacionesVisibles, setPublicacionesVisibles] = useState(obtenerPublicacionesPorPagina(paginaActual));

  function obtenerPublicacionesPorPagina(page: number) {
    return publicaciones.slice(
      (page - 1) * publicacionesPorPagina,
      page * publicacionesPorPagina)
  }

  // Este fragmento de código permite obtener y visualizar las publicaciones de la primera página.
  useEffect(() => {
    setPublicacionesVisibles(obtenerPublicacionesPorPagina(paginaActual))
  }, [publicaciones]);

   // Este fragmento de código permite obtener y visualizar las publicaciones con título o contenido que coincida con la variable buscar.
  useEffect(() => {
    setPublicacionesVisibles(publicaciones.slice(
      (paginaActual - 1) * publicacionesPorPagina,
      paginaActual * publicacionesPorPagina
    ))
    if (buscar != "") {
      setPublicacionesVisibles(publicaciones.filter((not) => not.body.toLowerCase().includes(buscar) || not.title.toLowerCase().includes(buscar)).slice((paginaActual - 1) * publicacionesPorPagina, paginaActual * publicacionesPorPagina));
    }
  }, [buscar]);

  const cambiarDePagina = (page: number) => {
    setPaginaActual(page);
    setPublicacionesVisibles(obtenerPublicacionesPorPagina(page))
  };

  const verComentario = (idPublicacion: any) => {
    router.push('/pagina_principal/'+idPublicacion);
  };

  if (loading) {
    return <div className={styles.cargando}>Cargando publicaciones...</div>;
  }

  return (
    <div>
      <div className={styles.encabezado}>
        <p className={styles.titulo}>Publicaciones</p>

        <input
          className={styles.buscador}
          type="text"
          placeholder="Buscar por título o contenido..."
          value={buscar}
          onChange={(event) => setBuscar(event.target.value)}
        />
        <button className={styles.boton_buscar}>
          <Image
            src={imagen_b}
            alt=""
            width={25}
            height={25}
          />
        </button>
      </div>

      <div className={styles.contenedor_tabla}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <td className={styles.tabla_encabezado}>Id</td>
              <td className={styles.tabla_encabezado}>Título</td>
              <td className={styles.tabla_encabezado}>Descripción</td>
              <td className={styles.tabla_encabezado}>Usuario</td>
            </tr>
          </thead>

          <tbody>
            {(publicacionesVisibles).map((publicacion: any) => (
              <tr key={publicacion.id}
                onClick={() => verComentario(publicacion.id)}>
                <td className={styles.tabla_datos_id}>{publicacion.id}</td>
                <td className={styles.tabla_datos_titulo}>{publicacion.title}</td>
                <td className={styles.tabla_datos_contenido}>{publicacion.body}</td>
                <td className={styles.tabla_datos_id}>{publicacion.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => cambiarDePagina(index + 1)}
            disabled={paginaActual === index + 1}
            className={styles.page_button}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}