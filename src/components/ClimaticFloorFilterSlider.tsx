'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

interface ClimaticFloorFilterSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function ClimaticFloorFilterSlider({ 
  min, 
  max, 
  value, 
  onChange 
}: ClimaticFloorFilterSliderProps) {
  // Colores representando Costa → Sierra → Oriente (Ecuador)
  const colorPalette = [
    '#C5D86D', // Verde claro - Costa
    '#C8C4A4', // Beige claro - Pie de monte
    '#9B9764', // Beige grisáceo - Sierra baja
    '#7D7645', // Marrón - Sierra alta
    '#7D7645', // Marrón - Sierra alta
    '#9B9764', // Beige grisáceo - Sierra baja
    '#C8C4A4', // Beige claro - Vertiente oriental
    '#C5D86D'  // Verde claro - Oriente
  ];
  
  const allClimaticFloors = [
    { name: 'Tropical Occidental', min: 0, max: 1000, colorIndex: 0 },
    { name: 'Subtropical Occidental', min: 1000, max: 2000, colorIndex: 1 },
    { name: 'Templado Occidental', min: 2000, max: 3000, colorIndex: 2 },
    { name: 'Frío', min: 3000, max: 4000, colorIndex: 3 },
    { name: 'Páramo', min: 4000, max: 5000, colorIndex: 4 },
    { name: 'Páramo Oriental', min: 5000, max: 4000, colorIndex: 4 },
    { name: 'Frío Oriental', min: 4000, max: 3000, colorIndex: 3 },
    { name: 'Templado Oriental', min: 3000, max: 2000, colorIndex: 2 },
    { name: 'Subtropical Oriental', min: 2000, max: 1000, colorIndex: 1 },
    { name: 'Tropical Oriental', min: 1000, max: 0, colorIndex: 0 }
  ];

  const totalAltitudeRange = 10000; // 10 pisos × 1000m
  const defaultColor = '#E5E7EB'; // Gris claro
  
  // Determinar si un piso está dentro del rango seleccionado
  const isFloorInRange = (floor: typeof allClimaticFloors[0]) => {
    const floorMin = Math.min(floor.min, floor.max);
    const floorMax = Math.max(floor.min, floor.max);
    const [rangeMin, rangeMax] = value;
    
    // Verificar si hay intersección
    return rangeMax >= floorMin && rangeMin <= floorMax;
  };

  return (
    <div className="space-y-4 px-2">
      {/* Gráfico de pisos climáticos */}
      <div className="flex flex-col items-center w-full">
        {/* Etiquetas de secciones */}
        <div className="flex justify-between w-full mb-1 text-xs font-semibold text-gray-700">
          <span>← Occidental</span>
          <span>Oriental →</span>
        </div>
        
        <div className="flex h-8 w-full relative">
          {/* Base: Todos los pisos */}
          {allClimaticFloors.map((floor, index) => {
            const range = Math.abs(floor.max - floor.min);
            const widthPercentage = (range / totalAltitudeRange) * 100;
            const isInRange = isFloorInRange(floor);
            const isLast = index === allClimaticFloors.length - 1;
            
            return (
              <div
                key={`floor-${floor.name}-${index}`}
                className="h-full transition-colors duration-200"
                style={{ 
                  backgroundColor: isInRange ? colorPalette[floor.colorIndex] : defaultColor,
                  width: `${widthPercentage}%`,
                  borderRight: isLast ? 'none' : '1px solid white'
                }}
                title={`${floor.name} (${floor.min}-${floor.max}m)`}
              />
            );
          })}
        </div>
        
        {/* Etiquetas de rango */}
        <div className="text-xs text-gray-600 mt-2 w-full relative h-4">
          <span className="absolute" style={{ left: '0%', transform: 'translateX(0%)' }}>0</span>
          <span className="absolute" style={{ left: '10%', transform: 'translateX(-50%)' }}>1000</span>
          <span className="absolute" style={{ left: '20%', transform: 'translateX(-50%)' }}>2000</span>
          <span className="absolute" style={{ left: '30%', transform: 'translateX(-50%)' }}>3000</span>
          <span className="absolute" style={{ left: '40%', transform: 'translateX(-50%)' }}>4000</span>
          <span className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>5000</span>
          <span className="absolute" style={{ left: '60%', transform: 'translateX(-50%)' }}>4000</span>
          <span className="absolute" style={{ left: '70%', transform: 'translateX(-50%)' }}>3000</span>
          <span className="absolute" style={{ left: '80%', transform: 'translateX(-50%)' }}>2000</span>
          <span className="absolute" style={{ left: '90%', transform: 'translateX(-50%)' }}>1000</span>
          <span className="absolute" style={{ left: '100%', transform: 'translateX(-100%)' }}>0</span>
        </div>
      </div>

      {/* Slider de rango */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-700 font-medium">
          <span>{value[0]}m</span>
          <span>{value[1]}m</span>
        </div>
        <Slider
          min={min}
          max={max}
          step={100}
          value={value}
          onValueChange={(newValue) => onChange(newValue as [number, number])}
          className="w-full"
        />
      </div>
    </div>
  );
}

