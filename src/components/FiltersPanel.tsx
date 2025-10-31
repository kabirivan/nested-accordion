'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { frogsData, FrogOrder, FrogFamily, FrogGenus, FrogSpecies } from '@/data/frogsData';

interface FiltersPanelProps {
  onFiltersChange: (filters: Record<string, unknown>) => void;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'order' | 'family' | 'genus' | 'species';
  path: string;
  commonName?: string;
}

export default function FiltersPanel({ onFiltersChange }: FiltersPanelProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    // Filtros categóricos (ahora arrays para múltiple selección)
    provincia: [] as string[],
    listaRoja: [] as string[],
    endemismo: [] as string[],
    pisosAltitudinales: [] as string[],
    ecosistemas: [] as string[],
    regionesBiogeograficas: [] as string[],
    reservasBiosfera: [] as string[],
    bosquesProtegidos: [] as string[],
    areasProtegidas: [] as string[],
    // Filtros continuos
    areaDistribucion: { min: 1, max: 100000 },
    pluviocidad: { min: 640, max: 4000 },
    temperatura: { min: 5, max: 25 }
  });

  // Función para buscar en todos los datos
  const searchData = (query: string): SearchResult[] => {
    if (!query || query.length < 2) return [];

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    frogsData.forEach((order: FrogOrder) => {
      // Buscar en órdenes
      if (order.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: order.id,
          name: order.name,
          type: 'order',
          path: `/order/${order.id}`,
        });
      }

      order.families.forEach((family: FrogFamily) => {
        // Buscar en familias
        if (family.name.toLowerCase().includes(lowerQuery) ||
          family.commonNames.some(cn => cn.toLowerCase().includes(lowerQuery))) {
          results.push({
            id: family.id,
            name: family.name,
            type: 'family',
            path: `/family/${family.id}`,
            commonName: family.commonNames[0],
          });
        }

        family.genera.forEach((genus: FrogGenus) => {
          // Buscar en géneros
          if (genus.name.toLowerCase().includes(lowerQuery) ||
            genus.commonName.toLowerCase().includes(lowerQuery)) {
            results.push({
              id: genus.id,
              name: genus.name,
              type: 'genus',
              path: `/genus/${genus.id}`,
              commonName: genus.commonName,
            });
          }

          genus.species.forEach((species: FrogSpecies) => {
            // Buscar en especies
            if (species.scientificName.toLowerCase().includes(lowerQuery) ||
              species.commonName.toLowerCase().includes(lowerQuery)) {
              results.push({
                id: species.id,
                name: species.scientificName,
                type: 'species',
                path: `/species/${species.id}`,
                commonName: species.commonName,
              });
            }
          });
        });
      });
    });

    return results.slice(0, 10); // Limitar a 10 resultados
  };

  const searchResults = searchData(searchQuery);

  const handleCategoricalChange = (key: string, value: string) => {
    const currentValues = filters[key as keyof typeof filters] as string[];
    let newValues: string[];

    if (currentValues.includes(value)) {
      // Si ya está seleccionado, quitarlo
      newValues = currentValues.filter(v => v !== value);
    } else {
      // Si no está seleccionado, agregarlo
      newValues = [...currentValues, value];
    }

    const newFilters = { ...filters, [key]: newValues };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSliderChange = (key: string, values: number[]) => {
    const newFilters = { ...filters, [key]: { min: values[0], max: values[1] } };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      provincia: [] as string[],
      listaRoja: [] as string[],
      endemismo: [] as string[],
      pisosAltitudinales: [] as string[],
      ecosistemas: [] as string[],
      regionesBiogeograficas: [] as string[],
      reservasBiosfera: [] as string[],
      bosquesProtegidos: [] as string[],
      areasProtegidas: [] as string[],
      areaDistribucion: { min: 1, max: 100000 },
      pluviocidad: { min: 640, max: 4000 },
      temperatura: { min: 5, max: 25 }
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'order': return 'Orden';
      case 'family': return 'Familia';
      case 'genus': return 'Género';
      case 'species': return 'Especie';
      default: return '';
    }
  };

  const handleSelectResult = (path: string) => {
    setOpen(false);
    setSearchQuery('');
    router.push(path);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col h-screen sticky top-0">
      {/* Buscador */}
      <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                placeholder="Buscar especies, géneros, familias..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpen(e.target.value.length >= 2);
                }}
                onFocus={() => {
                  if (searchQuery.length >= 2) {
                    setOpen(true);
                  }
                }}
                className="w-full"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[--radix-popover-trigger-width] p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command>
              <CommandList>
                {searchResults.length === 0 && searchQuery.length >= 2 && (
                  <CommandEmpty className="py-6 px-4">No se encontraron resultados.</CommandEmpty>
                )}
                {searchResults.length > 0 && (
                  <CommandGroup>
                    {searchResults.map((result) => (
                      <CommandItem
                        key={`${result.type}-${result.id}`}
                        onSelect={() => handleSelectResult(result.path)}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {getTypeLabel(result.type)}
                            </span>
                            <span className="font-medium italic">{result.name}</span>
                          </div>
                          {result.commonName && (
                            <span className="text-xs text-muted-foreground">
                              {result.commonName}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Título y botón de limpiar */}
      <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Filtros
          </h3>
          <Button
            onClick={resetFilters}
            variant="outline"
            size="sm"
          >
            Limpiar
          </Button>
        </div>
      </div>

      <div className="px-6 overflow-y-auto flex-1 filters-panel-scroll">
        <Accordion type="multiple" className="w-full">
          {/* Provincia */}
          <AccordionItem value="provincia">
            <AccordionTrigger>Provincia</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {[
                  'Azuay',
                  'Bolívar',
                  'Cañar',
                  'Carchi',
                  'Chimborazo',
                  'Cotopaxi',
                  'El Oro',
                  'Esmeraldas',
                  'Galápagos',
                  'Guayas',
                  'Imbabura',
                  'Loja',
                  'Los Ríos',
                  'Manabí',
                  'Morona Santiago',
                  'Napo',
                  'Orellana',
                  'Pastaza',
                  'Pichincha',
                  'Santa Elena',
                  'Santo Domingo de los Tsáchilas',
                  'Sucumbíos',
                  'Tungurahua',
                  'Zamora Chinchipe'
                ].map((province) => {
                  const value = province.toLowerCase().replace(' ', '-');
                  const isSelected = filters.provincia.includes(value);
                  return (
                    <Button
                      key={province}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('provincia', value)}
                      className="w-full text-xs px-2 py-1 h-auto min-h-[32px] justify-start text-left rounded-none"
                      style={{
                        borderColor: isSelected ? undefined : '#e8e8e8',
                        color: isSelected ? undefined : '#454545'
                      }}
                    >
                      {province}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Lista Roja */}
          <AccordionItem value="listaRoja">
            <AccordionTrigger>Lista roja</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'PM', label: 'Preocupación Menor (PM)' },
                  { value: 'CaA', label: 'Casi Amenazada (CaA)' },
                  { value: 'VU', label: 'Vulnerable (VU)' },
                  { value: 'EN', label: 'En Peligro (EN)' },
                  { value: 'CA', label: 'Críticamente Amenazada (CA)' },
                  { value: 'CA-PE', label: 'Críticamente Amenazada(CA-PE)' },
                  { value: 'DI', label: 'Datos Deficientes (DI)' }
                ].map((status) => {
                  const isSelected = filters.listaRoja.includes(status.value);
                  return (
                    <Button
                      key={status.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('listaRoja', status.value)}
                      className="w-full text-xs px-2 py-1 h-auto min-h-[32px] justify-start text-left rounded-none"
                      style={{
                        borderColor: isSelected ? undefined : '#e8e8e8',
                        color: isSelected ? undefined : '#454545'
                      }}
                    >
                      {status.label}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Endemismo */}
          <AccordionItem value="endemismo">
            <AccordionTrigger>Endemismo</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'endemic', label: 'Endémicas' },
                  { value: 'non-endemic', label: 'No endémicas' }
                ].map((option) => {
                  const isSelected = filters.endemismo.includes(option.value);
                  return (
                    <Button
                      key={option.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('endemismo', option.value)}
                      className="w-full text-xs px-2 py-1 h-auto min-h-[32px] justify-start text-left rounded-none"
                      style={{
                        borderColor: isSelected ? undefined : '#e8e8e8',
                        color: isSelected ? undefined : '#454545'
                      }}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Pisos Altitudinales */}
          <AccordionItem value="pisosAltitudinales">
            <AccordionTrigger>Pisos altitudinales</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'tropical-occidental', label: 'Tropical Occidental (0-1000m)' },
                  { value: 'subtropical-occidental', label: 'Subtropical Occidental (1001-2000m)' },
                  { value: 'templado-occidental', label: 'Templado Occidental (2001-3000m)' },
                  { value: 'altoandino', label: 'Altoandino (3001-4800m)' },
                  { value: 'templado-oriental', label: 'Templado Oriental (2001-3000m)' },
                  { value: 'subtropical-oriental', label: 'Subtropical Oriental (1001-2000m)' },
                  { value: 'tropical-oriental', label: 'Tropical Oriental (0-1000m)' }
                ].map((floor) => {
                  const isSelected = filters.pisosAltitudinales.includes(floor.value);
                  return (
                    <Button
                      key={floor.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('pisosAltitudinales', floor.value)}
                      className="w-full text-xs px-2 py-1 h-auto min-h-[32px] justify-start text-left rounded-none"
                      style={{
                        borderColor: isSelected ? undefined : '#e8e8e8',
                        color: isSelected ? undefined : '#454545'
                      }}
                    >
                      {floor.label}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Área Distribución */}
          <AccordionItem value="areaDistribucion">
            <AccordionTrigger>Área distribución</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filters.areaDistribucion.min} km²</span>
                  <span>{filters.areaDistribucion.max} km²</span>
                </div>
                <Slider
                  min={1}
                  max={100000}
                  step={100}
                  value={[filters.areaDistribucion.min, filters.areaDistribucion.max]}
                  onValueChange={(values) => handleSliderChange('areaDistribucion', values)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Ecosistemas */}
          <AccordionItem value="ecosistemas">
            <AccordionTrigger>Ecosistemas</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'agua', label: 'Agua' },
                  { value: 'arbustal-deciduo-y-herbazal-de-playas-del-litoral', label: 'Arbustal deciduo y Herbazal de playas del Litoral' },
                  { value: 'arbustal-desertico-de-tierras-bajas-del-jama-zapotillo', label: 'Arbustal desértico de tierras bajas del Jama-Zapotillo' },
                  { value: 'arbustal-desertico-del-sur-de-los-valles', label: 'Arbustal desértico del sur de los Valles' },
                  { value: 'arbustal-semideciduo-del-sur-de-los-valles', label: 'Arbustal semideciduo del sur de los Valles' },
                  { value: 'arbustal-siempreverde-montano-alto-del-paramo-del-sur', label: 'Arbustal siempreverde montano alto del Páramo del sur' },
                  { value: 'arbustal-siempreverde-montano-del-norte-de-los-andes', label: 'Arbustal siempreverde montano del norte de los Andes' },
                  { value: 'arbustal-siempreverde-montano-del-sur-de-los-andes', label: 'Arbustal siempreverde montano del sur de los Andes' },
                  { value: 'arbustal-siempreverde-ripario-de-la-cordillera-oriental-de-los-andes', label: 'Arbustal siempreverde ripario de la Cordillera Oriental de los Andes' },
                  { value: 'arbustal-siempreverde-y-herbazal-del-paramo', label: 'Arbustal siempreverde y Herbazal del Páramo' },
                  { value: 'arbustal-siempreverde-y-herbazal-montano-de-la-cordillera-del-condor', label: 'Arbustal siempreverde y Herbazal montano de la cordillera del Cóndor' },
                  { value: 'bosque-bajo-y-arbustal-deciduo-de-tierras-bajas-del-jama-zapotillo', label: 'Bosque bajo y Arbustal deciduo de tierras bajas del Jama-Zapotillo' },
                  { value: 'bosque-deciduo-de-cordillera-costera-del-pacifico-ecuatorial', label: 'Bosque deciduo de Cordillera Costera del Pacífico Ecuatorial' },
                  { value: 'bosque-deciduo-de-tierras-bajas-del-jama-zapotillo', label: 'Bosque deciduo de tierras bajas del Jama-Zapotillo' },
                  { value: 'bosque-deciduo-montano-bajo-del-catamayo-alamor', label: 'Bosque deciduo montano bajo del Catamayo-Alamor' },
                  { value: 'bosque-deciduo-piemontano-del-catamayo-alamor', label: 'Bosque deciduo piemontano del Catamayo-Alamor' },
                  { value: 'bosque-inundable-de-la-llanura-aluvial-de-los-rios-de-origen-amazonico', label: 'Bosque inundable de la llanura aluvial de los ríos de origen amazónico' },
                  { value: 'bosque-inundable-de-la-llanura-aluvial-de-los-rios-de-origen-andino-y-de-cordilleras-amazonicas', label: 'Bosque inundable de la llanura aluvial de los ríos de origen andino y de Cordilleras Amazónicas' },
                  { value: 'bosque-inundable-de-llanura-intermareal-del-choco-ecuatorial', label: 'Bosque inundable de llanura intermareal del Chocó Ecuatorial' },
                  { value: 'bosque-inundable-y-vegetacin-lacustre-riparia-de-aguas-negras-de-la-amazonia', label: 'Bosque inundable y vegetacin lacustre-riparia de aguas negras de la Amazonía' },
                  { value: 'bosque-inundado-de-la-llanura-aluvial-de-la-amazonia', label: 'Bosque inundado de la llanura aluvial de la Amazonía' },
                  { value: 'bosque-inundado-de-llanura-aluvial-del-choco-ecuatorial', label: 'Bosque inundado de llanura aluvial del Chocó Ecuatorial' },
                  { value: 'bosque-inundado-de-palmas-de-la-llanura-aluvial-de-la-amazonia', label: 'Bosque inundado de palmas de la llanura aluvial de la Amazonía' },
                  { value: 'bosque-semideciduo-de-cordillera-costera-del-pacifico-ecuatorial', label: 'Bosque semideciduo de Cordillera Costera del Pacífico Ecuatorial' },
                  { value: 'bosque-semideciduo-de-tierras-bajas-del-jama-zapotillo', label: 'Bosque semideciduo de tierras bajas del Jama-Zapotillo' },
                  { value: 'bosque-semideciduo-montano-bajo-del-catamayo-alamor', label: 'Bosque semideciduo montano bajo del Catamayo-Alamor' },
                  { value: 'bosque-semideciduo-piemontano-del-catamayo-alamor', label: 'Bosque semideciduo piemontano del Catamayo-Alamor' },
                  { value: 'bosque-semideciduo-piemontano-del-sur-de-la-cordillera-oriental-de-los-andes', label: 'Bosque semideciduo piemontano del Sur de la Cordillera Oriental de los Andes' },
                  { value: 'bosque-siempreverde-de-tierras-bajas-con-bambu-de-la-amazonia', label: 'Bosque siempreverde de tierras bajas con bambú de la Amazonía' },
                  { value: 'bosque-siempreverde-de-tierras-bajas-del-abanico-del-pastaza', label: 'Bosque siempreverde de tierras bajas del Abanico del Pastaza' },
                  { value: 'bosque-siempreverde-de-tierras-bajas-del-aguarico-putumayo-caqueta', label: 'Bosque siempreverde de tierras bajas del Aguarico-Putumayo-Caquetá' },
                  { value: 'bosque-siempreverde-de-tierras-bajas-del-choco-ecuatorial', label: 'Bosque siempreverde de tierras bajas del Chocó Ecuatorial' },
                  { value: 'bosque-siempreverde-de-tierras-bajas-del-napo-curaray', label: 'Bosque siempreverde de tierras bajas del Napo-Curaray' },
                  { value: 'bosque-siempreverde-de-tierras-bajas-del-tigre-pastaza', label: 'Bosque siempreverde de tierras bajas del Tigre-Pastaza' },
                  { value: 'bosque-siempreverde-del-paramo', label: 'Bosque siempreverde del Páramo' },
                  { value: 'bosque-siempreverde-estacional-de-tierras-bajas-del-choco-ecuatorial', label: 'Bosque siempreverde estacional de tierras bajas del Chocó Ecuatorial' },
                  { value: 'bosque-siempreverde-estacional-de-tierras-bajas-del-jama-zapotillo', label: 'Bosque siempreverde estacional de tierras bajas del Jama-Zapotillo' },
                  { value: 'bosque-siempreverde-estacional-inundable-de-llanura-aluvial-del-jama-zapotillo', label: 'Bosque siempreverde estacional inundable de llanura aluvial del Jama-Zapotillo' },
                  { value: 'bosque-siempreverde-estacional-montano-bajo-de-cordillera-costera-del-pacifico-ecuatorial', label: 'Bosque siempreverde estacional montano bajo de Cordillera Costera del Pacífico Ecuatorial' },
                  { value: 'bosque-siempreverde-estacional-montano-bajo-del-catamayo-alamor', label: 'Bosque siempreverde estacional montano bajo del Catamayo-Alamor' },
                  { value: 'bosque-siempreverde-estacional-piemontano-de-cordillera-costera-del-choco', label: 'Bosque siempreverde estacional piemontano de Cordillera Costera del Chocó' },
                  { value: 'bosque-siempreverde-estacional-piemontano-de-cordillera-costera-del-pacifico-ecuatorial', label: 'Bosque siempreverde estacional piemontano de Cordillera Costera del Pacífico Ecuatorial' },
                  { value: 'bosque-siempreverde-estacional-piemontano-de-cordillera-occidental-de-los-andes', label: 'Bosque siempreverde estacional piemontano de Cordillera Occidental de los Andes' },
                  { value: 'bosque-siempreverde-estacional-piemontano-del-catamayo-alamor', label: 'Bosque siempreverde estacional piemontano del Catamayo-Alamor' },
                  { value: 'bosque-siempreverde-montano-alto-de-cordillera-occidental-de-los-andes', label: 'Bosque siempreverde montano alto de Cordillera Occidental de los Andes' },
                  { value: 'bosque-siempreverde-montano-alto-del-catamayo-alamor', label: 'Bosque siempreverde montano alto del Catamayo-Alamor' },
                  { value: 'bosque-siempreverde-montano-alto-del-norte-de-la-cordillera-oriental-de-los-andes', label: 'Bosque siempreverde montano alto del Norte de la Cordillera Oriental de los Andes' },
                  { value: 'bosque-siempreverde-montano-alto-del-sur-de-la-cordillera-oriental-de-los-andes', label: 'Bosque siempreverde montano alto del Sur de la Cordillera Oriental de los Andes' },
                  { value: 'bosque-siempreverde-montano-bajo-de-cordillera-costera-del-choco', label: 'Bosque siempreverde montano bajo de Cordillera Costera del Chocó' },
                  { value: 'bosque-siempreverde-montano-bajo-de-cordillera-occidental-de-los-andes', label: 'Bosque siempreverde montano bajo de Cordillera Occidental de los Andes' },
                  { value: 'bosque-siempreverde-montano-bajo-de-galeras', label: 'Bosque siempreverde montano bajo de Galeras' },
                  { value: 'bosque-siempreverde-montano-bajo-de-las-cordilleras-del-condor-kutuku', label: 'Bosque siempreverde montano bajo de las cordilleras del Cóndor-Kutukú' },
                  { value: 'bosque-siempreverde-montano-bajo-del-catamayo-alamor', label: 'Bosque siempreverde montano bajo del Catamayo-Alamor' },
                  { value: 'bosque-siempreverde-montano-bajo-del-norte-de-la-cordillera-oriental-de-los-andes', label: 'Bosque siempreverde montano bajo del Norte de la Cordillera Oriental de los Andes' },
                  { value: 'bosque-siempreverde-montano-bajo-del-sur-de-la-cordillera-oriental-de-los-andes', label: 'Bosque siempreverde montano bajo del Sur de la Cordillera Oriental de los Andes' },
                  { value: 'bosque-siempreverde-montano-bajo-sobre-mesetas-de-arenisca-de-las-cordilleras-del-condor-kutuku', label: 'Bosque siempreverde montano bajo sobre mesetas de arenisca de las cordilleras del Cóndor-Kutukú' },
                  { value: 'bosque-siempreverde-montano-de-cordillera-occidental-de-los-andes', label: 'Bosque siempreverde montano de Cordillera Occidental de los Andes' },
                  { value: 'bosque-siempreverde-montano-de-las-cordilleras-del-condor-kutuku', label: 'Bosque siempreverde montano de las cordilleras del Cóndor-Kutukú' },
                  { value: 'bosque-siempreverde-montano-del-catamayo-alamor', label: 'Bosque siempreverde montano del Catamayo-Alamor' },
                  { value: 'bosque-siempreverde-montano-del-norte-de-la-cordillera-oriental-de-los-andes', label: 'Bosque siempreverde montano del Norte de la Cordillera Oriental de los Andes' },
                  { value: 'bosque-siempreverde-montano-del-sur-de-la-cordillera-oriental-de-los-andes', label: 'Bosque siempreverde montano del Sur de la Cordillera Oriental de los Andes' },
                  { value: 'bosque-siempreverde-montano-sobre-mesetas-de-arenisca-de-la-cordillera-del-condor', label: 'Bosque siempreverde montano sobre mesetas de arenisca de la cordillera del Cóndor' },
                  { value: 'bosque-siempreverde-piemontano-de-cordillera-occidental-de-los-andes', label: 'Bosque siempreverde piemontano de Cordillera Occidental de los Andes' },
                  { value: 'bosque-siempreverde-piemontano-de-galeras', label: 'Bosque siempreverde piemontano de Galeras' },
                  { value: 'bosque-siempreverde-piemontano-de-las-cordilleras-del-condor-kutuku', label: 'Bosque siempreverde piemontano de las cordilleras del Cóndor-Kutukú' },
                  { value: 'bosque-siempreverde-piemontano-del-catamayo-alamor', label: 'Bosque siempreverde piemontano del Catamayo-Alamor' },
                  { value: 'bosque-siempreverde-piemontano-del-norte-de-la-cordillera-oriental-de-los-andes', label: 'Bosque siempreverde piemontano del Norte de la Cordillera Oriental de los Andes' },
                  { value: 'bosque-siempreverde-piemontano-del-sur-de-la-cordillera-oriental-de-los-andes', label: 'Bosque siempreverde piemontano del Sur de la Cordillera Oriental de los Andes' },
                  { value: 'bosque-siempreverde-piemontano-sobre-afloramientos-de-roca-caliza-de-las-cordilleras-amazonicas', label: 'Bosque siempreverde piemontano sobre afloramientos de roca caliza de las Cordilleras Amazónicas' },
                  { value: 'bosque-siempreverde-piemontano-sobre-mesetas-de-arenisca-de-las-cordilleras-del-condor-kutuku', label: 'Bosque siempreverde piemontano sobre mesetas de arenisca de las cordilleras del Cóndor-Kutukú' },
                  { value: 'bosque-siempreverde-sobre-mesetas-de-arenisca-de-la-cordillera-del-condor-en-la-baja-amazonia-ecuatoriana', label: 'Bosque siempreverde sobre mesetas de arenisca de la cordillera del Cóndor en la baja Amazonía Ecuatoriana' },
                  { value: 'bosque-y-arbustal-semideciduo-del-norte-de-los-valles', label: 'Bosque y Arbustal semideciduo del norte de los Valles' },
                  { value: 'bosque-y-arbustal-semideciduo-del-sur-de-los-valles', label: 'Bosque y Arbustal semideciduo del sur de los Valles' },
                  { value: 'herbazal-del-paramo', label: 'Herbazal del Páramo' },
                  { value: 'herbazal-humedo-montano-alto-superior-del-paramo', label: 'Herbazal húmedo montano alto superior del Páramo' },
                  { value: 'herbazal-humedo-subnival-del-paramo', label: 'Herbazal húmedo subnival del Páramo' },
                  { value: 'herbazal-inundable-del-paramo', label: 'Herbazal inundable del Páramo' },
                  { value: 'herbazal-inundable-ripario-de-tierras-bajas-del-choco-ecuatorial', label: 'Herbazal inundable ripario de tierras bajas del Chocó Ecuatorial' },
                  { value: 'herbazal-inundable-ripario-de-tierras-bajas-del-jama-zapotillo', label: 'Herbazal inundable ripario de tierras bajas del Jama-Zapotillo' },
                  { value: 'herbazal-inundado-lacustre-del-pacifico-ecuatorial', label: 'Herbazal inundado lacustre del Pacífico Ecuatorial' },
                  { value: 'herbazal-inundado-lacustre-ripario-de-la-llanura-aluvial-de-la-amazonia', label: 'Herbazal inundado lacustre-ripario de la llanura aluvial de la Amazonía' },
                  { value: 'herbazal-lacustre-montano-bajo-del-sur-de-la-cordillera-oriental-de-los-andes', label: 'Herbazal lacustre montano bajo del Sur de la Cordillera Oriental de los Andes' },
                  { value: 'herbazal-ultrahumedo-subnival-del-paramo', label: 'Herbazal ultrahúmedo subnival del Páramo' },
                  { value: 'herbazal-y-arbustal-siempreverde-del-paramo-del-volcan-sumaco', label: 'Herbazal y Arbustal siempreverde del Páramo del volcán Sumaco' },
                  { value: 'herbazal-y-arbustal-siempreverde-subnival-del-paramo', label: 'Herbazal y Arbustal siempreverde subnival del Páramo' },
                  { value: 'intervencion', label: 'Intervención' },
                  { value: 'manglar-del-choco-ecuatorial', label: 'Manglar del Chocó Ecuatorial' },
                  { value: 'manglar-del-jama-zapotillo', label: 'Manglar del Jama-Zapotillo' },
                  { value: 'rosetal-caulescente-y-herbazal-del-paramo-frailejones', label: 'Rosetal caulescente y Herbazal del Páramo (frailejones)' }
                ].map((ecosystem) => {
                  const isSelected = filters.ecosistemas.includes(ecosystem.value);
                  return (
                    <Button
                      key={ecosystem.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('ecosistemas', ecosystem.value)}
                      className="w-full text-xs px-2 py-1 h-auto min-h-[32px] justify-start text-left whitespace-normal break-words rounded-none"
                      style={{
                        borderColor: isSelected ? undefined : '#e8e8e8',
                        color: isSelected ? undefined : '#454545'
                      }}
                    >
                      {ecosystem.label}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Regiones Biogeográficas */}
          <AccordionItem value="regionesBiogeograficas">
            <AccordionTrigger>Regiones biogeográficas</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'cordilleras-amazonicas', label: 'Cordilleras Amazónicas' },
                  { value: 'aguarico-putumayo-caqueta', label: 'Aguarico-Putumayo-Caquetá' },
                  { value: 'catamayo-alamor', label: 'Catamayo-Alamor' },
                  { value: 'cordillera-costera-choco', label: 'Cordillera Costera del Chocó' },
                  { value: 'cordillera-costera-pacifico', label: 'Cordillera Costera del Pacífico Equatorial' },
                  { value: 'cordillera-occidental-andes', label: 'Cordillera Occidental de los Andes' },
                  { value: 'choco-ecuatorial', label: 'Chocó Ecuatorial' },
                  { value: 'abanico-pastaza', label: 'Abanico del Pastaza' },
                  { value: 'jama-zapotillo', label: 'Jama-Zapotillo' },
                  { value: 'norte-cordillera-oriental', label: 'Norte de la Cordillera Oriental de los Andes' },
                  { value: 'napo-curaray', label: 'Napo-Curaray' },
                  { value: 'paramo', label: 'Páramo' },
                  { value: 'sur-cordillera-oriental', label: 'Sur de la Cordillera Oriental de los Andes' },
                  { value: 'tigre-pastaza', label: 'Tigre-Pastaza' },
                  { value: 'valles', label: 'Valles' }
                ].map((region) => {
                  const isSelected = filters.regionesBiogeograficas.includes(region.value);
                  return (
                    <Button
                      key={region.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('regionesBiogeograficas', region.value)}
                      className="w-full text-xs px-2 py-1 h-auto min-h-[32px] justify-start text-left rounded-none"
                      style={{
                        borderColor: isSelected ? undefined : '#e8e8e8',
                        color: isSelected ? undefined : '#454545'
                      }}
                    >
                      {region.label}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Reservas de la Biosfera */}
          <AccordionItem value="reservasBiosfera">
            <AccordionTrigger>Reservas de la biosfera</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'reserva-de-la-biosfera-choco-andino-de-pichincha', label: 'Reserva de la Biósfera Chocó Andino de Pichíncha' },
                  { value: 'reserva-de-la-biosfera-macizo-del-cajas', label: 'Reserva de la Biósfera Macizo del Cajas' },
                  { value: 'reserva-de-la-biosfera-podocarpus-el-condor', label: 'Reserva de la Biósfera Podocarpus - El Cóndor' },
                  { value: 'reserva-de-la-biosfera-sumaco', label: 'Reserva de la Biósfera Sumaco' },
                  { value: 'reserva-de-la-biosfera-yasuni', label: 'Reserva de la Biósfera Yasuní' },
                  { value: 'reserva-de-la-biosfera-del-bosque-seco', label: 'Reserva de la Biósfera del Bosque Seco' }
                ].map((option) => {
                  const isSelected = filters.reservasBiosfera.includes(option.value);
                  return (
                    <Button
                      key={option.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('reservasBiosfera', option.value)}
                      className="w-full text-xs px-2 py-1 h-auto min-h-[32px] justify-start text-left whitespace-normal break-words rounded-none"
                      style={{
                        borderColor: isSelected ? undefined : '#e8e8e8',
                        color: isSelected ? undefined : '#454545'
                      }}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Bosques Protegidos */}
          <AccordionItem value="bosquesProtegidos">
            <AccordionTrigger>Bosques protegidos</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {[
                  { value: '15-areas-del-interior-de-la-cuenca-del-rio-paute', label: '15 áreas del interior de la Cuenca del Río Paute' },
                  { value: 'abanico', label: 'Abanico' },
                  { value: 'aguacatal-de-arriba-jauneche', label: 'Aguacatal de Arriba (Jauneche)' },
                  { value: 'animanga-o-taminanga-grande', label: 'Animanga o Taminanga Grande' },
                  { value: 'asociacion-agricola-carchi-imbabura', label: 'Asociación Agrícola Carchi-Imbabura' },
                  { value: 'asociacion-cofradia-huacupamba', label: 'Asociación Cofradia Huacupamba' },
                  { value: 'asociacion-shiwiar-bufeo-tunkintza-ashibt', label: 'Asociación Shiwiar Bufeo Tunkintza Ashibt' },
                  { value: 'asociacion-de-centros-shuar-tayunts', label: 'Asociación de Centros Shuar Tayunts' },
                  { value: 'asociacion-de-produccion-agropecuaria-y-forestal-galo-andrade-salas', label: 'Asociación de Producción Agropecuaria y Forestal Galo Andrade Salas' },
                  { value: 'asociacion-de-trabajadores-autonomos-san-jose-de-las-orquideas-atamos', label: 'Asociación de Trabajadores Autónomos San José de las Orquídeas ATAMOS' },
                  { value: 'bosque-petrificado-del-puyango', label: 'Bosque Petrificado del Puyango' },
                  { value: 'cambugan', label: 'Cambugan' },
                  { value: 'carrizal-chone', label: 'Carrizal - Chone' },
                  { value: 'cashca-totoras', label: 'Cashca Totoras' },
                  { value: 'cebu', label: 'Cebu' },
                  { value: 'centro-chachi-corriente-grande', label: 'Centro Chachi Corriente Grande' },
                  { value: 'ceploa', label: 'Ceploa' },
                  { value: 'cerro-blanco', label: 'Cerro Blanco' },
                  { value: 'cerro-candelaria', label: 'Cerro Candelaria' },
                  { value: 'cerro-golondrinas', label: 'Cerro Golondrinas' },
                  { value: 'cerro-sumaco-y-cuenca-alta-del-rio-suno', label: 'Cerro Sumaco y Cuenca alta del río Suno' },
                  { value: 'chamiso-minas', label: 'Chamiso Minas' },
                  { value: 'colambo-yacuri', label: 'Colambo-Yacurí' },
                  { value: 'comuna-agropecuaria-la-esperanza', label: 'Comuna Agropecuaria La Esperanza' },
                  { value: 'comuna-ancestral-de-indigenas-pasto-la-libertad', label: 'Comuna Ancestral de Indígenas Pasto La Libertad' },
                  { value: 'comuna-kichwa-anangu', label: 'Comuna Kichwa Añangu' },
                  { value: 'comuna-loma-alta', label: 'Comuna Loma Alta' },
                  { value: 'comuna-matiavi-salinas', label: 'Comuna Matiavi Salinas' },
                  { value: 'comuna-playa-de-oro', label: 'Comuna Playa de Oro' },
                  { value: 'comuna-rio-santiago-cayapas', label: 'Comuna Río Santiago Cayapas' },
                  { value: 'comuna-san-miguel-negro', label: 'Comuna San Miguel Negro' },
                  { value: 'comuna-santa-elena', label: 'Comuna Santa Elena' },
                  { value: 'comunidad-kichwa-wamani-cokiwa', label: 'Comunidad Kichwa Wamani Cokiwa' },
                  { value: 'comunidad-shuar-wisui', label: 'Comunidad Shuar Wisui' },
                  { value: 'comunidad-yatzaputzan', label: 'Comunidad Yatzaputzan' },
                  { value: 'cooperativa-de-conservacion-y-desarrollo-comunitario-sustentable-santa-lucia', label: 'Cooperativa de Conservación y Desarrollo Comunitario Sustentable Santa Lucia' },
                  { value: 'corazon-de-oro', label: 'Corazón de Oro' },
                  { value: 'cordillera-chongon-colonche', label: 'Cordillera Chongon Colonche' },
                  { value: 'cordillera-kutuku-y-shaimi', label: 'Cordillera Kutukú y Shaimi' },
                  { value: 'cordillera-del-condor', label: 'Cordillera del Cóndor' },
                  { value: 'cuembi', label: 'Cuembi' },
                  { value: 'cuenca-alta-del-rio-nangaritza', label: 'Cuenca Alta del Río Nangaritza' },
                  { value: 'cuenca-rio-guayllabamba-area-1-area-2', label: 'Cuenca Río Guayllabamba (Área 1 - Área 2)' },
                  { value: 'cuenca-del-rio-malacatos-en-loja', label: 'Cuenca del Río Malacatos en Loja' },
                  { value: 'cuenca-del-rio-paute', label: 'Cuenca del Río Paute' },
                  { value: 'cuencas-que-forman-los-rios-san-francisco-san-ramon-y-sabanilla', label: 'Cuencas que forman los Ríos: San Francisco, San Ramon y Sabanilla' },
                  { value: 'daule-peripa', label: 'Daule - Peripa' },
                  { value: 'delta', label: 'Delta' },
                  { value: 'dos-mangas', label: 'Dos Mangas' },
                  { value: 'el-bermejo', label: 'El Bermejo' },
                  { value: 'estacion-cientifica-rio-guajalito', label: 'Estación Científica Río Guajalito' },
                  { value: 'flanco-oriental-de-pichincha-y-cinturon-verde-de-quito', label: 'Flanco Oriental de Pichíncha y Cinturón Verde de Quito' },
                  { value: 'hacienda-piganta', label: 'Hacienda Piganta' },
                  { value: 'la-cascada', label: 'La Cascada' },
                  { value: 'la-ceiba', label: 'La Ceiba' },
                  { value: 'loma-alta-y-ampliacion', label: 'Loma Alta y Ampliación' },
                  { value: 'lomas-corazon-y-bretana', label: 'Lomas Corazón y Bretana' },
                  { value: 'los-cedros', label: 'Los Cedros' },
                  { value: 'maquipucuna', label: 'Maquipucuna' },
                  { value: 'mashpi', label: 'Mashpi' },
                  { value: 'mazan', label: 'Mazan' },
                  { value: 'milpe-pachijal', label: 'Milpe Pachijal' },
                  { value: 'mindo-nambillo', label: 'Mindo Nambillo' },
                  { value: 'mirador-de-las-golondrinas', label: 'Mirador de Las Golondrinas' },
                  { value: 'molleturo-y-mollepungo', label: 'Molleturo y Mollepungo' },
                  { value: 'nacionalidad-andwa-de-pastaza-del-ecuador', label: 'Nacionalidad Andwa de Pastaza del Ecuador' },
                  { value: 'nacionalidad-sapara-nase', label: 'Nacionalidad Sapara (Nase)' },
                  { value: 'nacionalidad-sapara-del-ecuador', label: 'Nacionalidad Sapara del Ecuador' },
                  { value: 'nacionalidad-shiwiar', label: 'Nacionalidad Shiwiar' },
                  { value: 'nacionalidad-shiwiar-del-ecuador-nashie', label: 'Nacionalidad Shiwiar del Ecuador Nashie' },
                  { value: 'nacionalidad-waorani-del-ecuador', label: 'Nacionalidad Waorani del Ecuador' },
                  { value: 'neblina-sur', label: 'Neblina Sur' },
                  { value: 'panacocha', label: 'Panacocha' },
                  { value: 'parte-de-los-cerros-de-los-llanganates', label: 'Parte de Los Cerros de Los Llanganates' },
                  { value: 'pata-de-pajaro', label: 'Pata de Pájaro' },
                  { value: 'pueblo-ancestral-kichwa-kawsac-sacha', label: 'Pueblo Ancestral Kichwa Kawsac Sacha' },
                  { value: 'pueblo-curaray-morete-playa-ochacungo-quillualpa', label: 'Pueblo Curaray Morete Playa Ochacungo Quillualpa' },
                  { value: 'pueblo-kichwa-rukullacta', label: 'Pueblo Kichwa Rukullacta' },
                  { value: 'pueblo-shuar-arutam', label: 'Pueblo Shuar Arutam' },
                  { value: 'quinoa-miguir', label: 'Quinoa Miguir' },
                  { value: 'rio-aguarico', label: 'Río Aguarico' },
                  { value: 'rio-arenillas-presa-tahuin', label: 'Río Arenillas Presa Tahuin' },
                  { value: 'rio-lelia', label: 'Río Lelia' },
                  { value: 'sacha-lodge', label: 'Sacha Lodge' },
                  { value: 'siempre-verde', label: 'Siempre Verde' },
                  { value: 'subcuenca-alta-del-rio-leon-y-microcuencas-de-los-rios-san-felipe-de-ona-y-shincata', label: 'Subcuenca Alta del Río Leon y Microcuencas de Los Ríos San Felipe de Ona y Shincata' },
                  { value: 'subcuenca-del-rio-tambo-tamboyacu-antisana-pita-cinto-saloya-pichan-y-qda-san-juan', label: 'Subcuenca del Río Tambo, Tamboyacu, Antisana, Pita, Cinto, Saloya, Pichan y Qda San Juan' },
                  { value: 'subcuencas-de-los-rios-matiavi-y-mulidianhuan-pena-blanca', label: 'Subcuencas de los ríos Matiavi y Mulidianhuan (Peña Blanca)' },
                  { value: 'tinajillas-rio-gualaceno', label: 'Tinajillas Río Gualaceno' },
                  { value: 'toachi-pilaton', label: 'Toachi Pilatón' },
                  { value: 'uzchurrumi-la-cadena-pena-dorada-brasil', label: 'Uzchurrumi, La Cadena, Peña Dorada, Brasil' },
                  { value: 'zarapullo', label: 'Zarapullo' }
                ].map((option) => {
                  const isSelected = filters.bosquesProtegidos.includes(option.value);
                  return (
                    <Button
                      key={option.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('bosquesProtegidos', option.value)}
                      className="w-full text-xs px-2 py-1 h-auto min-h-[32px] justify-start text-left whitespace-normal break-words rounded-none"
                      style={{
                        borderColor: isSelected ? undefined : '#e8e8e8',
                        color: isSelected ? undefined : '#454545'
                      }}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Áreas Protegidas */}
          <AccordionItem value="areasProtegidas">
            <AccordionTrigger>Áreas protegidas</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'parque-nacional-antisana', label: 'Parque Nacional Antisana' },
                  { value: 'parque-nacional-cajas', label: 'Parque Nacional Cajas' },
                  { value: 'parque-nacional-cayambe-coca', label: 'Parque Nacional Cayambe Coca' },
                  { value: 'parque-nacional-cotacachi-cayapas', label: 'Parque Nacional Cotacachi Cayapas' },
                  { value: 'parque-nacional-cotopaxi', label: 'Parque Nacional Cotopaxi' },
                  { value: 'parque-nacional-llanganates', label: 'Parque Nacional Llanganates' },
                  { value: 'parque-nacional-machalilla', label: 'Parque Nacional Machalilla' },
                  { value: 'parque-nacional-podocarpus', label: 'Parque Nacional Podocarpus' },
                  { value: 'parque-nacional-rio-negro-sopladora', label: 'Parque Nacional Rio Negro Sopladora' },
                  { value: 'parque-nacional-sangay', label: 'Parque Nacional Sangay' },
                  { value: 'parque-nacional-sumaco-napo-galeras', label: 'Parque Nacional Sumaco Napo-Galeras' },
                  { value: 'parque-nacional-yacuri', label: 'Parque Nacional Yacuri' },
                  { value: 'parque-nacional-yasuni', label: 'Parque Nacional Yasuní' },
                  { value: 'refugio-de-vida-silvestre-la-chiquita', label: 'Refugio de Vida Silvestre La Chiquita' },
                  { value: 'refugio-de-vida-silvestre-manglares-estuario-del-rio-muisne', label: 'Refugio de Vida Silvestre Manglares Estuario del Rio Muisne' },
                  { value: 'refugio-de-vida-silvestre-pacoche', label: 'Refugio de Vida Silvestre Pacoche' },
                  { value: 'refugio-de-vida-silvestre-pasochoa', label: 'Refugio de Vida Silvestre Pasochoa' },
                  { value: 'refugio-de-vida-silvestre-samama-mumbes', label: 'Refugio de Vida Silvestre Samama Mumbes' },
                  { value: 'reserva-biologica-cerro-plateado', label: 'Reserva Biológica Cerro Plateado' },
                  { value: 'reserva-biologica-colonso-chalupas', label: 'Reserva Biológica Colonso Chalupas' },
                  { value: 'reserva-biologica-el-condor', label: 'Reserva Biológica El Cóndor' },
                  { value: 'reserva-biologica-el-quimi', label: 'Reserva Biológica El Quimi' },
                  { value: 'reserva-biologica-limoncocha', label: 'Reserva Biológica Limoncocha' },
                  { value: 'reserva-ecologica-el-angel', label: 'Reserva Ecológica El Ángel' },
                  { value: 'reserva-ecologica-los-ilinizas', label: 'Reserva Ecológica Los Ilinizas' },
                  { value: 'reserva-ecologica-mache-chindul', label: 'Reserva Ecológica Mache Chindul' },
                  { value: 'reserva-ecologica-manglares-cayapas-mataje', label: 'Reserva Ecológica Manglares Cayapas Mataje' },
                  { value: 'reserva-ecologica-manglares-churute', label: 'Reserva Ecológica Manglares Churute' },
                  { value: 'reserva-geobotanica-pululahua', label: 'Reserva Geobotanica Pululahua' },
                  { value: 'reserva-de-produccion-de-fauna-chimborazo', label: 'Reserva de Producción de Fauna Chimborazo' },
                  { value: 'reserva-de-produccion-de-fauna-cuyabeno', label: 'Reserva de Producción de Fauna Cuyabeno' },
                  { value: 'area-ecologica-de-conservacion-municipal-la-bonita', label: 'Área Ecológica de Conservación Municipal La Bonita' },
                  { value: 'area-ecologica-de-conservacion-municipal-siete-iglesias', label: 'Área Ecológica de Conservación Municipal Siete Iglesias' },
                  { value: 'area-protegida-autonoma-desentralizada-coordillera-oriental-del-carchi', label: 'Área Protegida Autónoma Desentralizada Coordillera Oriental del Carchi' },
                  { value: 'area-protegida-autonoma-desentralizada-mazan', label: 'Área Protegida Autónoma Desentralizada Mazan' },
                  { value: 'area-protegida-comunitaria-marcos-perez-de-castilla', label: 'Área Protegida Comunitaria Marcos Perez de Castilla' },
                  { value: 'area-protegida-privada-bellavista', label: 'Área Protegida Privada Bellavista' },
                  { value: 'area-protegida-privada-candelaria', label: 'Área Protegida Privada Candelaria' },
                  { value: 'area-protegida-privada-neblina-norte', label: 'Área Protegida Privada Neblina Norte' },
                  { value: 'area-protegida-privada-zunag', label: 'Área Protegida Privada Zúñag' }
                ].map((option) => {
                  const isSelected = filters.areasProtegidas.includes(option.value);
                  return (
                    <Button
                      key={option.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('areasProtegidas', option.value)}
                      className="w-full text-xs px-2 py-1 h-auto min-h-[32px] justify-start text-left whitespace-normal break-words rounded-none"
                      style={{
                        borderColor: isSelected ? undefined : '#e8e8e8',
                        color: isSelected ? undefined : '#454545'
                      }}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Pluviocidad (Slider) */}
          <AccordionItem value="pluviocidad">
            <AccordionTrigger>Pluviocidad</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filters.pluviocidad.min} mm/año</span>
                  <span>{filters.pluviocidad.max} mm/año</span>
                </div>
                <Slider
                  min={640}
                  max={4000}
                  step={50}
                  value={[filters.pluviocidad.min, filters.pluviocidad.max]}
                  onValueChange={(values) => handleSliderChange('pluviocidad', values)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Temperatura (Slider) */}
          <AccordionItem value="temperatura">
            <AccordionTrigger>Temperatura</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filters.temperatura.min} °C</span>
                  <span>{filters.temperatura.max} °C</span>
                </div>
                <Slider
                  min={5}
                  max={25}
                  step={1}
                  value={[filters.temperatura.min, filters.temperatura.max]}
                  onValueChange={(values) => handleSliderChange('temperatura', values)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
