'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, DocumentTextIcon, RectangleGroupIcon } from '@heroicons/react/24/outline';
import { FrogOrder, FrogFamily, FrogSpecies } from '@/data/frogsData';
import ClimaticFloorChart from './ClimaticFloorChart';
import RedListStatus from './RedListStatus';
import TechnicalSheet from './TechnicalSheet';

interface FrogAccordionProps {
  readonly orders: FrogOrder[];
}

export default function FrogAccordion({ orders }: FrogAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedSheet, setSelectedSheet] = useState<{ type: 'species' | 'family', data: FrogSpecies | FrogFamily } | null>(null);


  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const isOpen = (itemId: string) => openItems.has(itemId);

  const renderSpecies = (species: FrogSpecies) => (
    <div key={species.id} className="bg-card p-4 hover:bg-subtle transition-colors duration-200 animate-fade-in border-b border-gray-100 last:border-b-0 ml-4 border-l-2 border-l-gray-200">
      <div className="flex items-center gap-4">
        {/* Nombre científico */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium text-sm">
              {species.scientificName}
            </span>
            <span className="text-tertiary text-xs">
              ({species.discoverers} {species.discoveryYear})
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

        {/* Botón Ficha Técnica */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSheet({ type: 'species', data: species });
          }}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Ver ficha técnica de la especie"
        >
          <DocumentTextIcon className="h-5 w-5 text-black" />
        </button>
      </div>
    </div>
  );

  const renderFamily = (family: FrogFamily) => (
    <div key={family.id} className="bg-card overflow-hidden">
      <div className="w-full px-4 py-3 text-left bg-card hover:bg-subtle transition-colors duration-200 flex items-center justify-between">
        <div 
          className="flex-1 cursor-pointer"
          onClick={() => toggleItem(`family-${family.id}`)}
        >
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-primary">{family.name}</h3>
            <span className="text-tertiary text-sm">
              ({family.commonNames.join(', ')})
            </span>
          </div>
          <p className="text-sm text-secondary">
            {family.summary.totalSpecies} especies, {family.summary.totalGenera} géneros 
            ({family.summary.endemicSpecies} endémicas, {family.summary.redListSpecies} en Lista Roja)
          </p>
        </div>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSheet({ type: 'family', data: family });
            }}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Ver ficha técnica de la familia"
          >
            <RectangleGroupIcon className="h-5 w-5 text-black" />
          </button>
          <button
            onClick={() => toggleItem(`family-${family.id}`)}
            className="p-1"
          >
            {isOpen(`family-${family.id}`) ? (
              <ChevronDownIcon className="h-5 w-5 text-secondary" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-secondary" />
            )}
          </button>
        </div>
      </div>
      
      {isOpen(`family-${family.id}`) && (
        <div className="bg-subtle animate-slide-down">
          {/* Header de la tabla */}
          <div className="px-4 py-2 bg-gray-50">
            <div className="flex items-center gap-4 text-xs font-medium text-tertiary">
              <div className="flex-1">Especie</div>
              <div className="w-8 text-center">En</div>
              <div className="w-12 text-center">LR</div>
              <div className="w-20 text-center">Pisos Climáticos</div>
            </div>
          </div>
          
          {/* Lista de especies */}
          <div className="space-y-1">
            {family.species.map(renderSpecies)}
          </div>
        </div>
      )}
    </div>
  );

  const renderOrder = (order: FrogOrder) => (
    <div key={order.id} className="bg-card overflow-hidden">
      <button
        onClick={() => toggleItem(`order-${order.id}`)}
        className="w-full px-6 py-4 text-left bg-card text-primary hover:bg-subtle transition-colors duration-200 flex items-center justify-between border border-gray-200"
      >
        <div className="flex-1">
          <h2 className="text-xl font-bold text-primary">{order.name}</h2>
          <p className="text-secondary mt-1">
            {order.summary.totalSpecies} especies, {order.summary.totalFamilies} familias 
            ({order.summary.endemicSpecies} endémicas, {order.summary.redListSpecies} en Lista Roja)
          </p>
        </div>
        <div className="ml-2 flex-shrink-0">
          {isOpen(`order-${order.id}`) ? (
            <ChevronDownIcon className="h-6 w-6 text-secondary" />
          ) : (
            <ChevronRightIcon className="h-6 w-6 text-secondary" />
          )}
        </div>
      </button>
      
      {isOpen(`order-${order.id}`) && (
        <div className="p-6 bg-subtle space-y-2 animate-slide-down">
          {order.families.map(renderFamily)}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex gap-6">
      {/* Menú lateral - Guía de Interpretación */}
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-4 bg-card p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-primary mb-4 pb-3 border-b border-gray-200">
            Guía de Interpretación
          </h3>
          
          {/* Sección Endémica */}
          <div className="mb-6">
            <h4 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">
              Endémica (En)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-black text-xl">✓</span>
                <span className="text-secondary text-sm">Especie endémica (solo en Ecuador)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-tertiary text-xl">-</span>
                <span className="text-secondary text-sm">Especie no endémica</span>
              </div>
            </div>
          </div>

          {/* Sección Lista Roja */}
          <div className="mb-6">
            <h4 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">
              Lista Roja (LR)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F0F9FF', color: '#0369A1' }}>LC</span>
                <span className="text-secondary text-sm">Preocupación Menor</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>NT</span>
                <span className="text-secondary text-sm">Casi Amenazado</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FED7AA', color: '#EA580C' }}>VU</span>
                <span className="text-secondary text-sm">Vulnerable</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FECACA', color: '#DC2626' }}>EN</span>
                <span className="text-secondary text-sm">En Peligro</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}>CR</span>
                <span className="text-secondary text-sm">Críticamente Amenazado</span>
              </div>
            </div>
          </div>

          {/* Sección Pisos Climáticos */}
          <div>
            <h4 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">
              Pisos Climáticos
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-3 rounded" style={{ backgroundColor: '#90EE90' }}></div>
                <span className="text-secondary text-sm">Tropical (0-1000m)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-3 rounded" style={{ backgroundColor: '#D2B48C' }}></div>
                <span className="text-secondary text-sm">Subtropical (1000-2000m)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-3 rounded" style={{ backgroundColor: '#CD853F' }}></div>
                <span className="text-secondary text-sm">Templado (2000-3000m)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-3 rounded" style={{ backgroundColor: '#8B4513' }}></div>
                <span className="text-secondary text-sm">Frío (3000-4000m)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-3 rounded" style={{ backgroundColor: '#A0522D' }}></div>
                <span className="text-secondary text-sm">Páramo (4000-5000m)</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido principal - Acordeón */}
      <main className="flex-1 min-w-0">
        <div className="space-y-2">
          {orders.map(renderOrder)}
        </div>
      </main>

      {/* Modal de Ficha Técnica */}
      {selectedSheet && (
        <TechnicalSheet
          isOpen={true}
          onClose={() => setSelectedSheet(null)}
          data={selectedSheet.data}
          type={selectedSheet.type}
        />
      )}
    </div>
  );
}
