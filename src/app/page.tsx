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
        {/* <div className="text-center mb-12">
        </div> */}

        {/* Accordion */}
        <div className="w-full">
          <FrogAccordion orders={frogsData} />
        </div>

        {/* Footer */}
        {/* <footer className="mt-16 text-center text-gray-500 text-sm">
        </footer> */}
      </div>
    </main>
  );
}