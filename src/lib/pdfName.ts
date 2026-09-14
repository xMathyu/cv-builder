/**
 * Nombre del documento PDF.
 *
 * El navegador escribe `document.title` como propiedad `Title` dentro del PDF
 * y lo propone como nombre de archivo. Sin esto el visor muestra el título de
 * la web aunque renombres el fichero.
 *
 * Vive en su propio módulo, sin dependencias de cliente, para que lo puedan
 * importar tanto el hook de exportación como el layout de servidor de /print.
 */
export const pdfDocumentName = (fullName: string): string => {
  const name = fullName.trim();
  return name ? `${name} - CV` : "CV";
};
