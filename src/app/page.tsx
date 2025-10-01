import FrogAccordion from '@/components/FrogAccordion';
import { frogsData } from '@/data/frogsData';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="text-6xl md:text-8xl">🐸</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Guía de Especies de Ranas del Mundo
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Explora la increíble diversidad de anfibios a través de esta guía interactiva 
            organizada por órdenes, familias y especies. Descubre información detallada 
            sobre hábitats, características y estado de conservación.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-card text-primary px-4 py-2 border border-gray-200">
              <span className="font-semibold">📊</span> {frogsData.length} Órdenes
            </span>
            <span className="bg-card text-primary px-4 py-2 border border-gray-200">
              <span className="font-semibold">🏷️</span> {frogsData.reduce((acc, order) => acc + order.families.length, 0)} Familias
            </span>
            <span className="bg-card text-primary px-4 py-2 border border-gray-200">
              <span className="font-semibold">🐸</span> {frogsData.reduce((acc, order) => 
                acc + order.families.reduce((famAcc, family) => famAcc + family.species.length, 0), 0
              )} Especies
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-3">
            📖 Cómo usar esta guía
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-secondary">
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <p>Haz clic en los <strong>órdenes</strong> (nivel superior) para expandir las familias</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <p>Explora las <strong>familias</strong> para ver las especies disponibles</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <p>Descubre información detallada sobre cada <strong>especie</strong></p>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="max-w-6xl mx-auto">
          <FrogAccordion orders={frogsData} />
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