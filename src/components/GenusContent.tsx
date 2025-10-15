'use client';

import Link from 'next/link';
import { FrogGenus } from '@/data/frogsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RedListStatus from './RedListStatus';

interface GenusContentProps {
  readonly genus: FrogGenus;
}

export default function GenusContent({ genus }: GenusContentProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] font-serif">
      {/* Encabezado - Fondo oscuro */}
      <header className="bg-[#2c2c2c] text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Nombre del género */}
          <h1 className="text-4xl font-normal italic text-center mb-2" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            {genus.name}
          </h1>
          
          {/* Primeros Recolectores */}
          <p className="text-sm text-[#ccc] text-center mb-2" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Primeros Recolectores: Autor, Año
          </p>
          
          {/* Nombre Común */}
          <p className="text-lg text-white text-center mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            {genus.commonName}
          </p>
          
          {/* Línea separadora */}
          <div className="border-t border-[#555] mb-6"></div>
          
          {/* Taxonomía en tres columnas */}
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div className="text-center">
              <p className="text-xs text-[#ccc] uppercase mb-1" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                ORDEN
              </p>
              <p className="text-lg text-white italic" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                Anura
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#ccc] uppercase mb-1" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                FAMILIA
              </p>
              <p className="text-lg text-white italic" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                Familia
              </p>
            </div>

          </div>
          
          {/* Número de especies */}
          <div className="py-3 px-4 text-center">
            <span className="text-sm text-[#ccc]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Número de especies: <span className="font-bold text-white">{genus.summary.totalSpecies}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Cuerpo principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Etimología */}
            {genus.etymology && (
              <div className="bg-white border border-[#ddd]">
                <div className="bg-[#e8e8e8] border-b border-[#ddd] px-4 py-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#333]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                    ETIMOLOGÍA
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-[#444] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                    {genus.etymology}
                  </p>
                </div>
              </div>
            )}

            {/* Definición */}
            {genus.definition && (
              <Card className="bg-white border border-[#ddd]">
                <CardHeader className="bg-[#e8e8e8] border-b border-[#ddd]">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wide text-[#333]">
                    Definición
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-[#444] leading-relaxed">{genus.definition}</p>
                </CardContent>
              </Card>
            )}

            {/* Distribución */}
            {genus.distribution && (
              <Card className="bg-white border border-[#ddd]">
                <CardHeader className="bg-[#e8e8e8] border-b border-[#ddd]">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wide text-[#333]">
                    Distribución
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-[#444] leading-relaxed">{genus.distribution}</p>
                </CardContent>
              </Card>
            )}

            {/* Contenido */}
            {genus.content && (
              <Card className="bg-white border border-[#ddd]">
                <CardHeader className="bg-[#e8e8e8] border-b border-[#ddd]">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wide text-[#333]">
                    Contenido
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-[#444] leading-relaxed">{genus.content}</p>
                </CardContent>
              </Card>
            )}

            {/* Especies */}
            <Card className="bg-white border border-[#ddd]">
              <CardHeader className="bg-[#e8e8e8] border-b border-[#ddd]">
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-[#333]">
                  Especies
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {genus.species.map((species) => (
                    <div
                      key={species.id}
                      className="bg-[#f9f9f9] border-l-4 border-[#666] p-3 pl-4 hover:bg-[#f0f0f0] hover:border-[#333] transition-colors cursor-pointer"
                      style={{ listStyle: 'none' }}
                    >
                      <Link href={`/species/${species.id}`} className="block">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-[#333] italic font-medium text-sm">
                              {species.scientificName}
                            </p>
                            <p className="text-[#666] text-xs mt-1">
                              {species.commonName}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {species.isEndemic && (
                              <span className="text-xs bg-[#e8e8e8] px-2 py-1 rounded text-[#333]">
                                Endémica
                              </span>
                            )}
                            <RedListStatus status={species.redListStatus} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Observaciones */}
            {genus.remarks && (
              <Card className="bg-white border border-[#ddd]">
                <CardHeader className="bg-[#e8e8e8] border-b border-[#ddd]">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wide text-[#333]">
                    Observaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-[#444] leading-relaxed">{genus.remarks}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Columna derecha - Sidebar */}
          <div className="space-y-6">
            
            {/* Recursos */}
            <Card className="bg-white border border-[#ddd]">
              <CardHeader className="bg-[#e8e8e8] border-b border-[#ddd]">
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-[#333]">
                  Recursos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="bg-[#fafafa] p-3 rounded border border-[#ddd] hover:bg-[#f0f0f0] transition-colors cursor-pointer">
                  <p className="text-sm text-[#333] font-medium">Fotos</p>
                  <p className="text-xs text-[#666]">Galería de imágenes</p>
                </div>
                <div className="bg-[#fafafa] p-3 rounded border border-[#ddd] hover:bg-[#f0f0f0] transition-colors cursor-pointer">
                  <p className="text-sm text-[#333] font-medium">Mapa</p>
                  <p className="text-xs text-[#666]">Distribución geográfica</p>
                </div>
                <div className="bg-[#fafafa] p-3 rounded border border-[#ddd] hover:bg-[#f0f0f0] transition-colors cursor-pointer">
                  <p className="text-sm text-[#333] font-medium">Filogenia</p>
                  <p className="text-xs text-[#666]">Árbol filogenético</p>
                </div>
              </CardContent>
            </Card>

            {/* Fuentes Externas */}
            <Card className="bg-white border border-[#ddd]">
              <CardHeader className="bg-[#e8e8e8] border-b border-[#ddd]">
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-[#333]">
                  Fuentes Externas
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 hover:bg-[#f0f0f0] rounded transition-colors cursor-pointer">
                    <div className="text-lg text-[#333] mb-1">●</div>
                    <p className="text-xs text-[#666]">ASW</p>
                  </div>
                  <div className="text-center p-2 hover:bg-[#f0f0f0] rounded transition-colors cursor-pointer">
                    <div className="text-lg text-[#333] mb-1">◆</div>
                    <p className="text-xs text-[#666]">AmphibiaWeb</p>
                  </div>
                  <div className="text-center p-2 hover:bg-[#f0f0f0] rounded transition-colors cursor-pointer">
                    <div className="text-lg text-[#333] mb-1">■</div>
                    <p className="text-xs text-[#666]">NCBI</p>
                  </div>
                  <div className="text-center p-2 hover:bg-[#f0f0f0] rounded transition-colors cursor-pointer">
                    <div className="text-lg text-[#333] mb-1">▲</div>
                    <p className="text-xs text-[#666]">VertNet</p>
                  </div>
                  <div className="text-center p-2 hover:bg-[#f0f0f0] rounded transition-colors cursor-pointer">
                    <div className="text-lg text-[#333] mb-1">★</div>
                    <p className="text-xs text-[#666]">iNaturalist</p>
                  </div>
                  <div className="text-center p-2 hover:bg-[#f0f0f0] rounded transition-colors cursor-pointer">
                    <div className="text-lg text-[#333] mb-1">◈</div>
                    <p className="text-xs text-[#666]">Wikipedia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}