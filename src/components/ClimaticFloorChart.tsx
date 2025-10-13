interface ClimaticFloorChartProps {
  readonly altitudinalRange: {
    readonly min: number;
    readonly max: number;
  };
  readonly climaticFloors: readonly string[];
}

export default function ClimaticFloorChart({ altitudinalRange }: ClimaticFloorChartProps) {
  // Colores representando Costa → Sierra → Oriente (Ecuador)
  // Verde claro → Beige claro → Beige grisáceo → Marrón → Beige grisáceo → Verde claro
  const colorPalette = [
    '#90EE90', // [0] Verde claro - Costa (más brillante como en la imagen)
    '#D2B48C', // [1] Beige claro - Pie de monte/zona seca
    '#A0522D', // [2] Beige grisáceo - Sierra baja (más marrón)
    '#654321', // [3] Marrón - Sierra alta/andina (más oscuro)
    '#D2B48C', // [4] Beige grisáceo - Vertiente oriental andina
    '#90EE90'  // [5] Verde claro - Selva baja/Oriente (más brillante como en la imagen)
  ];
  
  const allClimaticFloors = [
    { name: 'Tropical', min: 0, max: 1000, colorIndex: 0, region: 'Costa' },
    { name: 'Subtropical', min: 1000, max: 2000, colorIndex: 1, region: 'Pie de monte' },
    { name: 'Templado', min: 2000, max: 3000, colorIndex: 2, region: 'Sierra baja' },
    { name: 'Frío', min: 3000, max: 4000, colorIndex: 3, region: 'Sierra alta' },
    { name: 'Páramo', min: 4000, max: 5000, colorIndex: 4, region: 'Vertiente oriental' },
    { name: 'Nival', min: 5000, max: 6000, colorIndex: 5, region: 'Oriente' }
  ];

  // Calcular la posición y ancho de la barra negra basado en el rango altitudinal
  const maxAltitude = 6000; // Altitud máxima de la escala
  
  // Calcular porcentajes
  const startPercentage = (altitudinalRange.min / maxAltitude) * 100;
  const endPercentage = (altitudinalRange.max / maxAltitude) * 100;
  const widthPercentage = endPercentage - startPercentage;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Gráfico de pisos climáticos - Referencia geográfica */}
      <div className="flex h-4 w-40 relative">
        {allClimaticFloors.map((floor, index) => {
          const color = colorPalette[floor.colorIndex];
          
          return (
            <div
              key={`${floor.name}-${index}`}
              className="h-full flex-1"
              style={{ 
                backgroundColor: color
              }}
              title={`${floor.name} (${floor.min}-${floor.max}m) - ${floor.region}`}
            />
          );
        })}
        
        {/* Barra de escala - Posicionada según el rango altitudinal */}
        {altitudinalRange.min !== 0 || altitudinalRange.max !== 0 ? (
          <div 
            className="absolute h-0.5 bg-black"
            style={{ 
              left: `${startPercentage}%`,
              width: `${widthPercentage}%`,
              bottom: '-6px' // Padding de 6px debajo de la barra de colores
            }}
          />
        ) : null}
      </div>
      
      {/* Rango altitudinal - Indica dónde está presente */}
      <div className="text-xs text-gray-600 mt-3">
        {altitudinalRange.min === 0 && altitudinalRange.max === 0 ? 
          'No presente' : 
          `${altitudinalRange.min}-${altitudinalRange.max}m`
        }
      </div>
    </div>
  );
}
