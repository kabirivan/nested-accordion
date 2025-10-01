'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { FrogSpecies, FrogFamily } from '@/data/frogsData';

interface TechnicalSheetProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly data: FrogSpecies | FrogFamily;
  readonly type: 'species' | 'family';
}

export default function TechnicalSheet({ isOpen, onClose, data, type }: TechnicalSheetProps) {
  if (!isOpen) return null;

  const renderSpeciesSheet = (species: FrogSpecies) => (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-bold text-primary mb-2">
          {species.scientificName}
        </h2>
        <p className="text-lg text-secondary">{species.commonName}</p>
      </div>

      {/* Información taxonómica */}
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3">Información Taxonómica</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-secondary">Descubridores:</span>
            <p className="text-primary">{species.discoverers}</p>
          </div>
          <div>
            <span className="font-medium text-secondary">Año de Descubrimiento:</span>
            <p className="text-primary">{species.discoveryYear}</p>
          </div>
          <div>
            <span className="font-medium text-secondary">Endemismo:</span>
            <p className="text-primary">{species.isEndemic ? 'Endémica de Ecuador' : 'No endémica'}</p>
          </div>
          <div>
            <span className="font-medium text-secondary">Estado de Conservación:</span>
            <p className="text-primary">{species.redListStatus}</p>
          </div>
        </div>
      </section>

      {/* Descripción */}
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3">Descripción</h3>
        <p className="text-secondary leading-relaxed">{species.description}</p>
      </section>

      {/* Características físicas */}
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3">Características Físicas</h3>
        <div>
          <span className="font-medium text-secondary">Tamaño:</span>
          <p className="text-primary">{species.size}</p>
        </div>
      </section>

      {/* Hábitat y Ecología */}
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3">Hábitat y Ecología</h3>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-secondary">Hábitat:</span>
            <p className="text-primary">{species.habitat}</p>
          </div>
          <div>
            <span className="font-medium text-secondary">Dieta:</span>
            <p className="text-primary">{species.diet}</p>
          </div>
          <div>
            <span className="font-medium text-secondary">Rango Altitudinal:</span>
            <p className="text-primary">{species.altitudinalRange.min}-{species.altitudinalRange.max}m</p>
          </div>
          <div>
            <span className="font-medium text-secondary">Pisos Climáticos:</span>
            <p className="text-primary">{species.climaticFloors.join(', ')}</p>
          </div>
        </div>
      </section>

      {/* Distribución Geográfica */}
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3">Distribución Geográfica</h3>
        <div className="flex gap-4">
          <div className={`px-3 py-2 rounded ${species.distribution.costa ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'}`}>
            Costa
          </div>
          <div className={`px-3 py-2 rounded ${species.distribution.sierra ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-400'}`}>
            Sierra
          </div>
          <div className={`px-3 py-2 rounded ${species.distribution.oriente ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}>
            Oriente
          </div>
        </div>
      </section>
    </div>
  );

  const renderFamilySheet = (family: FrogFamily) => (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-bold text-primary mb-2">{family.name}</h2>
        <p className="text-lg text-secondary">{family.commonNames.join(', ')}</p>
      </div>

      {/* Descripción */}
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3">Descripción de la Familia</h3>
        <p className="text-secondary leading-relaxed">{family.description}</p>
      </section>

      {/* Estadísticas */}
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3">Estadísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-subtle p-4 rounded">
            <p className="text-3xl font-bold text-primary">{family.summary.totalSpecies}</p>
            <p className="text-secondary text-sm">Especies Totales</p>
          </div>
          <div className="bg-subtle p-4 rounded">
            <p className="text-3xl font-bold text-primary">{family.summary.totalGenera}</p>
            <p className="text-secondary text-sm">Géneros</p>
          </div>
          <div className="bg-subtle p-4 rounded">
            <p className="text-3xl font-bold text-primary">{family.summary.endemicSpecies}</p>
            <p className="text-secondary text-sm">Especies Endémicas</p>
          </div>
          <div className="bg-subtle p-4 rounded">
            <p className="text-3xl font-bold text-primary">{family.summary.redListSpecies}</p>
            <p className="text-secondary text-sm">En Lista Roja</p>
          </div>
        </div>
      </section>

      {/* Lista de especies */}
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3">Especies de esta Familia</h3>
        <div className="space-y-2">
          {family.species.map((species) => (
            <div key={species.id} className="border-l-2 border-gray-300 pl-3">
              <p className="font-medium text-primary">{species.scientificName}</p>
              <p className="text-sm text-secondary">{species.commonName}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <button
        type="button"
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity cursor-default"
        onClick={onClose}
        aria-label="Cerrar modal"
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="sticky top-0 right-0 float-right m-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>

          {/* Contenido */}
          <div className="p-8">
            {type === 'species' ? renderSpeciesSheet(data as FrogSpecies) : renderFamilySheet(data as FrogFamily)}
          </div>
        </div>
      </div>
    </div>
  );
}

