'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
// Separator import removido al reestructurar las etiquetas del encabezado
import ClimaticFloorChart from './ClimaticFloorChart';

interface SpeciesTechnicalSheetProps {
  scientificName: string;
  collectors: string;
  commonName: string;
  order: string;
  family: string;
  genus: string;
  etymology?: string;
  identification?: string;
  comparisons?: string;
  naturalHistory?: string;
  distribution?: string;
  conservation?: string;
  altitudinalRange?: {
    min: number;
    max: number;
  };
  climaticFloors?: string[];
}

export default function SpeciesTechnicalSheet({
  scientificName,
  collectors,
  commonName,
  order,
  family,
  genus,
  etymology,
  identification,
  comparisons,
  naturalHistory,
  distribution,
  conservation,
  altitudinalRange,
  climaticFloors
}: SpeciesTechnicalSheetProps) {
  return (
    <Card className="bg-white rounded-none border-0 flex flex-col p-0 gap-0 overflow-hidden" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: 0, border: 'none' }}>
      {/* Encabezado */}
      <CardHeader className="text-white text-center sticky top-0 z-30" style={{ padding: '30px', backgroundColor: '#2c2c2c' }}>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold italic" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '2px' }}>
            {scientificName}
          </h1>
          <p className="text-sm" style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: '#cccccc' }}>
            {collectors}
          </p>
          <p className="text-xl font-semibold" style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: '#e0e0e0' }}>
            {commonName}
          </p>
          <div className="my-4" style={{ borderTop: '1px solid #555555' }} />
          {/* Etiquetas de taxonomía */}
          <div className="flex items-center justify-center gap-16 text-xs" style={{ color: '#999999', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <span>Orden</span>
            <span>Familia</span>
            <span>Género</span>
          </div>
          {/* Valores de taxonomía */}
          <div className="flex items-center justify-center gap-16" style={{ color: '#e0e0e0', fontStyle: 'italic', fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <span>{order}</span>
            <span>{family}</span>
            <span>{genus}</span>
          </div>
        </div>
      </CardHeader>

      {/* Cuerpo - Layout con sidebar fijo y contenido con scroll */}
      <CardContent className="p-0 flex-1 overflow-y-auto">
        <div className="flex">
          {/* Columna izquierda - Contenido principal */}
          <div className="flex-1">
            <div className="p-8 space-y-10">
              {/* Secciones de contenido */}
              {etymology && (
                <section>
                <h3 className="mb-4" style={{
                  backgroundColor: '#e8e8e8',
                  color: '#333333',
                  fontSize: '13px',
                  padding: '8px 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 'bold'
                }}>
                  Etimología
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#444444',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: etymology }} />
                  </div>
                </section>
              )}

              {identification && (
                <section>
                <h3 className="mb-4" style={{
                  backgroundColor: '#e8e8e8',
                  color: '#333333',
                  fontSize: '13px',
                  padding: '8px 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 'bold'
                }}>
                  Identificación
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#444444',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: identification }} />
                  </div>
                </section>
              )}

              {comparisons && (
                <section>
                <h3 className="mb-4" style={{
                  backgroundColor: '#e8e8e8',
                  color: '#333333',
                  fontSize: '13px',
                  padding: '8px 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 'bold'
                }}>
                  Comparaciones
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#444444',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: comparisons }} />
                  </div>
                </section>
              )}

              {naturalHistory && (
                <section>
                <h3 className="mb-4" style={{
                  backgroundColor: '#e8e8e8',
                  color: '#333333',
                  fontSize: '13px',
                  padding: '8px 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 'bold'
                }}>
                  Historia natural
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#444444',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: naturalHistory }} />
                  </div>
                </section>
              )}

              {distribution && (
                <section>
                <h3 className="mb-4" style={{
                  backgroundColor: '#e8e8e8',
                  color: '#333333',
                  fontSize: '13px',
                  padding: '8px 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 'bold'
                }}>
                  Distribución
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#444444',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: distribution }} />
                  </div>
                </section>
              )}

              {conservation && (
                <section>
                <h3 className="mb-4" style={{
                  backgroundColor: '#e8e8e8',
                  color: '#333333',
                  fontSize: '13px',
                  padding: '8px 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 'bold'
                }}>
                  Conservación
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#444444',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: conservation }} />
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Columna derecha - Sidebar fijo */}
          <div className="w-80 border-l sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: '#fafafa' }}>
            <div style={{ padding: '25px 30px' }} className="space-y-8">
              {/* Barra de pisos climáticos */}
              {altitudinalRange && climaticFloors && (
                <section>
                  <h3 className="mb-4" style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#333333',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    Distribución altitudinal
                  </h3>
                  <ClimaticFloorChart
                    altitudinalRange={altitudinalRange}
                    climaticFloors={climaticFloors}
                  />
                </section>
              )}

              {/* Recursos */}
              <section>
                <h3 className="mb-6" style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  color: '#333333',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Recursos
                </h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 transition-colors cursor-pointer hover:bg-gray-25" style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                        <span className="text-sm font-bold" style={{ color: '#333333' }}>F</span>
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: '#333333' }}>Fotos</p>
                        <p className="text-sm" style={{ color: '#666666' }}>Galería fotográfica</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 transition-colors cursor-pointer hover:bg-gray-25" style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                        <span className="text-sm font-bold" style={{ color: '#333333' }}>S</span>
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: '#333333' }}>Sonidos</p>
                        <p className="text-sm" style={{ color: '#666666' }}>Grabaciones de audio</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 transition-colors cursor-pointer hover:bg-gray-25" style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                        <span className="text-sm font-bold" style={{ color: '#333333' }}>M</span>
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: '#333333' }}>Mapa</p>
                        <p className="text-sm" style={{ color: '#666666' }}>Distribución geográfica</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Fuentes Externas */}
              <section>
                <h3 className="mb-6" style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  color: '#333333',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Fuentes externas
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="#"
                    className="flex flex-col items-center gap-3 p-4 rounded-lg transition-colors text-center hover:bg-gray-25"
                    style={{
                      backgroundColor: '#f9f9f9',
                      borderColor: '#dddddd'
                    }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#333333' }}>
                      <span className="text-white text-sm font-bold">●</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#333333' }}>ASW</span>
                  </a>

                  <a
                    href="#"
                    className="flex flex-col items-center gap-3 p-4 rounded-lg transition-colors text-center hover:bg-gray-25"
                    style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#333333' }}>
                      <span className="text-white text-sm font-bold">◆</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#333333' }}>AmphibiaWeb</span>
                  </a>

                  <a
                    href="#"
                    className="flex flex-col items-center gap-3 p-4 rounded-lg transition-colors text-center hover:bg-gray-25"
                    style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#333333' }}>
                      <span className="text-white text-sm font-bold">■</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#333333' }}>NCBI</span>
                  </a>

                  <a
                    href="#"
                    className="flex flex-col items-center gap-3 p-4 rounded-lg transition-colors text-center hover:bg-gray-25"
                    style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#333333' }}>
                      <span className="text-white text-sm font-bold">▲</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#333333' }}>VertNet</span>
                  </a>

                  <a
                    href="#"
                    className="flex flex-col items-center gap-3 p-4 rounded-lg transition-colors text-center hover:bg-gray-25"
                    style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#333333' }}>
                      <span className="text-white text-sm font-bold">★</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#333333' }}>iNaturalist</span>
                  </a>

                  <a
                    href="#"
                    className="flex flex-col items-center gap-3 p-4 rounded-lg transition-colors text-center hover:bg-gray-25"
                    style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#333333' }}>
                      <span className="text-white text-sm font-bold">◉</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#333333' }}>IUCN</span>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
