import FrogAccordion from '@/components/FrogAccordion';
import { frogsData } from '@/data/frogsData';

export default function Home() {
  // Calcular estadísticas
  const totalOrders = frogsData.length;
  const totalFamilies = frogsData.reduce((acc, order) => acc + order.families.length, 0);
  const totalGenera = frogsData.reduce((acc, order) => 
    acc + order.families.reduce((famAcc, family) => famAcc + family.genera.length, 0), 0
  );
  const totalSpecies = frogsData.reduce((acc, order) => 
    acc + order.families.reduce((famAcc, family) => 
      famAcc + family.genera.reduce((genAcc, genus) => genAcc + genus.species.length, 0), 0
    ), 0
  );
  const totalEndemic = frogsData.reduce((acc, order) => 
    acc + order.families.reduce((famAcc, family) => 
      famAcc + family.genera.reduce((genAcc, genus) => 
        genAcc + genus.species.filter(s => s.isEndemic).length, 0
      ), 0
    ), 0
  );
  const totalRedList = frogsData.reduce((acc, order) => 
    acc + order.families.reduce((famAcc, family) => 
      famAcc + family.genera.reduce((genAcc, genus) => 
        genAcc + genus.species.filter(s => ['VU', 'EN', 'CR', 'EW', 'EX'].includes(s.redListStatus)).length, 0
      ), 0
    ), 0
  );

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Guía de Especies de Anfibios
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Explora la increíble diversidad de anfibios a través de esta guía interactiva 
            organizada por órdenes, familias, géneros y especies. Descubre información detallada 
            sobre hábitats, características y estado de conservación.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-card text-primary px-4 py-2 border border-gray-200">
              <span className="font-semibold">Órdenes:</span> {totalOrders}
            </span>
            <span className="bg-card text-primary px-4 py-2 border border-gray-200">
              <span className="font-semibold">Familias:</span> {totalFamilies}
            </span>
            <span className="bg-card text-primary px-4 py-2 border border-gray-200">
              <span className="font-semibold">Géneros:</span> {totalGenera}
            </span>
            <span className="bg-card text-primary px-4 py-2 border border-gray-200">
              <span className="font-semibold">Especies:</span> {totalSpecies}
            </span>
            <span className="bg-card text-primary px-4 py-2 border border-gray-200">
              <span className="font-semibold">Endémicas:</span> {totalEndemic}
            </span>
            <span className="bg-card text-primary px-4 py-2 border border-gray-200">
              <span className="font-semibold">En Lista Roja:</span> {totalRedList}
            </span>
        </div>
      </div>

      {/* Accordion */}
        <div className="w-full">
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