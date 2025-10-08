'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QuestionMarkCircleIcon, Bars3Icon, Squares2X2Icon, ChartBarIcon } from '@heroicons/react/24/outline';
import { FrogOrder, FrogFamily, FrogGenus, FrogSpecies } from '@/data/frogsData';
import ClimaticFloorChart from './ClimaticFloorChart';
import RedListStatus from './RedListStatus';
import InterpretationGuide from './InterpretationGuide';
import PhylogeneticTree from './PhylogeneticTree';

interface FrogAccordionProps {
  readonly orders: FrogOrder[];
}

export default function FrogAccordion({ orders }: FrogAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [showGuide, setShowGuide] = useState(false);
  const [viewMode, setViewMode] = useState<'accordion' | 'tree'>('accordion');


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
    <div
      key={species.id}
      className="bg-white px-4 py-3 flex items-center gap-4"
      style={{ marginLeft: '48px' }}
    >
      {/* Nombre científico */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/species/${species.id}`}
            className="text-gray-800 font-medium text-sm hover:underline italic"
          >
            {species.scientificName}
          </Link>
          <span className="text-gray-500 text-xs">
            {species.discoverers} ({species.discoveryYear})
          </span>
        </div>
        <div className="text-gray-600 text-xs mt-1">
          {species.commonName}
        </div>
      </div>
      
      {/* Endémica */}
      <div className="w-12 text-center">
        {species.isEndemic ? (
          <span className="text-gray-800 text-lg">✓</span>
        ) : (
          <span className="text-gray-400 text-lg">-</span>
        )}
      </div>
      
      {/* Lista Roja */}
      <div className="w-16 text-center">
        <RedListStatus status={species.redListStatus} />
      </div>
      
      {/* Pisos Climáticos */}
      <div className="w-40">
        <ClimaticFloorChart 
          altitudinalRange={species.altitudinalRange}
          climaticFloors={species.climaticFloors}
        />
      </div>
    </div>
  );

  const renderGenus = (genus: FrogGenus) => (
    <div key={genus.id} className="bg-white" style={{ marginLeft: '48px' }}>
      <div 
        onClick={() => toggleItem(`genus-${genus.id}`)}
        className="w-full px-4 py-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/genus/${genus.id}`}
              className="font-semibold text-gray-800 hover:underline italic"
              onClick={(e) => e.stopPropagation()}
            >
              {genus.name}
            </Link>
            <span className="text-gray-500 text-sm">
              {genus.commonName}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            {genus.summary.totalSpecies} especie{genus.summary.totalSpecies !== 1 ? 's' : ''} 
            ({genus.summary.endemicSpecies} endémica{genus.summary.endemicSpecies !== 1 ? 's' : ''}, {genus.summary.redListSpecies} en Lista Roja)
          </p>
        </div>
        <div className="ml-2 text-gray-600">
          <Bars3Icon className="h-5 w-3" />
        </div>
      </div>
      
      {isOpen(`genus-${genus.id}`) && (
        <div>
          {/* Header de la tabla */}
          <div className="px-4 py-2 bg-gray-100" style={{ marginLeft: '48px' }}>
            <div className="text-sm font-semibold text-gray-700 mb-2">
              Especie
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
              <div className="flex-1">Nombre</div>
              <div className="w-12 text-center">En</div>
              <div className="w-16 text-center">LR</div>
              <div className="w-40 text-center">Distribución</div>
            </div>
          </div>
          
          {/* Lista de especies */}
          <div>
            {genus.species.map(renderSpecies)}
          </div>
        </div>
      )}
    </div>
  );

  const renderFamily = (family: FrogFamily) => (
    <div key={family.id} className="bg-white" style={{ marginLeft: '48px' }}>
      <div 
        onClick={() => toggleItem(`family-${family.id}`)}
        className="w-full px-4 py-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/family/${family.id}`}
              className="font-semibold text-gray-800 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {family.name}
            </Link>
            <span className="text-gray-500 text-sm">
              {family.commonNames.join(', ')}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {family.summary.totalSpecies} especies, {family.summary.totalGenera} géneros 
            ({family.summary.endemicSpecies} endémicas, {family.summary.redListSpecies} en Lista Roja)
          </p>
        </div>
        <div className="ml-2 text-gray-600">
          <Bars3Icon className="h-5 w-3" />
        </div>
      </div>
      
      {isOpen(`family-${family.id}`) && (
        <div>
          {/* Header de géneros */}
          <div className="px-4 py-2 bg-gray-100" style={{ marginLeft: '48px' }}>
            <div className="text-sm font-semibold text-gray-700">
              Género
            </div>
          </div>
          
          {/* Lista de géneros */}
          {family.genera.map(renderGenus)}
        </div>
      )}
    </div>
  );

  const renderOrder = (order: FrogOrder) => (
    <div key={order.id} className="bg-white mb-4">
      <div 
        onClick={() => toggleItem(`order-${order.id}`)}
        className="w-full px-6 py-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex-1">
          <Link 
            href={`/order/${order.id}`} 
            className="text-xl font-bold text-gray-800 hover:underline inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            {order.name}
          </Link>
          <p className="text-gray-600 mt-1">
            {order.summary.totalSpecies} especies, {order.summary.totalFamilies} familias 
            ({order.summary.endemicSpecies} endémicas, {order.summary.redListSpecies} en Lista Roja)
          </p>
        </div>
        <div className="ml-2 text-gray-600">
          <Bars3Icon className="h-6 w-4" />
        </div>
      </div>
      
      {isOpen(`order-${order.id}`) && (
        <div>
          {/* Header de familias */}
          <div className="px-6 py-2 bg-gray-100" style={{ marginLeft: '48px' }}>
            <div className="text-sm font-semibold text-gray-700">
              Familia
            </div>
          </div>
          
          {/* Lista de familias */}
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

      {/* Contenido central - Acordeón o Árbol */}
      <main className="flex-1 min-w-0 relative">
        {/* Botones de cambio de vista */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setViewMode('accordion')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded transition-colors ${
              viewMode === 'accordion'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Squares2X2Icon className="h-4 w-4" />
            Acordeón
          </button>
          <button
            onClick={() => setViewMode('tree')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded transition-colors ${
              viewMode === 'tree'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ChartBarIcon className="h-4 w-4" />
            Árbol Filogenético
          </button>
        </div>

        {viewMode === 'accordion' ? (
          <>
            {/* Header de órdenes */}
            <div className="px-6 py-2 bg-gray-100 mb-4">
              <div className="text-sm font-semibold text-gray-700">
                Orden
              </div>
            </div>
            
            <div className="space-y-4">
              {orders.map(renderOrder)}
            </div>
          </>
        ) : (
          <PhylogeneticTree orders={orders} />
        )}

        {/* Botón flotante de Guía de Interpretación */}
        <button
          onClick={() => setShowGuide(true)}
          className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full border-2 border-gray-800 hover:bg-gray-800 transition-all duration-200 hover:scale-110 z-40"
          title="Guía de Interpretación"
        >
          <QuestionMarkCircleIcon className="h-8 w-8" />
        </button>
      </main>

      {/* Modal de Guía de Interpretación */}
      <InterpretationGuide
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />
    </div>
  );
}
