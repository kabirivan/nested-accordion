'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuestionMarkCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { FrogOrder, FrogFamily, FrogGenus, FrogSpecies } from '@/data/frogsData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClimaticFloorChart from './ClimaticFloorChart';
import RedListStatus from './RedListStatus';
import InterpretationGuide from './InterpretationGuide';
import PhylogeneticTree from './PhylogeneticTree';
import FiltersPanel from './FiltersPanel';

interface FrogAccordionProps {
  readonly orders: FrogOrder[];
}

interface Filters {
  provincia?: string;
  listaRoja?: string;
  endemismo?: string;
  pisosAltitudinales?: string;
  areaDistribucion?: string;
  ecosistemas?: string;
  regionesBiogeograficas?: string;
  reservasBiosfera?: string;
  bosquesProtegidos?: string;
  areasProtegidas?: string;
  pluviocidad?: { min: number; max: number };
  temperatura?: { min: number; max: number };
}

export default function FrogAccordion({ orders }: FrogAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [showGuide, setShowGuide] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  // Cargar el estado del acordeón desde localStorage al montar
  useEffect(() => {
    const savedState = localStorage.getItem('accordionOpenItems');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setOpenItems(new Set(parsedState));
      } catch (error) {
        console.error('Error al cargar el estado del acordeón:', error);
      }
    }
  }, []);

  // Guardar el estado del acordeón en localStorage cuando cambia
  useEffect(() => {
    if (openItems.size > 0) {
      localStorage.setItem('accordionOpenItems', JSON.stringify(Array.from(openItems)));
    } else {
      localStorage.removeItem('accordionOpenItems');
    }
  }, [openItems]);

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
          <div className="px-4 py-2" style={{ marginLeft: '48px', backgroundColor: '#e8e8e8' }}>
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
          <div className="px-4 py-2" style={{ marginLeft: '48px', backgroundColor: '#e8e8e8' }}>
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
          <div className="px-6 py-2" style={{ marginLeft: '48px', backgroundColor: '#e8e8e8' }}>
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
      <aside className="hidden 2xl:block w-80 flex-shrink-0">
        <FiltersPanel onFiltersChange={setFilters} />
        {Object.keys(filters).length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Filtros activos: {Object.keys(filters).length}
          </div>
        )}
      </aside>

      {/* Contenido central - Acordeón o Árbol */}
      <main className="flex-1 min-w-0 relative">
        <Tabs defaultValue="accordion" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="accordion">Acordeón</TabsTrigger>
            <TabsTrigger value="tree">Árbol Filogenético</TabsTrigger>
          </TabsList>

          <TabsContent value="accordion">
            {/* Header de órdenes */}
            <div className="px-6 py-2 bg-gray-100 mb-4" style={{ backgroundColor: '#e8e8e8' }}>
              <div className="text-sm font-semibold text-gray-700">
                Orden
              </div>
            </div>
            
            <div className="space-y-4">
              {orders.map(renderOrder)}
            </div>
          </TabsContent>

          <TabsContent value="tree">
            <PhylogeneticTree orders={orders} />
          </TabsContent>
        </Tabs>

        {/* Botón flotante de Guía de Interpretación */}
        <Button
          onClick={() => setShowGuide(true)}
          size="icon"
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg hover:scale-110 transition-transform z-40"
          title="Guía de Interpretación"
        >
          <QuestionMarkCircleIcon className="h-8 w-8" />
        </Button>
      </main>

      {/* Modal de Guía de Interpretación */}
      <InterpretationGuide
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />
    </div>
  );
}
