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
    '#C5D86D', // [0] Verde claro - Costa (más brillante como en la imagen)
    '#C8C4A4', // [1] Beige claro - Pie de monte/zona seca
    '#9B9764', // [2] Beige grisáceo - Sierra baja (más marrón)
    '#7D7645', // [3] Marrón - Sierra alta/andina (más oscuro)
    '#7D7645', // [4] Marrón - Sierra alta/andina (más oscuro)
    '#9B9764', // [5] Beige grisáceo - Sierra baja (más marrón)
    '#C8C4A4', // [6] Beige grisáceo - Vertiente oriental andina
    '#C5D86D'  // [7] Verde claro - Selva baja/Oriente (más brillante como en la imagen)
  ];
  
  const allClimaticFloors = [
    { name: 'Tropical', min: 0, max: 1000, colorIndex: 0, region: 'Costa' },
    { name: 'Subtropical', min: 1000, max: 2000, colorIndex: 1, region: 'Pie de monte' },
    { name: 'Templado', min: 2000, max: 3000, colorIndex: 2, region: 'Sierra baja' },
    { name: 'Frío', min: 3000, max: 4800, colorIndex: 3, region: 'Sierra alta' },
    { name: 'Páramo', min: 4800, max: 3000, colorIndex: 4, region: 'Vertiente oriental' },
    { name: 'Templado Oriental', min: 3000, max: 2000, colorIndex: 2, region: 'Sierra oriental' },
    { name: 'Subtropical Oriental', min: 2000, max: 1000, colorIndex: 1, region: 'Pie de monte oriental' },
    { name: 'Tropical Oriental', min: 1000, max: 0, colorIndex: 0, region: 'Oriente' }
  ];

  // Calcular la posición y ancho de la barra negra basado en el rango altitudinal
  // Cada franja representa 1000m excepto el piso Frío (1800m) y Páramo (1800m)
  const totalAltitudeRange = 1000 + 1000 + 1000 + 1800 + 1800 + 1000 + 1000 + 1000; // = 9600m total
  
  // Calcular la posición de la línea negra basada en la distribución real de las franjas
  const calculateLinePosition = () => {
    if (altitudinalRange.min === 0 && altitudinalRange.max === 0) {
      return { left: 0, width: 0 };
    }

    // Calcular el ancho total de todas las franjas
    const totalWidth = allClimaticFloors.reduce((sum, floor) => {
      const range = Math.abs(floor.max - floor.min);
      return sum + (range / totalAltitudeRange) * 100;
    }, 0);

    // Convertir altitud a posición porcentual en la barra completa
    const altitudeToPosition = (altitude: number) => {
      let cumulativeWidth = 0;
      
      console.log(`\n=== Calculando posición para altitud ${altitude}m ===`);
      
      for (const floor of allClimaticFloors) {
        const floorMin = Math.min(floor.min, floor.max);
        const floorMax = Math.max(floor.min, floor.max);
        const range = Math.abs(floor.max - floor.min);
        const floorWidthPercentage = (range / totalAltitudeRange) * 100;
        
        console.log(`Piso: ${floor.name} (${floorMin}-${floorMax}m), Ancho: ${floorWidthPercentage.toFixed(2)}%, Acumulado: ${cumulativeWidth.toFixed(2)}%`);
        
        if (altitude >= floorMin && altitude <= floorMax) {
          const positionWithinFloor = (altitude - floorMin) / (floorMax - floorMin);
          const finalPosition = cumulativeWidth + (positionWithinFloor * floorWidthPercentage);
          console.log(`✓ Altitud ${altitude}m está en piso ${floor.name}`);
          console.log(`  Posición dentro del piso: ${(positionWithinFloor * 100).toFixed(2)}%`);
          console.log(`  Posición final: ${finalPosition.toFixed(2)}%`);
          return finalPosition;
        }
        
        cumulativeWidth += floorWidthPercentage;
      }
      
      console.log(`⚠ Altitud ${altitude}m no encontrada, usando ancho total: ${cumulativeWidth.toFixed(2)}%`);
      return cumulativeWidth; // Si no se encuentra, devolver el ancho total
    };

    const startPosition = altitudeToPosition(altitudinalRange.min);
    const endPosition = altitudeToPosition(altitudinalRange.max);
    
    console.log(`\n=== RESULTADO FINAL ===`);
    console.log(`Rango: ${altitudinalRange.min}-${altitudinalRange.max}m`);
    console.log(`Posición inicio: ${startPosition.toFixed(2)}%`);
    console.log(`Posición fin: ${endPosition.toFixed(2)}%`);
    console.log(`Ancho calculado: ${(endPosition - startPosition).toFixed(2)}%`);
    console.log(`Ancho total disponible: ${totalWidth.toFixed(2)}%`);

    return {
      left: Math.max(0, startPosition),
      width: Math.max(0, Math.min(endPosition - startPosition, totalWidth - startPosition))
    };
  };

  const linePosition = calculateLinePosition();

  return (
    <div className="flex flex-col items-center w-full">
      {/* Gráfico de pisos climáticos - Referencia geográfica */}
      <div className="flex h-4 w-full max-w-40 relative">
        {allClimaticFloors.map((floor, index) => {
          const color = colorPalette[floor.colorIndex];
          const range = Math.abs(floor.max - floor.min);
          const widthPercentage = (range / totalAltitudeRange) * 100;
          
          return (
            <div
              key={`${floor.name}-${index}`}
              className="h-full"
              style={{ 
                backgroundColor: color,
                width: `${widthPercentage}%`
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
              left: `${linePosition.left}%`,
              width: `${linePosition.width}%`,
              bottom: '-4px' // Padding de 4px debajo de la barra de colores
            }}
          />
        ) : null}
      </div>
      
      {/* Rango altitudinal - Indica dónde está presente */}
      <div className="text-xs text-gray-600 mt-1">
        {altitudinalRange.min === 0 && altitudinalRange.max === 0 ? 
          'No presente' : 
          `${altitudinalRange.min}-${altitudinalRange.max}m`
        }
      </div>
    </div>
  );
}
