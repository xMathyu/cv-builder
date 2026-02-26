"use client";

import React, { useEffect } from "react";
import { CVProvider } from "@/context/CVContext";
import { UIProvider, useUI } from "@/context/UIContext";
import CVPreview from "@/components/CVPreview";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export default function PrintPage() {
  return (
    <UIProvider>
      <CVProvider>
        <PrintContent />
      </CVProvider>
    </UIProvider>
  );
}

function PrintContent() {
  const { language, toggleLanguage } = useUI();

  useEffect(() => {
    // Añadir estilos específicos para impresión en Tabloid
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        @page {
          size: 11in 17in; /* Tamaño Tabloid */
          margin: 0.3in;
        }
        
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Ocultar elementos no necesarios para impresión */
        .no-print {
          display: none !important;
        }
      }
      
      /* Eliminar márgenes y padding de la página de impresión */
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      .min-h-screen {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Forzar layout de 2 columnas en la página de impresión */
      #cv-preview {
        max-width: none !important;
        width: 100% !important;
        margin: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }
      
      #cv-preview .grid {
        display: grid !important;
        grid-template-columns: 1fr 2fr !important;
        gap: 0 !important;
      }
      
      /* Asegurar que el sidebar ocupe 1/3 y el contenido 2/3 */
      #cv-preview .lg\\:col-span-1 {
        grid-column: span 1 !important;
      }
      
      #cv-preview .lg\\:col-span-2 {
        grid-column: span 1 !important;
      }
      
      /* Arreglar el layout de proyectos para que sean simétricos */
      #cv-preview .grid.grid-cols-1.md\\:grid-cols-2 {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 1.5rem !important;
        align-items: start !important;
      }
      
      /* Hacer que todas las cards de proyectos tengan la misma altura */
      #cv-preview .grid.grid-cols-1.md\\:grid-cols-2 > div {
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        min-height: 320px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Solo visible en pantalla */}
      <header className="no-print bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al Editor
              </Link>
              <div className="text-sm text-gray-500">
                Optimizado para papel Tabloid (11x17&quot;)
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                title={
                  language === "en" ? "Cambiar a Español" : "Switch to English"
                }
              >
                <span className="text-base leading-none">
                  {language === "en" ? "🇵🇪" : "🇺🇸"}
                </span>
                <span>{language === "en" ? "ES" : "EN"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir (Ctrl+P)</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CV Content - Sin márgenes para aprovechar todo el espacio */}
      <main>
        <CVPreview />
      </main>

      {/* Instrucciones para el usuario (ocultas en impresión) */}
      <div className="no-print max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Instrucciones para imprimir en Tabloid
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>
              Presiona{" "}
              <kbd className="bg-blue-100 px-2 py-1 rounded">Ctrl+P</kbd> o haz
              clic en &quot;Imprimir&quot;
            </li>
            <li>En la configuración de impresión, selecciona:</li>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
              <li>
                <strong>Tamaño de papel:</strong> Tabloid (11 x 17 pulgadas)
              </li>
              <li>
                <strong>Orientación:</strong> Vertical (Portrait)
              </li>
              <li>
                <strong>Márgenes:</strong> Mínimos
              </li>
              <li>
                <strong>Gráficos de fondo:</strong> Activado (para mantener
                colores)
              </li>
            </ul>
            <li>
              Haz clic en &quot;Imprimir&quot; para generar el PDF o enviarlo a
              la impresora
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
