'use client';

import { useParams, useRouter } from 'next/navigation';
import { frogsData } from '@/data/frogsData';
import FamilyContent from '@/components/FamilyContent';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function FamilyPage() {
  const params = useParams();
  const router = useRouter();
  const familyId = params.id as string;

  // Buscar la familia y el orden en los datos
  let foundFamily = null;
  let foundOrder = null;
  
  for (const order of frogsData) {
    const family = order.families.find(f => f.id === familyId);
    if (family) {
      foundFamily = family;
      foundOrder = order;
      break;
    }
  }

  if (!foundFamily) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Familia no encontrada</h1>
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
              { label: foundFamily.name }
            ]}
          />
        </div>
      </header>

      {/* Contenido de la familia */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FamilyContent family={foundFamily} />
      </main>
    </div>
  );
}

