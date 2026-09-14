import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` sirve la app también en la IP de la LAN (la "Network URL" que
  // imprime al arrancar), pero Next bloquea con 403 las peticiones cross-origin
  // a /_next/* si el host no está en esta lista. Al abrir el CV desde el móvil o
  // desde 192.168.x.x no cargaba ningún chunk de JS: la página se veía porque el
  // HTML llega por SSR, pero no hidrataba y ningún botón respondía (ni el de
  // idioma ni el de descargar PDF). Sólo aplica en desarrollo.
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
