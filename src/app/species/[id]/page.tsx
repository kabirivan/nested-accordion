'use client';

import { useParams, useRouter } from 'next/navigation';
import { frogsData } from '@/data/frogsData';
import SpeciesContent from '@/components/SpeciesContent';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function SpeciesPage() {
  const params = useParams();
  const router = useRouter();
  const speciesId = params.id as string;

  // Buscar la especie, familia, género y orden en los datos
  let foundSpecies = null;
  let foundFamily = null;
  let foundGenus = null;
  let foundOrder = null;
  
  for (const order of frogsData) {
    for (const family of order.families) {
      for (const genus of family.genera) {
        const species = genus.species.find(s => s.id === speciesId);
        if (species) {
          foundSpecies = species;
          foundFamily = family;
          foundGenus = genus;
          foundOrder = order;
          break;
        }
      }
      if (foundSpecies) break;
    }
    if (foundSpecies) break;
  }

  if (!foundSpecies) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Especie no encontrada</h1>
          <button
            onClick={() => router.push('/')}
            className="text-primary hover:underline"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header con breadcrumbs */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: foundOrder?.name || 'Orden', href: foundOrder ? `/order/${foundOrder.id}` : undefined },
              { 
                label: foundFamily?.name || 'Familia',
                href: foundFamily ? `/family/${foundFamily.id}` : undefined
              },
              { 
                label: foundGenus?.name || 'Género',
                href: foundGenus ? `/genus/${foundGenus.id}` : undefined
              },
              { label: foundSpecies.scientificName }
            ]}
          />
        </div>
      </header>

      {/* Contenido de la especie */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SpeciesContent species={foundSpecies} />
      </main>
    </div>
  );
}

