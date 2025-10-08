'use client';

import { useState } from 'react';
import { FrogSpecies } from '@/data/frogsData';
import RedListStatus from './RedListStatus';

interface SpeciesContentProps {
  readonly species: FrogSpecies;
}

type TabType = 'general' | 'resources';

export default function SpeciesContent({ species }: SpeciesContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const renderGeneralTab = () => (
    <div className="space-y-6">
        {/* Etymology */}
        {species.etymology && (
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Etymology</h2>
            <p className="text-secondary leading-relaxed text-lg">{species.etymology}</p>
          </section>
        )}

        {/* Definition */}
        {species.definition && (
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Definition</h2>
            <p className="text-secondary leading-relaxed text-lg">{species.definition}</p>
          </section>
        )}

        {/* Distribution */}
        {species.distributionText && (
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Distribution</h2>
            <p className="text-secondary leading-relaxed text-lg">{species.distributionText}</p>
          </section>
        )}

        {/* Content */}
        {species.content && (
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Content</h2>
            <p className="text-secondary leading-relaxed text-lg">{species.content}</p>
          </section>
        )}

        {/* Remarks */}
        {species.remarks && (
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Remarks</h2>
            <p className="text-secondary leading-relaxed text-lg">{species.remarks}</p>
          </section>
        )}

        {/* Información taxonómica */}
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Información Taxonómica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
            <div>
              <span className="font-semibold text-secondary block mb-1">Descubridores:</span>
              <p className="text-primary">{species.discoverers}</p>
            </div>
            <div>
              <span className="font-semibold text-secondary block mb-1">Año de Descubrimiento:</span>
              <p className="text-primary">{species.discoveryYear}</p>
            </div>
            <div>
              <span className="font-semibold text-secondary block mb-1">Endemismo:</span>
              <p className="text-primary">
                {species.isEndemic ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="text-black text-lg">✓</span>
                    Endémica de Ecuador
                  </span>
                ) : (
                  'No endémica'
                )}
              </p>
            </div>
            <div>
              <span className="font-semibold text-secondary block mb-1">Estado de Conservación:</span>
              <div className="mt-2">
                <RedListStatus status={species.redListStatus} />
              </div>
            </div>
          </div>
        </section>

        {/* Descripción */}
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Descripción</h2>
          <p className="text-secondary leading-relaxed text-lg">{species.description}</p>
        </section>

        {/* Características físicas */}
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Características Físicas</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <span className="font-semibold text-secondary block mb-2">Tamaño:</span>
            <p className="text-primary text-lg">{species.size}</p>
          </div>
        </section>

        {/* Hábitat y Ecología */}
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Hábitat y Ecología</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <span className="font-semibold text-secondary block mb-2">Hábitat:</span>
              <p className="text-primary leading-relaxed">{species.habitat}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <span className="font-semibold text-secondary block mb-2">Dieta:</span>
              <p className="text-primary leading-relaxed">{species.diet}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <span className="font-semibold text-secondary block mb-2">Rango Altitudinal:</span>
                <p className="text-primary text-lg font-medium">
                  {species.altitudinalRange.min}-{species.altitudinalRange.max}m
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <span className="font-semibold text-secondary block mb-2">Pisos Climáticos:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {species.climaticFloors.map((floor) => (
                    <span
                      key={floor}
                      className="px-3 py-1 bg-primary text-white rounded-full text-sm"
                    >
                      {floor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Distribución Geográfica */}
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Distribución Geográfica</h2>
          <div className="flex gap-4 flex-wrap">
            <div
              className={`px-6 py-4 rounded-lg text-lg font-medium ${
                species.distribution.costa
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              Costa
            </div>
            <div
              className={`px-6 py-4 rounded-lg text-lg font-medium ${
                species.distribution.sierra
                  ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              Sierra
            </div>
            <div
              className={`px-6 py-4 rounded-lg text-lg font-medium ${
                species.distribution.oriente
                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              Oriente
            </div>
          </div>
        </section>
    </div>
  );

  const renderResourcesTab = () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-primary mb-4">Recursos</h2>
        <p className="text-secondary">
          Galería, sonidos y mapa de ubicaciones próximamente...
        </p>
      </section>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-[calc(100vh-200px)]">
      {/* Header - Fijo */}
      <div className="border-b border-gray-200 px-6 py-6 flex-shrink-0">
        {/* Información principal */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-primary mb-2 italic">
            {species.scientificName}
          </h1>
          <p className="text-xl text-secondary">{species.commonName}</p>
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
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'resources'
                ? 'border-primary text-primary'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            Recursos
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
              {activeTab === 'resources' && renderResourcesTab()}
            </div>

          {/* Cuadro resumen lateral (estilo Wikipedia) */}
          {activeTab === 'general' && (
            <aside className="w-80 flex-shrink-0 ml-4">
              <div className="sticky top-4 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                {/* Título */}
                <div className="bg-gray-200 px-4 py-3 text-center border-b-2 border-gray-300">
                  <h3 className="text-xl font-bold text-primary italic">
                    {species.scientificName}
                  </h3>
                  <p className="text-sm text-secondary mt-1">{species.commonName}</p>
                </div>

                {/* Imagen */}
                {species.imageUrl ? (
                  <div className="bg-gray-200 overflow-hidden border-b-2 border-gray-300">
                    <img
                      src={species.imageUrl}
                      alt={species.scientificName}
                      className="w-full h-auto object-cover"
                    />
                    <p className="text-xs text-center text-gray-600 py-2 bg-gray-100">
                      {species.scientificName}
                    </p>
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-200 flex items-center justify-center border-b-2 border-gray-300">
                    <span className="text-gray-400 text-sm">Sin imagen</span>
                  </div>
                )}

                {/* Estado de conservación */}
                <div className="p-4 bg-white border-b-2 border-gray-300">
                  <p className="text-sm font-bold text-center mb-2" style={{ color: '#3366cc' }}>
                    Conservation status
                  </p>
                  <div className="flex justify-center mb-2">
                    <RedListStatus status={species.redListStatus} />
                  </div>
                  <p className="text-xs text-center text-secondary">
                    {species.redListStatus === 'LC' && 'Least Concern'}
                    {species.redListStatus === 'NT' && 'Near Threatened'}
                    {species.redListStatus === 'VU' && 'Vulnerable'}
                    {species.redListStatus === 'EN' && 'Endangered'}
                    {species.redListStatus === 'CR' && 'Critically Endangered'}
                    {species.redListStatus === 'EW' && 'Extinct in the Wild'}
                    {species.redListStatus === 'EX' && 'Extinct'}
                    {species.redListStatus === 'DD' && 'Data Deficient'}
                    {' (IUCN 3.1)'}
                  </p>
                </div>

                {/* Clasificación científica */}
                <div className="p-4 bg-white">
                  <p className="text-sm font-bold text-center mb-3" style={{ color: '#3366cc' }}>
                    Scientific classification
                  </p>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-2 text-right font-medium text-gray-700">Kingdom:</td>
                        <td className="py-1 text-left" style={{ color: '#3366cc' }}>Animalia</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-2 text-right font-medium text-gray-700">Phylum:</td>
                        <td className="py-1 text-left" style={{ color: '#3366cc' }}>Chordata</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-2 text-right font-medium text-gray-700">Class:</td>
                        <td className="py-1 text-left" style={{ color: '#3366cc' }}>Amphibia</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-2 text-right font-medium text-gray-700">Order:</td>
                        <td className="py-1 text-left" style={{ color: '#3366cc' }}>Anura</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-2 text-right font-medium text-gray-700">Family:</td>
                        <td className="py-1 text-left" style={{ color: '#3366cc' }}>Bufonidae</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-2 text-right font-medium text-gray-700">Genus:</td>
                        <td className="py-1 text-left italic" style={{ color: '#3366cc' }}>Rhinella</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-2 text-right font-medium text-gray-700">Species:</td>
                        <td className="py-1 text-left italic font-bold" style={{ color: '#3366cc' }}>
                          {species.scientificName.split(' ')[1]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Nombre binomial */}
                <div className="p-4 bg-gray-50 border-t-2 border-gray-300">
                  <p className="text-sm font-bold text-center mb-2" style={{ color: '#3366cc' }}>
                    Binomial name
                  </p>
                  <p className="text-center italic font-bold text-lg text-primary">
                    {species.scientificName}
                  </p>
                  <p className="text-center text-xs text-secondary mt-1">
                    ({species.discoverers}, {species.discoveryYear})
                  </p>
                </div>

                {/* Información adicional */}
                <div className="p-4 bg-white border-t-2 border-gray-300 space-y-3">
                  {species.isEndemic && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                      <p className="text-xs font-semibold text-yellow-800 flex items-center gap-1">
                        <span className="text-lg">⭐</span> Endémica de Ecuador
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Rango altitudinal:</p>
                    <p className="text-sm text-primary font-medium">
                      {species.altitudinalRange.min}-{species.altitudinalRange.max} m
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Distribución en Ecuador:</p>
                    <div className="flex gap-2 flex-wrap">
                      {species.distribution.costa && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
                          Costa
                        </span>
                      )}
                      {species.distribution.sierra && (
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded font-medium">
                          Sierra
                        </span>
                      )}
                      {species.distribution.oriente && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded font-medium">
                          Oriente
                        </span>
                      )}
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

