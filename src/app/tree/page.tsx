import TreeView from '@/components/TreeView';
import { frogsData } from '@/data/frogsData';
import Link from 'next/link';

export default function TreePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Vista de Árbol - Especies de Ranas
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Explora la jerarquía taxonómica completa en una vista de árbol expandible.
            Navega por órdenes, familias y especies de forma visual e intuitiva.
          </p>
          
          {/* Navegación entre vistas */}
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-2 bg-card text-primary border border-gray-200 hover:bg-subtle transition-colors"
            >
              Vista Acordeón
            </Link>
            <span className="px-6 py-2 bg-gray-700 text-white">
              Vista de Árbol
            </span>
          </div>
        </div>

        {/* Tree View */}
        <div className="max-w-7xl mx-auto">
          <TreeView orders={frogsData} />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            Datos compilados para fines educativos y de investigación.
            <br />
            Información basada en fuentes científicas confiables.
          </p>
        </footer>
      </div>
    </main>
  );
}

