"use client";

import useComentarios from "@/app/data/comentarios";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { nro: string } }) {

  const { nro } = params;
  const { comentarios, loading } = useComentarios(nro);
  const router = useRouter();

  const volverPublicaciones = () => {
    router.push('/pagina_principal');
  };

  if (loading) {
    return <div className={styles.cargando}>Cargando comentarios...</div>;
  }

  if (comentarios.length > 0) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <h2 className={styles.title}>Comentarios</h2>
          <div className={styles.comentarios}>

            {(comentarios).map((comentario: any) => (
              <div key={comentario.id} className={styles.comentario}>
                <p className={styles.emailUsuario}>{comentario.email}</p>
                <p className={styles.nombreComentario}>{comentario.name}</p>
                <p className={styles.contenidoComentario}>{comentario.body}</p>
              </div>
            ))}

          </div>
          <button className={styles.botonVolver} onClick={volverPublicaciones}>Volver a publicaciones</button>
        </div>
      </div>
    )
  }
  else {
    return (
      <>
        <div className={styles.cargando}>No existe la publicación...</div>
        <button className={styles.botonVolver} onClick={volverPublicaciones}>Volver a publicaciones</button>
      </>
    )
  }
}