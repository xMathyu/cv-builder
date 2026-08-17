"use client";

import React from "react";
import { CVProvider } from "@/context/CVContext";
import { UIProvider, useUI } from "@/context/UIContext";
import CVPreview from "@/components/CVPreview";
import { usePDFExport } from "@/hooks/usePDFExport";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

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
  const { exportToPDF } = usePDFExport();

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
                Optimizado para A4 (210 × 297 mm)
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
                onClick={exportToPDF}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF (A4)</span>
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
            Cómo guardar el CV en PDF
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>
              Haz clic en <strong>Descargar PDF (A4)</strong> o presiona{" "}
              <kbd className="bg-blue-100 px-2 py-1 rounded">Ctrl+P</kbd>
            </li>
            <li>
              En <strong>Destino</strong>, elige{" "}
              <strong>Guardar como PDF</strong>
            </li>
            <li>
              Verifica que <strong>Gráficos de fondo</strong> esté activado, así
              se conserva el degradado de la columna lateral
            </li>
          </ol>
          <p className="text-sm text-blue-700 mt-3">
            El tamaño A4, los márgenes y los cortes de página ya vienen
            definidos en la hoja de estilos: no hace falta tocar nada más en el
            diálogo. El texto sale seleccionable, que es lo que necesitan los
            filtros ATS de reclutamiento.
          </p>
        </div>
      </div>
    </div>
  );
}
