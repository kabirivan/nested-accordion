interface RedListStatusProps {
  readonly status: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD';
}

export default function RedListStatus({ status }: RedListStatusProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'LC': return { 
        label: 'LC', 
        bgColor: '#F0F9FF', 
        textColor: '#0369A1', 
        fullName: 'Preocupación Menor' 
      };
      case 'NT': return { 
        label: 'NT', 
        bgColor: '#FEF3C7', 
        textColor: '#D97706', 
        fullName: 'Casi Amenazado' 
      };
      case 'VU': return { 
        label: 'VU', 
        bgColor: '#FED7AA', 
        textColor: '#EA580C', 
        fullName: 'Vulnerable' 
      };
      case 'EN': return { 
        label: 'EN', 
        bgColor: '#FECACA', 
        textColor: '#DC2626', 
        fullName: 'En Peligro' 
      };
      case 'CR': return { 
        label: 'CR', 
        bgColor: '#FEE2E2', 
        textColor: '#B91C1C', 
        fullName: 'Críticamente Amenazado' 
      };
      case 'EW': return { 
        label: 'EW', 
        bgColor: '#F3F4F6', 
        textColor: '#6B7280', 
        fullName: 'Extinto en Estado Silvestre' 
      };
      case 'EX': return { 
        label: 'EX', 
        bgColor: '#E5E7EB', 
        textColor: '#374151', 
        fullName: 'Extinto' 
      };
      case 'DD': return { 
        label: 'DD', 
        bgColor: '#F9FAFB', 
        textColor: '#9CA3AF', 
        fullName: 'Datos Insuficientes' 
      };
      default: return { 
        label: '?', 
        bgColor: '#F9FAFB', 
        textColor: '#9CA3AF', 
        fullName: 'Desconocido' 
      };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <span 
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
      style={{ 
        backgroundColor: statusInfo.bgColor,
        color: statusInfo.textColor
      }}
      title={statusInfo.fullName}
    >
      {statusInfo.label}
    </span>
  );
}
