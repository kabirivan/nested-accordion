interface RedListStatusProps {
  readonly status: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD';
}

export default function RedListStatus({ status }: RedListStatusProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'LC': return { 
        label: 'LC', 
        bgColor: '#F9FAFB', 
        textColor: '#6B7280', 
        fullName: 'Preocupación Menor' 
      };
      case 'NT': return { 
        label: 'NT', 
        bgColor: '#F3F4F6', 
        textColor: '#4B5563', 
        fullName: 'Casi Amenazado' 
      };
      case 'VU': return { 
        label: 'VU', 
        bgColor: '#E5E7EB', 
        textColor: '#374151', 
        fullName: 'Vulnerable' 
      };
      case 'EN': return { 
        label: 'EN', 
        bgColor: '#D1D5DB', 
        textColor: '#1F2937', 
        fullName: 'En Peligro' 
      };
      case 'CR': return { 
        label: 'CR', 
        bgColor: '#9CA3AF', 
        textColor: '#111827', 
        fullName: 'Críticamente Amenazado' 
      };
      case 'EW': return { 
        label: 'EW', 
        bgColor: '#6B7280', 
        textColor: '#FFFFFF', 
        fullName: 'Extinto en Estado Silvestre' 
      };
      case 'EX': return { 
        label: 'EX', 
        bgColor: '#374151', 
        textColor: '#FFFFFF', 
        fullName: 'Extinto' 
      };
      case 'DD': return { 
        label: 'DD', 
        bgColor: '#F3F4F6', 
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
