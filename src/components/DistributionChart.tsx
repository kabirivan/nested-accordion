interface DistributionChartProps {
  readonly distribution: {
    readonly costa: boolean;
    readonly sierra: boolean;
    readonly oriente: boolean;
  };
}

export default function DistributionChart({ distribution }: DistributionChartProps) {
  const getRegionLabel = (position: 'left' | 'center' | 'right') => {
    switch (position) {
      case 'left': return 'C';
      case 'center': return 'S';
      case 'right': return 'O';
      default: return '';
    }
  };

  // Crear un gráfico de barras más estilizado con estilo pixelado
  const createBarChart = () => {
    const regions = [
      { key: 'costa', present: distribution.costa, color: '#3B82F6' },
      { key: 'sierra', present: distribution.sierra, color: '#8B5CF6' },
      { key: 'oriente', present: distribution.oriente, color: '#10B981' }
    ];

    return (
      <div className="flex items-end gap-0.5 h-6">
        {regions.map((region) => (
          <div key={region.key} className="flex flex-col items-center">
            <div 
              className="w-3 h-4 transition-all duration-200 hover:scale-110"
              style={{ 
                backgroundColor: region.present ? region.color : '#F3F4F6',
                imageRendering: 'pixelated',
                clipPath: region.present ? 'polygon(0 100%, 0 0, 100% 0, 100% 100%)' : 'none'
              }}
              title={region.present ? `${region.key.charAt(0).toUpperCase() + region.key.slice(1)}` : `No presente en ${region.key}`}
            />
            <span className="text-xs text-tertiary mt-1 font-mono text-center">
              {getRegionLabel(region.key as 'left' | 'center' | 'right')}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return createBarChart();
}
