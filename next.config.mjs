/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/pagina_principal',
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;