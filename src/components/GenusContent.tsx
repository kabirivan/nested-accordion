'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { FrogGenus } from '@/data/frogsData';
import RedListStatus from './RedListStatus';
import ClimaticFloorChart from './ClimaticFloorChart';

interface GenusContentProps {
  readonly genus: FrogGenus;
}

type TabType = 'general' | 'species';

export default function GenusContent({ genus }: GenusContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const renderGeneralTab = () => (
    <div className="space-y-6">
      {/* Estadísticas */}
      <section>
        <h3 className="text-lg font-semibold text-primary mb-3">Estadísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-3xl font-bold text-primary">{genus.summary.totalSpecies}</p>
            <p className="text-secondary text-sm">Especies</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-3xl font-bold text-primary">{genus.summary.endemicSpecies}</p>
            <p className="text-secondary text-sm">Endémicas</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-3xl font-bold text-primary">{genus.summary.redListSpecies}</p>
            <p className="text-secondary text-sm">Lista Roja</p>
          </div>
        </div>
      </section>

      {/* Etymology */}
      {genus.etymology && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">Etymology</h3>
          <p className="text-secondary leading-relaxed">{genus.etymology}</p>
        </section>
      )}

      {/* Definition */}
      {genus.definition && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">Definition</h3>
          <p className="text-secondary leading-relaxed">{genus.definition}</p>
        </section>
      )}

      {/* Distribution */}
      {genus.distribution && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">Distribution</h3>
          <p className="text-secondary leading-relaxed">{genus.distribution}</p>
        </section>
      )}

      {/* Content */}
      {genus.content && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">Content</h3>
          <p className="text-secondary leading-relaxed">{genus.content}</p>
        </section>
      )}

      {/* Remarks */}
      {genus.remarks && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">Remarks</h3>
          <p className="text-secondary leading-relaxed">{genus.remarks}</p>
        </section>
      )}
    </div>
  );

  const renderSpeciesTab = () => (
    <div className="space-y-3">
      {/* Header de la tabla */}
      <div className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-4 text-xs font-semibold text-tertiary">
          <div className="flex-1">Especie</div>
          <div className="w-8 text-center">En</div>
          <div className="w-12 text-center">LR</div>
          <div className="w-20 text-center">Distribución</div>
          <div className="w-10 text-center">Ficha</div>
        </div>
      </div>

      {/* Lista de especies */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {genus.species.map((species) => (
          <div
            key={species.id}
            className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Nombre científico */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-medium text-sm italic">
                    {species.scientificName}
                  </span>
                  <span className="text-tertiary text-xs">
                    {species.discoverers} ({species.discoveryYear})
                  </span>
                </div>
                <div className="text-secondary text-xs mt-1">
                  {species.commonName}
                </div>
              </div>

              {/* Endémica */}
              <div className="w-8 text-center">
                {species.isEndemic ? (
                  <span className="text-black text-lg">✓</span>
                ) : (
                  <span className="text-tertiary text-lg">-</span>
                )}
              </div>

              {/* Lista Roja */}
              <div className="w-12 text-center">
                <RedListStatus status={species.redListStatus} />
              </div>

              {/* Pisos Climáticos */}
              <div className="w-20">
                <ClimaticFloorChart
                  altitudinalRange={species.altitudinalRange}
                  climaticFloors={species.climaticFloors}
                />
              </div>

              {/* Botón para ver tarjeta técnica */}
              <div>
                <Link
                  href={`/species/${species.id}`}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors group block"
                  title="Ver ficha técnica"
                >
                  <DocumentTextIcon className="h-5 w-5 text-gray-600 group-hover:text-primary" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-[calc(100vh-200px)]">
      {/* Header - Fijo */}
      <div className="border-b border-gray-200 px-6 py-6 flex-shrink-0">
        {/* Información principal */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-primary mb-2 italic">{genus.name}</h1>
          <p className="text-xl text-secondary">{genus.commonName}</p>
        </div>

        {/* Pestañas */}
        <div className="flex gap-2 border-b border-gray-200 -mb-px">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'general'
                ? 'border-primary text-primary'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('species')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'species'
                ? 'border-primary text-primary'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            Especies
          </button>
        </div>
      </div>

      {/* Contenido con sidebar - Con scroll */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-6 py-6">
          <div className="flex gap-8">
            {/* Contenido principal */}
            <div className="flex-1 min-w-0">
              {activeTab === 'general' && renderGeneralTab()}
              {activeTab === 'species' && renderSpeciesTab()}
            </div>

            {/* Cuadro resumen lateral (estilo Wikipedia) */}
            {activeTab === 'general' && (
              <aside className="w-80 flex-shrink-0 ml-4">
              <div className="sticky top-4 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                {/* Imagen */}
                {genus.imageUrl ? (
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    <img
                      src={genus.imageUrl}
                      alt={genus.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Sin imagen</span>
                  </div>
                )}

                {/* Información de resumen */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-primary italic mb-1">
                      {genus.name}
                    </h3>
                    <p className="text-sm text-secondary">{genus.commonName}</p>
                  </div>

                  <div className="border-t border-gray-300 pt-3 space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-tertiary">Estadísticas</p>
                      <div className="text-sm text-secondary mt-1 space-y-0.5">
                        <p><span className="font-medium">Especies:</span> {genus.summary.totalSpecies}</p>
                        <p><span className="font-medium">Endémicas:</span> {genus.summary.endemicSpecies}</p>
                        <p><span className="font-medium">Lista Roja:</span> {genus.summary.redListSpecies}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

