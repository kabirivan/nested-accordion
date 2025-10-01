'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FrogOrder, FrogFamily, FrogSpecies } from '@/data/frogsData';
import ClimaticFloorChart from './ClimaticFloorChart';
import RedListStatus from './RedListStatus';

interface FrogAccordionProps {
  readonly orders: FrogOrder[];
}

export default function FrogAccordion({ orders }: FrogAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());


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
      </div>
    </div>
  );

  const renderFamily = (family: FrogFamily) => (
    <div key={family.id} className="bg-card overflow-hidden">
      <button
        onClick={() => toggleItem(`family-${family.id}`)}
        className="w-full px-4 py-3 text-left bg-card hover:bg-subtle transition-colors duration-200 flex items-center justify-between"
      >
        <div className="flex-1">
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
        <div className="ml-2 flex-shrink-0">
          {isOpen(`family-${family.id}`) ? (
            <ChevronDownIcon className="h-5 w-5 text-secondary" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 text-secondary" />
          )}
        </div>
      </button>
      
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
    <div className="space-y-4">
      {/* Leyenda explicativa */}
      <div className="bg-card p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-primary mb-3">Guía de Interpretación</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {/* Columna Endémica */}
          <div>
            <h4 className="font-medium text-primary mb-2">Endémica (En)</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-black text-lg">✓</span>
                <span className="text-secondary">Especie endémica (solo en Ecuador)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-tertiary text-lg">-</span>
                <span className="text-secondary">Especie no endémica</span>
              </div>
            </div>
          </div>

          {/* Columna Lista Roja */}
          <div>
            <h4 className="font-medium text-primary mb-2">Lista Roja (LR)</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F0F9FF', color: '#0369A1' }}>LC</span>
                <span className="text-secondary">Preocupación Menor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>NT</span>
                <span className="text-secondary">Casi Amenazado</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FED7AA', color: '#EA580C' }}>VU</span>
                <span className="text-secondary">Vulnerable</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FECACA', color: '#DC2626' }}>EN</span>
                <span className="text-secondary">En Peligro</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}>CR</span>
                <span className="text-secondary">Críticamente Amenazado</span>
              </div>
            </div>
          </div>

          {/* Columna Distribución */}
          <div>
            <h4 className="font-medium text-primary mb-2">Pisos Climáticos</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#90EE90' }}></div>
                <span className="text-secondary">Tropical (0-1000m)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#D2B48C' }}></div>
                <span className="text-secondary">Subtropical (1000-2000m)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#CD853F' }}></div>
                <span className="text-secondary">Templado (2000-3000m)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#8B4513' }}></div>
                <span className="text-secondary">Frío (3000-4000m)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#A0522D' }}></div>
                <span className="text-secondary">Páramo (4000-5000m)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acordeón principal */}
      <div className="space-y-2">
        {orders.map(renderOrder)}
      </div>
    </div>
  );
}
