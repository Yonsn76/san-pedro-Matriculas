import React from 'react';
import { FileText, X } from 'lucide-react';

const DocumentosRequeridos = ({ tipoMatricula, styles, uploadedFiles, handleFileChange, removeFile }) => {
  const getRequiredDocs = (tipo) => {
    switch (tipo) {
      case 'nuevo':
        return [
          { id: 'partida', name: 'Partida de nacimiento', multiple: false },
          { id: 'dni_docs', name: 'DNI estudiante y apoderado', multiple: true },
          { id: 'apafa', name: 'Comprobante APAFA', multiple: false },
          { id: 'fotos', name: 'Fotografías tamaño carnet', multiple: true }
        ];
      case 'traslado':
        return [
          { id: 'libreta', name: 'Libreta de notas anterior', multiple: false },
          { id: 'constancia_traslado', name: 'Constancia de traslado', multiple: false },
          { id: 'certificado', name: 'Certificado de estudios', multiple: false },
          { id: 'apafa_traslado', name: 'Comprobante APAFA', multiple: false },
          { id: 'fotos_traslado', name: 'Fotografías tamaño carnet', multiple: true }
        ];
      case 'siguiente':
        return [
          { id: 'libreta_siguiente', name: 'Libreta de notas del año anterior', multiple: false },
          { id: 'apafa_siguiente', name: 'Comprobante APAFA', multiple: false },
          { id: 'constancia_no_adeudo', name: 'Constancia de no adeudo', multiple: false },
          { id: 'foto_siguiente', name: 'Fotografía tamaño carnet', multiple: false }
        ];
      default:
        return [];
    }
  };

  const requiredDocs = getRequiredDocs(tipoMatricula);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-start justify-between p-6">
        <div className="flex items-center">
          <span className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </span>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Documentos Requeridos</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sube los documentos necesarios para la matrícula</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="space-y-4">
          {requiredDocs.map((doc) => (
            <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-white">{doc.name}</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="file"
                    id={doc.id}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, doc.id)}
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple={doc.multiple}
                  />
                  <label
                    htmlFor={doc.id}
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200"
                  >
                    Seleccionar archivo{doc.multiple ? 's' : ''}
                  </label>
                </div>
              </div>

              {/* Preview de archivos */}
              <div className="space-y-2">
                {uploadedFiles[doc.id]?.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md"
                  >
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(doc.id, index)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
                    >
                      <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Mensaje de ayuda */}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {doc.multiple ? 'Puedes seleccionar múltiples archivos. ' : ''}
                Formatos aceptados: PDF, JPG, JPEG, PNG. Máximo 5MB por archivo.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentosRequeridos; 