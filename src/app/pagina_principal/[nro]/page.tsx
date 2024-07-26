"use client";

import useComentarios from "@/app/data/comentarios";
import styles from './page.module.css';
import Loader from "@/app/components/loader/loader";
import { Comentario } from "@/app/types/comentario";
import Boton from "@/app/components/boton/boton";
import { useState } from "react";

export default function Page({ params }: { params: { nro: string } }) {
  const { nro } = params;
  const { comentarios } = useComentarios(nro);
  const rutaPaginaPrincipal: string = process.env.NEXT_PUBLIC_RUTA_PRINCIPAL ?? "";

  const [cargando, setCargando] = useState(true);
  setTimeout(() => {
    setCargando(false);
  }, 3000);

  if (comentarios.length == 0 && cargando == true) {
    return <Loader></Loader>
  }

  if (comentarios.length > 0) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <h2 className={styles.title}>Comentarios</h2>
          <div className={styles.comentarios}>

            {(comentarios).map((comentario: Comentario) => (
              <div key={comentario.id} className={styles.comentario}>
                <p className={styles.emailUsuario}>{comentario.email}</p>
                <p className={styles.nombreComentario}>{comentario.name}</p>
                <p className={styles.contenidoComentario}>{comentario.body}</p>
              </div>
            ))}

          </div>
          <Boton ruta={rutaPaginaPrincipal}></Boton>
        </div>
      </div>
    )
  }
  else {
    return (
      <>
        <div className={styles.texto}>No existe la publicación...</div>
        <Boton ruta={rutaPaginaPrincipal}></Boton>
      </>
    )
  }
}