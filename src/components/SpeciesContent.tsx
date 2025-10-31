'use client';

import { FrogSpecies, FrogOrder, FrogFamily, FrogGenus } from '@/data/frogsData';
import SpeciesTechnicalSheet from './SpeciesTechnicalSheet';

interface SpeciesContentProps {
  readonly species: FrogSpecies;
  readonly order: FrogOrder;
  readonly family: FrogFamily;
  readonly genus: FrogGenus;
}

export default function SpeciesContent({ species, order, family, genus }: SpeciesContentProps) {
  // Extraer solo el nombre del orden sin el texto entre paréntesis
  const orderName = order.name.split(' (')[0];
  
  return (
    <div className="flex flex-col">
      {/* Ficha técnica científica con layout fijo + scroll */}
      <div className="overflow-hidden">
        <SpeciesTechnicalSheet
          scientificName={species.scientificName}
          collectors={`${species.discoverers}, ${species.discoveryYear}`}
          commonName={species.commonName}
          order={orderName}
          orderId={order.id}
          family={family.name}
          familyId={family.id}
          genus={genus.name}
          genusId={genus.id}
          etymology={species.etymology}
          identification={species.definition}
          naturalHistory={species.content}
          distribution={species.distributionText}
          conservation={`Estado: ${species.redListStatus}`}
          isEndemic={species.isEndemic}
          redListStatus={species.redListStatus}
          altitudinalRange={species.altitudinalRange}
          climaticFloors={species.climaticFloors}
        />
      </div>
    </div>
  );
}

