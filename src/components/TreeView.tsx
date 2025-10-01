'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, DocumentTextIcon, RectangleGroupIcon } from '@heroicons/react/24/outline';
import { FrogOrder, FrogFamily, FrogSpecies } from '@/data/frogsData';
import ClimaticFloorChart from './ClimaticFloorChart';
import RedListStatus from './RedListStatus';
import TechnicalSheet from './TechnicalSheet';

interface TreeViewProps {
  readonly orders: FrogOrder[];
}

export default function TreeView({ orders }: TreeViewProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedSheet, setSelectedSheet] = useState<{ type: 'species' | 'family', data: FrogSpecies | FrogFamily } | null>(null);

  const toggleItem = (itemId: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };

  const isExpanded = (itemId: string) => expandedItems.has(itemId);

  const renderSpecies = (species: FrogSpecies, depth: number, isLast: boolean) => (
    <div key={species.id} className="flex items-center gap-3 py-2 hover:bg-subtle transition-colors relative">
      <div className="flex items-center" style={{ width: `${depth * 24}px` }}>
        {/* Líneas de conexión */}
        {Array.from({ length: depth }).map((_, i) => (
          <div key={`species-line-${species.id}-${i}`} className="w-6 h-full relative">
            {i === depth - 1 ? (
              <>
                {/* Línea vertical y horizontal para el último nivel */}
                <div className={`absolute left-0 w-px bg-gray-300 ${isLast ? 'h-1/2' : 'h-full'}`} style={{ top: 0 }} />
                <div className="absolute left-0 top-1/2 w-3 h-px bg-gray-300" />
              </>
            ) : (
              /* Línea vertical continua para niveles anteriores */
              <div className="absolute left-0 w-px h-full bg-gray-300" />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <div className="flex-1">
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
        
        <div className="w-8 text-center">
          {species.isEndemic ? (
            <span className="text-black text-lg">✓</span>
          ) : (
            <span className="text-tertiary text-lg">-</span>
          )}
        </div>
        
        <div className="w-12 text-center">
          <RedListStatus status={species.redListStatus} />
        </div>
        
        <div className="w-20">
          <ClimaticFloorChart 
            altitudinalRange={species.altitudinalRange}
            climaticFloors={species.climaticFloors}
          />
        </div>

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

  const renderFamily = (family: FrogFamily, depth: number, isLast: boolean) => {
    const familyId = `family-${family.id}`;
    const expanded = isExpanded(familyId);

    return (
      <div key={family.id}>
        <div className="flex items-center gap-3 py-3 hover:bg-subtle transition-colors relative">
          <div className="flex items-center" style={{ width: `${depth * 24}px` }}>
            {/* Líneas de conexión */}
            {Array.from({ length: depth }).map((_, i) => (
              <div key={`family-line-${family.id}-${i}`} className="w-6 h-full relative">
                {i === depth - 1 ? (
                  <>
                    {/* Línea vertical y horizontal para el último nivel */}
                    <div className={`absolute left-0 w-px bg-gray-300 ${isLast && !expanded ? 'h-1/2' : 'h-full'}`} style={{ top: 0 }} />
                    <div className="absolute left-0 top-1/2 w-3 h-px bg-gray-300" />
                  </>
                ) : (
                  /* Línea vertical continua para niveles anteriores */
                  <div className="absolute left-0 w-px h-full bg-gray-300" />
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={() => toggleItem(familyId)}
            className="flex-shrink-0"
          >
            {expanded ? (
              <ChevronDownIcon className="h-5 w-5 text-secondary" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-secondary" />
            )}
          </button>

          <div className="flex-1 cursor-pointer" onClick={() => toggleItem(familyId)}>
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
        </div>

        {expanded && (
          <div>
            {family.species.map((species, index) => 
              renderSpecies(species, depth + 1, index === family.species.length - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderOrder = (order: FrogOrder, depth: number) => {
    const orderId = `order-${order.id}`;
    const expanded = isExpanded(orderId);

    return (
      <div key={order.id} className="mb-2">
        <div className="flex items-center gap-3 py-4 bg-gray-100 hover:bg-gray-200 transition-colors border-l-4 border-gray-700">
          <div style={{ width: `${depth * 24}px` }} />
          
          <button
            onClick={() => toggleItem(orderId)}
            className="flex-shrink-0"
          >
            {expanded ? (
              <ChevronDownIcon className="h-6 w-6 text-primary" />
            ) : (
              <ChevronRightIcon className="h-6 w-6 text-primary" />
            )}
          </button>

          <div className="flex-1 cursor-pointer" onClick={() => toggleItem(orderId)}>
            <h2 className="text-xl font-bold text-primary">{order.name}</h2>
            <p className="text-secondary mt-1">
              {order.summary.totalSpecies} especies, {order.summary.totalFamilies} familias 
              ({order.summary.endemicSpecies} endémicas, {order.summary.redListSpecies} en Lista Roja)
            </p>
          </div>
        </div>

        {expanded && (
          <div className="bg-white">
            {order.families.map((family, index) => 
              renderFamily(family, depth + 1, index === order.families.length - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-6">
      {/* Menú lateral - Guía de Interpretación */}
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-4 bg-card p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-primary mb-4 pb-3 border-b border-gray-200">
            Guía de Interpretación
          </h3>
          
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

      {/* Contenido principal - Tree View */}
      <main className="flex-1 min-w-0">
        <div className="bg-white">
          {orders.map((order) => renderOrder(order, 0))}
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

