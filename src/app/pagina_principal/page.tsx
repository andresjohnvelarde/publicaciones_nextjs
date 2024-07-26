"use client";

import usePublicaciones from "../data/publicaciones";
import styles from './page.module.css';
import imagen_b from '../../assets/imagenes/buscar.jpg';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import useUsuarios from "../data/usuarios";
import { Usuario } from "../types/usuario";
import Loader from "../components/loader/loader";
import { Publicacion } from "../types/publicacion";

export default function Page() {
  const router = useRouter();
  const { publicaciones } = usePublicaciones();
  const { usuarios } = useUsuarios();
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

  function obtenerUsuario(id: number) {
    var nombre = "";
    if (usuarios) {
      const usuario: Usuario | undefined = usuarios.find((usuario) => usuario.id == id);
      if (usuario != undefined) {
        nombre = usuario.name;
      }
    }
    return nombre;
  }

  // Este fragmento de código permite obtener y visualizar las publicaciones de la primera página.
  useEffect(() => {
    setPublicacionesVisibles(obtenerPublicacionesPorPagina(paginaActual))
  }, [publicaciones]);

  // Este fragmento de código permite obtener y visualizar las publicaciones con título o 
  // contenido que coincida con la variable buscar.
  useEffect(() => {
    setPublicacionesVisibles(publicaciones.slice(
      (paginaActual - 1) * publicacionesPorPagina,
      paginaActual * publicacionesPorPagina
    ))
    if (buscar != "") {
      setPublicacionesVisibles(publicaciones.filter((publicacion) => publicacion.body.toLowerCase().includes(buscar) ||
        publicacion.title.toLowerCase().includes(buscar)).slice((paginaActual - 1) *
          publicacionesPorPagina, paginaActual * publicacionesPorPagina));
    }
  }, [buscar]);

  const cambiarDePagina = (page: number) => {
    setPaginaActual(page);
    setPublicacionesVisibles(obtenerPublicacionesPorPagina(page))
  };

  const verComentario = (idPublicacion: number) => {
    router.push('/pagina_principal/' + idPublicacion);
  };

  if (publicaciones.length == 0) {
    return <Loader></Loader>
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
              <td className={styles.tabla_encabezado}>Nro</td>
              <td className={styles.tabla_encabezado}>Título</td>
              <td className={styles.tabla_encabezado}>Descripción</td>
              <td className={styles.tabla_encabezado}>Usuario</td>
            </tr>
          </thead>

          <tbody>
            {(publicacionesVisibles).map((publicacion: Publicacion) => (
              <tr key={publicacion.id}
                onClick={() => verComentario(publicacion.id)}>
                <td className={styles.tabla_datos_id}>{publicacion.id}</td>
                <td className={styles.tabla_datos_titulo}>{publicacion.title}</td>
                <td className={styles.tabla_datos_contenido}>{publicacion.body}</td>
                <td className={styles.tabla_datos_usuario}>{obtenerUsuario(publicacion.userId)}</td>
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