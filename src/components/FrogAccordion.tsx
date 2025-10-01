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
    <div key={species.id} className="bg-card p-4 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 animate-fade-in border-b border-gray-100 last:border-b-0 ml-4 border-l-2 border-l-gray-200 hover:border-l-gray-400 cursor-pointer group">
      <div className="flex items-center gap-4">
        {/* Nombre científico */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium text-sm group-hover:text-black transition-colors">
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
        <div className="w-10 flex justify-center">
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
          <div className="px-4 py-2 bg-gray-50 ml-4 border-l-2 border-l-gray-200">
            <div className="flex items-center gap-4 text-xs font-semibold text-tertiary">
              <div className="flex-1">Especie</div>
              <div className="w-8 text-center">En</div>
              <div className="w-12 text-center">LR</div>
              <div className="w-20 text-center">Pisos climáticos</div>
              <div className="w-10"></div>
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
    <div className="flex gap-3">
      {/* Panel izquierdo - Filtros */}
      <aside className="hidden 2xl:block w-48 flex-shrink-0">
        <div className="sticky top-4 bg-card p-3 border border-gray-200">
          <h3 className="text-base font-semibold text-primary mb-2 pb-2 border-b border-gray-200">
            Filtros
          </h3>
          
          {/* Filtro por Estado de Conservación */}
          <div className="mb-3">
            <h4 className="font-semibold text-primary mb-1.5 text-xs">
              Lista roja
            </h4>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">LC</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">NT</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">VU</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">EN</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">CR</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">EX/EW</span>
              </label>
            </div>
          </div>

          {/* Filtro por Endemismo */}
          <div className="mb-3">
            <h4 className="font-semibold text-primary mb-1.5 text-xs">
              Endemismo
            </h4>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">Endémicas</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">No endémicas</span>
              </label>
            </div>
          </div>

          {/* Filtro por Pisos Climáticos */}
          <div className="mb-3">
            <h4 className="font-semibold text-primary mb-1.5 text-xs">
              Pisos climáticos
            </h4>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">Tropical</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">Subtropical</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">Templado</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">Frío</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">Páramo</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
                <span className="text-xs text-secondary">Nival</span>
              </label>
            </div>
          </div>

          {/* Botón para limpiar filtros */}
          <button className="w-full px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-primary text-xs transition-colors border border-gray-200">
            Limpiar Filtros
          </button>
        </div>
      </aside>

      {/* Contenido central - Acordeón */}
      <main className="flex-1 min-w-0">
        <div className="space-y-4">
          {orders.map(renderOrder)}
        </div>
      </main>

      {/* Panel derecho - Guía de Interpretación */}
      <aside className="hidden 2xl:block w-52 flex-shrink-0">
        <div className="sticky top-4 bg-card p-3 border border-gray-200">
          <h3 className="text-base font-semibold text-primary mb-2 pb-2 border-b border-gray-200">
            Guía de Interpretación
          </h3>
          
          {/* Sección Endémica */}
          <div className="mb-3">
            <h4 className="font-semibold text-primary mb-1.5 text-xs">
              Endémica (En)
            </h4>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-black text-sm">✓</span>
                <span className="text-secondary text-xs">Endémica</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-tertiary text-sm">-</span>
                <span className="text-secondary text-xs">No endémica</span>
              </div>
            </div>
          </div>

          {/* Sección Lista Roja */}
          <div className="mb-3">
            <h4 className="font-semibold text-primary mb-1.5 text-xs">
              Lista roja (LR)
            </h4>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F0F9FF', color: '#0369A1' }}>LC</span>
                <span className="text-secondary text-xs">P. Menor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>NT</span>
                <span className="text-secondary text-xs">C. Amenazado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FED7AA', color: '#EA580C' }}>VU</span>
                <span className="text-secondary text-xs">Vulnerable</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FECACA', color: '#DC2626' }}>EN</span>
                <span className="text-secondary text-xs">En Peligro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}>CR</span>
                <span className="text-secondary text-xs">Crítico</span>
              </div>
            </div>
          </div>

          {/* Sección Pisos Climáticos */}
          <div>
            <h4 className="font-semibold text-primary mb-1.5 text-xs">
              Pisos climáticos
            </h4>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#90EE90' }}></div>
                <span className="text-secondary text-xs">Tropical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#D2B48C' }}></div>
                <span className="text-secondary text-xs">Subtropical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#CD853F' }}></div>
                <span className="text-secondary text-xs">Templado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#8B4513' }}></div>
                <span className="text-secondary text-xs">Frío</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: '#A0522D' }}></div>
                <span className="text-secondary text-xs">Páramo</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

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
