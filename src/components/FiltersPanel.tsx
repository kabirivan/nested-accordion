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
    areaDistribucion: [] as string[],
    ecosistemas: [] as string[],
    regionesBiogeograficas: [] as string[],
    reservasBiosfera: [] as string[],
    bosquesProtegidos: [] as string[],
    areasProtegidas: [] as string[],
    // Filtros continuos
    pluviocidad: { min: 0, max: 5000 },
    temperatura: { min: -10, max: 40 }
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
      areaDistribucion: [] as string[],
      ecosistemas: [] as string[],
      regionesBiogeograficas: [] as string[],
      reservasBiosfera: [] as string[],
      bosquesProtegidos: [] as string[],
      areasProtegidas: [] as string[],
      pluviocidad: { min: 0, max: 5000 },
      temperatura: { min: -10, max: 40 }
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

      <div className="px-6 overflow-y-auto flex-1">
        <Accordion type="multiple" className="w-full">
          {/* Provincia */}
          <AccordionItem value="provincia">
            <AccordionTrigger>Provincia | Categórica</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {['Pichincha', 'Guayas', 'Azuay', 'Manabí', 'El Oro'].map((province) => {
                  const value = province.toLowerCase().replace(' ', '-');
                  const isSelected = filters.provincia.includes(value);
                  return (
                    <Button
                      key={province}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('provincia', value)}
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
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'LC', label: 'Preocupación Menor (LC)' },
                  { value: 'NT', label: 'Casi Amenazada (NT)' },
                  { value: 'VU', label: 'Vulnerable (VU)' },
                  { value: 'EN', label: 'En Peligro (EN)' },
                  { value: 'CR', label: 'En Peligro Crítico (CR)' }
                ].map((status) => {
                  const isSelected = filters.listaRoja.includes(status.value);
                  return (
                    <Button
                      key={status.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('listaRoja', status.value)}
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
              <div className="flex flex-wrap gap-2">
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
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'tropical', label: 'Tropical (0-1000m)' },
                  { value: 'subtropical', label: 'Subtropical (1000-2000m)' },
                  { value: 'templado', label: 'Templado (2000-3000m)' },
                  { value: 'frio', label: 'Frío (3000-4000m)' },
                  { value: 'paramo', label: 'Páramo (4000-5000m)' },
                  { value: 'nival', label: 'Nival (5000-6000m)' }
                ].map((floor) => {
                  const isSelected = filters.pisosAltitudinales.includes(floor.value);
                  return (
                    <Button
                      key={floor.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('pisosAltitudinales', floor.value)}
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
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'local', label: 'Local (< 100 km²)' },
                  { value: 'regional', label: 'Regional (100-1000 km²)' },
                  { value: 'nacional', label: 'Nacional (1000-10000 km²)' },
                  { value: 'continental', label: 'Continental (> 10000 km²)' }
                ].map((area) => {
                  const isSelected = filters.areaDistribucion.includes(area.value);
                  return (
                    <Button
                      key={area.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('areaDistribucion', area.value)}
                    >
                      {area.label}
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Ecosistemas */}
          <AccordionItem value="ecosistemas">
            <AccordionTrigger>Ecosistemas</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'bosque-tropical', label: 'Bosque Tropical' },
                  { value: 'bosque-nublado', label: 'Bosque Nublado' },
                  { value: 'paramo', label: 'Páramo' },
                  { value: 'manglar', label: 'Manglar' },
                  { value: 'sabana', label: 'Sabana' }
                ].map((ecosystem) => {
                  const isSelected = filters.ecosistemas.includes(ecosystem.value);
                  return (
                    <Button
                      key={ecosystem.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('ecosistemas', ecosystem.value)}
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
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'costa', label: 'Costa' },
                  { value: 'sierra', label: 'Sierra' },
                  { value: 'oriente', label: 'Oriente' },
                  { value: 'galapagos', label: 'Galápagos' }
                ].map((region) => {
                  const isSelected = filters.regionesBiogeograficas.includes(region.value);
                  return (
                    <Button
                      key={region.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('regionesBiogeograficas', region.value)}
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
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'yes', label: 'Con reserva' },
                  { value: 'no', label: 'Sin reserva' }
                ].map((option) => {
                  const isSelected = filters.reservasBiosfera.includes(option.value);
                  return (
                    <Button
                      key={option.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('reservasBiosfera', option.value)}
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
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'yes', label: 'Protegidos' },
                  { value: 'no', label: 'No protegidos' }
                ].map((option) => {
                  const isSelected = filters.bosquesProtegidos.includes(option.value);
                  return (
                    <Button
                      key={option.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('bosquesProtegidos', option.value)}
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
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'yes', label: 'Protegidas' },
                  { value: 'no', label: 'No protegidas' }
                ].map((option) => {
                  const isSelected = filters.areasProtegidas.includes(option.value);
                  return (
                    <Button
                      key={option.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoricalChange('areasProtegidas', option.value)}
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
            <AccordionTrigger>Pluviocidad (Continua)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filters.pluviocidad.min} mm/año</span>
                  <span>{filters.pluviocidad.max} mm/año</span>
                </div>
                <Slider
                  min={0}
                  max={5000}
                  step={50}
                  value={[filters.pluviocidad.min, filters.pluviocidad.max]}
                  onValueChange={(values) => handleSliderChange('pluviocidad', values)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Temperatura (Slider) */}
          <AccordionItem value="temperatura">
            <AccordionTrigger>Temperatura (Continua)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filters.temperatura.min} °C</span>
                  <span>{filters.temperatura.max} °C</span>
                </div>
                <Slider
                  min={-10}
                  max={40}
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
