'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FrogOrder } from '@/data/frogsData';

interface OrderContentProps {
  readonly order: FrogOrder;
}

export default function OrderContent({ order }: OrderContentProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'families'>('general');

  const renderGeneralTab = () => (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 border border-gray-200">
          <div className="text-2xl font-bold text-primary">{order.summary.totalFamilies}</div>
          <div className="text-sm text-secondary">Familias</div>
        </div>
        <div className="bg-gray-50 p-4 border border-gray-200">
          <div className="text-2xl font-bold text-primary">{order.summary.totalSpecies}</div>
          <div className="text-sm text-secondary">Especies totales</div>
        </div>
        <div className="bg-gray-50 p-4 border border-gray-200">
          <div className="text-2xl font-bold text-primary">{order.summary.endemicSpecies}</div>
          <div className="text-sm text-secondary">Especies endémicas</div>
        </div>
        <div className="bg-gray-50 p-4 border border-gray-200">
          <div className="text-2xl font-bold text-primary">{order.summary.redListSpecies}</div>
          <div className="text-sm text-secondary">En Lista Roja</div>
        </div>
      </div>

      {/* Descripción */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-2">Descripción</h3>
        <p className="text-secondary leading-relaxed">{order.description}</p>
      </div>
    </div>
  );

  const renderFamiliesTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Familias ({order.families.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {order.families.map((family) => (
          <Link
            key={family.id}
            href={`/family/${family.id}`}
            className="block p-4 bg-white border border-gray-200 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-start gap-4">
              {/* Imagen */}
              {family.imageUrl && (
                <div className="w-20 h-20 bg-gray-200 flex-shrink-0 overflow-hidden">
                  <img
                    src={family.imageUrl}
                    alt={family.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-primary group-hover:underline mb-1">
                  {family.name}
                </h4>
                <p className="text-sm text-tertiary mb-2">
                  {family.commonNames.join(', ')}
                </p>
                <div className="text-xs text-secondary">
                  {family.summary.totalSpecies} especies • {family.summary.totalGenera} géneros
                </div>
                <div className="text-xs text-secondary">
                  {family.summary.endemicSpecies} endémicas • {family.summary.redListSpecies} en Lista Roja
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
      {/* Header fijo */}
      <div className="flex-shrink-0">
        {/* Título */}
        <div className="px-6 py-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-primary mb-2">{order.name}</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'general'
                ? 'text-primary border-b-2 border-primary'
                : 'text-tertiary hover:text-secondary'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('families')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'families'
                ? 'text-primary border-b-2 border-primary'
                : 'text-tertiary hover:text-secondary'
            }`}
          >
            Familias
          </button>
        </div>
      </div>

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="flex gap-8 p-6">
            {/* Contenido principal */}
            <div className="flex-1 min-w-0">
              {activeTab === 'general' && renderGeneralTab()}
              {activeTab === 'families' && renderFamiliesTab()}
            </div>

            {/* Cuadro resumen lateral (estilo Wikipedia) */}
            {activeTab === 'general' && (
              <aside className="w-80 flex-shrink-0 ml-4">
                <div className="sticky top-4 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  {/* Título */}
                  <div className="bg-gray-200 px-4 py-3 text-center border-b border-gray-300">
                    <h3 className="text-xl font-bold text-primary">
                      {order.name}
                    </h3>
                  </div>

                  {/* Información */}
                  <div className="p-4 space-y-3">
                    <div className="border-b border-gray-200 pb-3">
                      <div className="text-xs text-tertiary mb-1">Clasificación científica</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-tertiary">Reino:</span>
                          <span className="text-secondary">Animalia</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-tertiary">Filo:</span>
                          <span className="text-secondary">Chordata</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-tertiary">Clase:</span>
                          <span className="text-secondary">Amphibia</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-tertiary">Orden:</span>
                          <span className="text-secondary font-semibold">{order.name.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-tertiary mb-2">Estadísticas</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-tertiary">Familias:</span>
                          <span className="text-secondary font-semibold">{order.summary.totalFamilies}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-tertiary">Especies:</span>
                          <span className="text-secondary font-semibold">{order.summary.totalSpecies}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-tertiary">Endémicas:</span>
                          <span className="text-secondary font-semibold">{order.summary.endemicSpecies}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-tertiary">En Lista Roja:</span>
                          <span className="text-secondary font-semibold">{order.summary.redListSpecies}</span>
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

