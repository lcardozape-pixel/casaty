import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Optimización de imágenes (activar AVIF para mayor compresión que WebP)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rrwluugzhnqpiedloysl.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'app.honectapro.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // Caché de 1 año para imágenes (muy importante para Hostinger)
  },

  // 2. Compresión Gzip activada
  compress: true,

  // 3. Optimización de paquetes (reduce peso de JS)
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'clsx', 'tailwind-merge'],
  },

  // 4. Headers de caché agresivos para estáticos
  /* Desactivado temporalmente para diagnosticar persistencia de cambios
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/Imagenes/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      }
    ];
  },
  */
  // 4. Redirecciones 301 para limpiar errores 404 de la migración de WordPress
  async redirects() {
    return [
      // Redirección de página duplicada
      {
        source: '/solicitar-credito-hipotecario-en-piura-2',
        destination: '/solicitar-credito-hipotecario-en-piura',
        permanent: true,
      },
      // Redirección de estados de venta/alquiler
      {
        source: '/estado/en-venta',
        destination: '/propiedades?operacion=venta',
        permanent: true,
      },
      {
        source: '/estado/en-alquiler',
        destination: '/propiedades?operacion=alquiler',
        permanent: true,
      },
      // Redirección de taxonomías (características y etiquetas) a la búsqueda general
      {
        source: '/caracteristica/:slug',
        destination: '/propiedades?q=:slug',
        permanent: true,
      },
      {
        source: '/etiqueta/:slug',
        destination: '/propiedades?q=:slug',
        permanent: true,
      },
      {
        source: '/estado/:slug',
        destination: '/propiedades',
        permanent: true,
      },
      // Redirección de todas las propiedades viejas al catálogo actual
      // (Como los IDs cambiaron, se envían al listado para no perder al usuario)
      {
        source: '/propiedad/:slug',
        destination: '/propiedades',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
