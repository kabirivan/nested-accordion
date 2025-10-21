'use client';

import { FrogSpecies } from '@/data/frogsData';
import SpeciesTechnicalSheet from './SpeciesTechnicalSheet';

interface SpeciesContentProps {
  readonly species: FrogSpecies;
}

export default function SpeciesContent({ species }: SpeciesContentProps) {
  return (
    <div className="flex flex-col">
      {/* Ficha técnica científica con layout fijo + scroll */}
      <div className="overflow-hidden">
        <SpeciesTechnicalSheet
          scientificName={species.scientificName}
          collectors={`${species.discoverers}, ${species.discoveryYear}`}
          commonName={species.commonName}
          order="Anura"
          family="Bufonidae"
          genus={species.scientificName.split(' ')[0]}
          etymology={species.etymology}
          identification={species.definition}
          naturalHistory={species.content}
          distribution={species.distributionText}
          conservation={`Estado: ${species.redListStatus}`}
          isEndemic={species.isEndemic}
          redListStatus={species.redListStatus}
        />
      </div>
    </div>
  );
}

