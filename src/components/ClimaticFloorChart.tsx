interface ClimaticFloorChartProps {
  readonly altitudinalRange: {
    readonly min: number;
    readonly max: number;
  };
  readonly climaticFloors: readonly string[];
}

export default function ClimaticFloorChart({ altitudinalRange, climaticFloors: speciesFloors }: ClimaticFloorChartProps) {
  // Definir los pisos climáticos de Ecuador basados en la imagen
  const allClimaticFloors = [
    { name: 'Tropical', min: 0, max: 1000, color: '#90EE90' },
    { name: 'Subtropical', min: 1000, max: 2000, color: '#D2B48C' },
    { name: 'Templado', min: 2000, max: 3000, color: '#CD853F' },
    { name: 'Frío', min: 3000, max: 4000, color: '#8B4513' },
    { name: 'Páramo', min: 4000, max: 5000, color: '#A0522D' },
    { name: 'Nival', min: 5000, max: 6000, color: '#D2B48C' }
  ];

  // Determinar qué pisos están presentes basado en el rango altitudinal real
  const presentFloors = allClimaticFloors.filter(floor => 
    (altitudinalRange.min <= floor.max && altitudinalRange.max >= floor.min) ||
    speciesFloors.includes(floor.name)
  );
  
  // Si no hay pisos presentes, mostrar un gráfico vacío
  if (presentFloors.length === 0) {
    return (
      <div className="w-20">
        <div className="flex h-4 mb-1">
          <div className="w-full h-full bg-gray-200 rounded"></div>
        </div>
        <div className="w-8 h-0.5 bg-gray-400"></div>
        <div className="text-xs text-tertiary mt-1 text-center">
          Sin datos
        </div>
      </div>
    );
  }

  return (
    <div className="w-20">
      {/* Gráfico de pisos climáticos */}
      <div className="flex h-4 mb-1 rounded overflow-hidden">
        {allClimaticFloors.map((floor) => {
          const isPresent = presentFloors.some(pf => pf.name === floor.name);
          return (
            <div
              key={floor.name}
              className={`h-full transition-all duration-300 ${
                isPresent ? 'flex-1' : 'w-1'
              }`}
              style={{ 
                backgroundColor: isPresent ? floor.color : '#F5F5F5',
                opacity: isPresent ? 1 : 0.2
              }}
              title={`${floor.name} (${floor.min}-${floor.max}m): ${isPresent ? 'Presente' : 'Ausente'}`}
            />
          );
        })}
      </div>
      
      {/* Barra de escala */}
      <div className="w-8 h-0.5 bg-black"></div>
      
      {/* Etiquetas de altitud con rango real */}
      <div className="text-xs text-tertiary mt-1 text-center">
        {altitudinalRange.min === 0 && altitudinalRange.max === 0 ? 
          'No presente' : 
          `${altitudinalRange.min}-${altitudinalRange.max}m`
        }
      </div>
    </div>
  );
}
