export default async function getComentarios(idPublicacion:string) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/'+idPublicacion+'/comments');
    const data = await res.json();
    return data;
  }