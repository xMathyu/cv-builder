"use client";

import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { usePDFExport } from "@/hooks/usePDFExport";

const ExportButton: React.FC = () => {
  const { exportToPDF } = usePDFExport();
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExportPDF = async () => {
    setIsExporting(true);
    setError(null);

    try {
      await exportToPDF();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo exportar el PDF",
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="export-controls no-print">
      <button
        onClick={handleExportPDF}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Abre el diálogo de impresión ya configurado en A4; elige 'Guardar como PDF'"
      >
        {isExporting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isExporting ? "Preparando..." : "Descargar PDF (A4)"}
      </button>

      {error && (
        <div className="mt-2 p-2 rounded text-sm bg-red-100 text-red-700 border border-red-300">
          {error}
        </div>
      )}
    </div>
  );
};

export default ExportButton;
