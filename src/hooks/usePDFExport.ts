import { useCallback } from "react";

/**
 * Exporta el CV a PDF por la vía nativa del navegador.
 *
 * Se imprime la propia página (no un clon en iframe) para que el CSS de
 * Tailwind v4 se aplique tal cual; el layout A4 vive en globals.css. La
 * salida es texto vectorial y seleccionable, que es lo que necesitan los
 * filtros ATS de reclutamiento — un PDF rasterizado no se puede parsear.
 */
export const usePDFExport = () => {
  // Las imágenes a medio cargar salen en blanco en el PDF.
  const preloadImages = useCallback(async (): Promise<void> => {
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>("#cv-preview img"),
    );

    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise<void>((resolve) => {
          // Se resuelve también en error: un logo que falla no debe
          // bloquear la exportación (la tarjeta ya tiene su fallback).
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
      }),
    );
  }, []);

  const exportToPDF = useCallback(async (): Promise<void> => {
    await preloadImages();

    // Deja al navegador aplicar los estilos de @media print antes de abrir
    // el diálogo, si no la primera hoja puede salir con el layout de pantalla.
    await new Promise((resolve) => requestAnimationFrame(resolve));

    window.print();
  }, [preloadImages]);

  return { exportToPDF };
};
