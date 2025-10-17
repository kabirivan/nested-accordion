'use client';

import { useParams, useRouter } from 'next/navigation';
import { frogsData } from '@/data/frogsData';
import SpeciesContent from '@/components/SpeciesContent';

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
      {/* Contenido de la especie */}
      <main style={{ backgroundColor: '#f5f5f5' }} className="min-h-screen">
        <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
          <SpeciesContent species={foundSpecies} />
        </div>
      </main>
    </div>
  );
}

