import type { Metadata } from "next";
import { defaultCVData } from "@/data/defaultCV";
import { pdfDocumentName } from "@/lib/pdfName";

/**
 * Esta ruta existe para exportar el PDF, así que su título es el del documento
 * y no el de la app: el navegador lo usa como propiedad `Title` del PDF y como
 * nombre de archivo sugerido, también si se imprime con Ctrl+P.
 *
 * Tiene que declararse como metadata y no con `document.title`: Next reconcilia
 * el <title> tras la hidratación y revierte cualquier cambio imperativo.
 */
export const metadata: Metadata = {
  title: pdfDocumentName(defaultCVData.personalInfo.fullName),
};

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
