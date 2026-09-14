import { useCallback } from "react";
import { useCV } from "@/context/CVContext";
import { pdfDocumentName } from "@/lib/pdfName";

/**
 * Exporta el CV a PDF por la vía nativa del navegador.
 *
 * Se imprime la propia página (no un clon en iframe) para que el CSS de
 * Tailwind v4 se aplique tal cual; el layout A4 vive en globals.css. La
 * salida es texto vectorial y seleccionable, que es lo que necesitan los
 * filtros ATS de reclutamiento — un PDF rasterizado no se puede parsear.
 */
/** Tope de espera de imágenes: pasado esto se imprime igual. */
const IMAGE_LOAD_TIMEOUT_MS = 3000;

export const usePDFExport = () => {
  const { cvData } = useCV();

  // Las imágenes a medio cargar salen en blanco en el PDF.
  const preloadImages = useCallback(async (): Promise<void> => {
    const pending = Array.from(
      document.querySelectorAll<HTMLImageElement>("#cv-preview img"),
    ).filter((img) => !img.complete);

    if (pending.length === 0) return;

    const loaded = Promise.all(
      pending.map((img) => {
        // next/image marca las imágenes como `loading="lazy"`, así que las que
        // están bajo el pliegue no han empezado a descargar y no emitirían
        // nunca load ni error: esperarlas colgaba la exportación. Pasarlas a
        // `eager` arranca la descarga en el momento.
        img.loading = "eager";

        return new Promise<void>((resolve) => {
          // Se resuelve también en error: un logo que falla no debe
          // bloquear la exportación (la tarjeta ya tiene su fallback).
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
      }),
    );

    // Red lenta o imagen que nunca resuelve: mejor un PDF con un logo vacío
    // que un botón colgado para siempre.
    await Promise.race([
      loaded,
      new Promise((resolve) => setTimeout(resolve, IMAGE_LOAD_TIMEOUT_MS)),
    ]);
  }, []);

  const exportToPDF = useCallback(async (): Promise<void> => {
    await preloadImages();

    // Se titula el documento sólo mientras dura la impresión, para que el PDF
    // salga con el nombre del CV en vez del de la app. `afterprint` dispara
    // tanto si se imprime como si se cancela el diálogo.
    const previousTitle = document.title;
    const restoreTitle = () => {
      document.title = previousTitle;
    };

    document.title = pdfDocumentName(cvData.personalInfo.fullName);
    window.addEventListener("afterprint", restoreTitle, { once: true });

    // Deja al navegador aplicar los estilos de @media print antes de abrir
    // el diálogo, si no la primera hoja puede salir con el layout de pantalla.
    await new Promise((resolve) => requestAnimationFrame(resolve));

    window.print();
  }, [preloadImages, cvData.personalInfo.fullName]);

  return { exportToPDF };
};
