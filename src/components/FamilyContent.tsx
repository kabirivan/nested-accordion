'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PhotoIcon, MusicalNoteIcon, MapPinIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { FrogFamily } from '@/data/frogsData';
import RedListStatus from './RedListStatus';
import ClimaticFloorChart from './ClimaticFloorChart';
import EcuadorMap from './EcuadorMap';

interface FamilyContentProps {
  readonly family: FrogFamily;
}

type TabType = 'general' | 'genera' | 'resources';
type ResourceSubTab = 'gallery' | 'sounds' | 'map';
type GalleryFilter = 'all' | 'morfologia-interna' | 'morfologia-externa' | 'habitat' | 'comportamiento';

export default function FamilyContent({ family }: FamilyContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [activeResourceTab, setActiveResourceTab] = useState<ResourceSubTab>('gallery');
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all');
  const [expandedGenus, setExpandedGenus] = useState<Set<string>>(new Set());

  const toggleGenus = (genusId: string) => {
    const newExpanded = new Set(expandedGenus);
    if (newExpanded.has(genusId)) {
      newExpanded.delete(genusId);
    } else {
      newExpanded.add(genusId);
    }
    setExpandedGenus(newExpanded);
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      {/* Estadísticas */}
      <section>
        <h3 className="text-lg font-semibold text-primary mb-3">Estadísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-3xl font-bold text-primary">{family.summary.totalSpecies}</p>
            <p className="text-secondary text-sm">Especies</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-3xl font-bold text-primary">{family.summary.totalGenera}</p>
            <p className="text-secondary text-sm">Géneros</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-3xl font-bold text-primary">{family.summary.endemicSpecies}</p>
            <p className="text-secondary text-sm">Endémicas</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-3xl font-bold text-primary">{family.summary.redListSpecies}</p>
            <p className="text-secondary text-sm">Lista Roja</p>
          </div>
        </div>
      </section>

      {/* Etymology */}
      {family.etymology && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Etymology
          </h3>
          <p className="text-secondary leading-relaxed">{family.etymology}</p>
        </section>
      )}

      {/* Definition */}
      {family.definition && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Definition
          </h3>
          <p className="text-secondary leading-relaxed">{family.definition}</p>
        </section>
      )}

      {/* Distribution */}
      {family.distribution && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Distribution
          </h3>
          <p className="text-secondary leading-relaxed">{family.distribution}</p>
        </section>
      )}

      {/* Content */}
      {family.content && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Content
          </h3>
          <p className="text-secondary leading-relaxed">{family.content}</p>
        </section>
      )}

      {/* Remarks */}
      {family.remarks && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Remarks
          </h3>
          <p className="text-secondary leading-relaxed">{family.remarks}</p>
        </section>
      )}
    </div>
  );

  const renderGeneraTab = () => (
    <div className="space-y-3">
      {family.genera.map((genus) => (
        <div key={genus.id} className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header del género */}
          <div className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between">
            <button
              onClick={() => toggleGenus(genus.id)}
              className="flex-1 text-left flex items-center gap-2"
            >
              <span className="text-gray-400">
                {expandedGenus.has(genus.id) ? '▼' : '▶'}
              </span>
              <div>
                <h4 className="font-semibold text-primary italic">{genus.name}</h4>
                <p className="text-sm text-secondary">
                  {genus.commonName} • {genus.summary.totalSpecies} especie{genus.summary.totalSpecies !== 1 ? 's' : ''}
                </p>
              </div>
            </button>
            <Link
              href={`/genus/${genus.id}`}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Ver tarjeta del género"
            >
              <DocumentTextIcon className="h-5 w-5 text-gray-600 hover:text-primary" />
            </Link>
          </div>

          {/* Lista de especies del género */}
          {expandedGenus.has(genus.id) && (
            <div className="bg-white">
              {/* Header de la tabla */}
              <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                <div className="flex items-center gap-4 text-xs font-semibold text-tertiary">
                  <div className="flex-1">Especie</div>
                  <div className="w-8 text-center">En</div>
                  <div className="w-12 text-center">LR</div>
                  <div className="w-20 text-center">Distribución</div>
                  <div className="w-10 text-center">Ficha</div>
                </div>
              </div>

              {/* Lista de especies */}
              {genus.species.map((species) => (
                <div
                  key={species.id}
                  className="px-4 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors"
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
          )}
        </div>
      ))}
    </div>
  );

  const renderResourcesTab = () => {
    const filteredGallery = family.gallery?.filter(img => 
      galleryFilter === 'all' || img.category === galleryFilter
    ) || [];

    return (
      <div className="space-y-4">
        {/* Subtabs para Recursos */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveResourceTab('gallery')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeResourceTab === 'gallery'
                ? 'border-primary text-primary'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <PhotoIcon className="h-4 w-4 inline-block mr-2" />
            Galería
          </button>
          <button
            onClick={() => setActiveResourceTab('sounds')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeResourceTab === 'sounds'
                ? 'border-primary text-primary'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <MusicalNoteIcon className="h-4 w-4 inline-block mr-2" />
            Sonidos
          </button>
          <button
            onClick={() => setActiveResourceTab('map')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeResourceTab === 'map'
                ? 'border-primary text-primary'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <MapPinIcon className="h-4 w-4 inline-block mr-2" />
            Mapa
          </button>
        </div>

        {/* Contenido de Galería */}
        {activeResourceTab === 'gallery' && (
          <div className="space-y-4">
            {/* Filtros de Galería */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setGalleryFilter('all')}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  galleryFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setGalleryFilter('morfologia-externa')}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  galleryFilter === 'morfologia-externa'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                Morfología Externa
              </button>
              <button
                onClick={() => setGalleryFilter('morfologia-interna')}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  galleryFilter === 'morfologia-interna'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                Morfología Interna
              </button>
              <button
                onClick={() => setGalleryFilter('habitat')}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  galleryFilter === 'habitat'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                Hábitat
              </button>
              <button
                onClick={() => setGalleryFilter('comportamiento')}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  galleryFilter === 'comportamiento'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                Comportamiento
              </button>
            </div>

            {/* Grid de Imágenes */}
            {filteredGallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGallery.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={image.url}
                      alt={image.caption || `${family.name} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-xs">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-secondary">No hay imágenes disponibles para este filtro</p>
              </div>
            )}
          </div>
        )}

        {/* Contenido de Sonidos */}
        {activeResourceTab === 'sounds' && (
          <div className="space-y-4">
            {family.sounds && family.sounds.length > 0 ? (
              family.sounds.map((sound, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <div className="mb-3">
                    <h4 className="font-semibold text-primary">{sound.title}</h4>
                    {sound.description && (
                      <p className="text-sm text-secondary mt-1">{sound.description}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-tertiary">
                      {sound.recordedBy && <span>Grabado por: {sound.recordedBy}</span>}
                      {sound.location && <span>📍 {sound.location}</span>}
                      {sound.recordedDate && <span>📅 {sound.recordedDate}</span>}
                    </div>
                  </div>
                  <audio controls className="w-full">
                    <source src={sound.url} type="audio/mpeg" />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <MusicalNoteIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-secondary">No hay sonidos disponibles</p>
              </div>
            )}
          </div>
        )}

        {/* Contenido de Mapa */}
        {activeResourceTab === 'map' && (
          <div>
            <EcuadorMap locations={family.locations} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-[calc(100vh-200px)]">
      {/* Header - Fijo */}
      <div className="border-b border-gray-200 px-6 py-6 flex-shrink-0">
        {/* Información principal */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-primary mb-2">{family.name}</h1>
          <p className="text-xl text-secondary">{family.commonNames.join(', ')}</p>
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
            onClick={() => setActiveTab('genera')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'genera'
                ? 'border-primary text-primary'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            Géneros
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
              {activeTab === 'genera' && renderGeneraTab()}
              {activeTab === 'resources' && renderResourcesTab()}
            </div>

            {/* Cuadro resumen lateral (estilo Wikipedia) */}
            {activeTab === 'general' && (
              <aside className="w-80 flex-shrink-0 ml-4">
              <div className="sticky top-4 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                {/* Imagen */}
                {family.imageUrl ? (
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    <img
                      src={family.imageUrl}
                      alt={family.name}
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
                    <h3 className="text-lg font-bold text-primary mb-1">
                      {family.name}
                    </h3>
                    <p className="text-sm text-secondary">{family.commonNames.join(', ')}</p>
                  </div>

                  <div className="border-t border-gray-300 pt-3 space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-tertiary">Estadísticas</p>
                      <div className="text-sm text-secondary mt-1 space-y-0.5">
                        <p><span className="font-medium">Especies:</span> {family.summary.totalSpecies}</p>
                        <p><span className="font-medium">Géneros:</span> {family.summary.totalGenera}</p>
                        <p><span className="font-medium">Endémicas:</span> {family.summary.endemicSpecies}</p>
                        <p><span className="font-medium">Lista Roja:</span> {family.summary.redListSpecies}</p>
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

