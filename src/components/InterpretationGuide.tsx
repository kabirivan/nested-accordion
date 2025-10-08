'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

interface InterpretationGuideProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function InterpretationGuide({ isOpen, onClose }: InterpretationGuideProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <button
        type="button"
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity cursor-default"
        onClick={onClose}
        aria-label="Cerrar guía"
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg border-2 border-gray-300 w-[400px] max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-primary">Guía de Interpretación</h2>
          </div>

          {/* Contenido con scroll */}
          <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
            <div className="space-y-6">
              {/* Sección Endémica */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Endémica (En)
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-black text-lg font-bold">✓</span>
                    <span className="text-secondary text-sm">Especie endémica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-tertiary text-lg">-</span>
                    <span className="text-secondary text-sm">Especie no endémica</span>
                  </div>
                </div>
              </div>

              {/* Sección Lista Roja */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Lista Roja (LR)
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F9FAFB', color: '#6B7280' }}>
                      LC
                    </span>
                    <span className="text-secondary text-sm">Preocupación Menor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F3F4F6', color: '#4B5563' }}>
                      NT
                    </span>
                    <span className="text-secondary text-sm">Casi Amenazado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#E5E7EB', color: '#374151' }}>
                      VU
                    </span>
                    <span className="text-secondary text-sm">Vulnerable</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#D1D5DB', color: '#1F2937' }}>
                      EN
                    </span>
                    <span className="text-secondary text-sm">En Peligro</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#9CA3AF', color: '#111827' }}>
                      CR
                    </span>
                    <span className="text-secondary text-sm">En Peligro Crítico</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#6B7280', color: '#FFFFFF' }}>
                      EW
                    </span>
                    <span className="text-secondary text-sm">Extinto en Estado Silvestre</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#374151', color: '#FFFFFF' }}>
                      EX
                    </span>
                    <span className="text-secondary text-sm">Extinto</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F3F4F6', color: '#9CA3AF' }}>
                      DD
                    </span>
                    <span className="text-secondary text-sm">Datos Insuficientes</span>
                  </div>
                </div>
              </div>

              {/* Sección Pisos Climáticos */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Pisos Climáticos
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-4 rounded border border-gray-300" style={{ backgroundColor: '#90EE90' }}></div>
                    <span className="text-secondary text-sm">Tropical (0-1000m)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-4 rounded border border-gray-300" style={{ backgroundColor: '#D2B48C' }}></div>
                    <span className="text-secondary text-sm">Subtropical (1000-2000m)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-4 rounded border border-gray-300" style={{ backgroundColor: '#CD853F' }}></div>
                    <span className="text-secondary text-sm">Templado (2000-3000m)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-4 rounded border border-gray-300" style={{ backgroundColor: '#8B4513' }}></div>
                    <span className="text-secondary text-sm">Frío (3000-4000m)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-4 rounded border border-gray-300" style={{ backgroundColor: '#A0522D' }}></div>
                    <span className="text-secondary text-sm">Páramo (4000-5000m)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-4 rounded border border-gray-300" style={{ backgroundColor: '#FFFFFF' }}></div>
                    <span className="text-secondary text-sm">Nival (&gt;5000m)</span>
                  </div>
                </div>
              </div>

              {/* Sección Distribución */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Distribución (C/S/O)
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-primary text-sm">C:</span>
                    <span className="text-secondary text-sm">Costa</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-primary text-sm">S:</span>
                    <span className="text-secondary text-sm">Sierra</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-primary text-sm">O:</span>
                    <span className="text-secondary text-sm">Oriente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

