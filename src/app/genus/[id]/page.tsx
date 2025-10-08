'use client';

import { useParams, useRouter } from 'next/navigation';
import { frogsData } from '@/data/frogsData';
import GenusContent from '@/components/GenusContent';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function GenusPage() {
  const params = useParams();
  const router = useRouter();
  const genusId = params.id as string;

  // Buscar el género, familia y orden en los datos
  let foundGenus = null;
  let foundFamily = null;
  let foundOrder = null;
  
  for (const order of frogsData) {
    for (const family of order.families) {
      const genus = family.genera.find(g => g.id === genusId);
      if (genus) {
        foundGenus = genus;
        foundFamily = family;
        foundOrder = order;
        break;
      }
    }
    if (foundGenus) break;
  }

  if (!foundGenus) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Género no encontrado</h1>
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
              { label: foundGenus.name }
            ]}
          />
        </div>
      </header>

      {/* Contenido del género */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GenusContent genus={foundGenus} />
      </main>
    </div>
  );
}


