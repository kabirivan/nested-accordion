import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RedListStatusProps {
  readonly status: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD';
}

export default function RedListStatus({ status }: RedListStatusProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'LC': return { 
        label: 'LC', 
        bgColor: 'bg-gray-50', 
        textColor: 'text-gray-600', 
        fullName: 'Preocupación Menor' 
      };
      case 'NT': return { 
        label: 'NT', 
        bgColor: 'bg-gray-100', 
        textColor: 'text-gray-700', 
        fullName: 'Casi Amenazado' 
      };
      case 'VU': return { 
        label: 'VU', 
        bgColor: 'bg-gray-200', 
        textColor: 'text-gray-800', 
        fullName: 'Vulnerable' 
      };
      case 'EN': return { 
        label: 'EN', 
        bgColor: 'bg-gray-300', 
        textColor: 'text-gray-900', 
        fullName: 'En Peligro' 
      };
      case 'CR': return { 
        label: 'CR', 
        bgColor: 'bg-gray-400', 
        textColor: 'text-gray-950', 
        fullName: 'Críticamente Amenazado' 
      };
      case 'EW': return { 
        label: 'EW', 
        bgColor: 'bg-gray-500', 
        textColor: 'text-white', 
        fullName: 'Extinto en Estado Silvestre' 
      };
      case 'EX': return { 
        label: 'EX', 
        bgColor: 'bg-gray-700', 
        textColor: 'text-white', 
        fullName: 'Extinto' 
      };
      case 'DD': return { 
        label: 'DD', 
        bgColor: 'bg-gray-100', 
        textColor: 'text-gray-400', 
        fullName: 'Datos Insuficientes' 
      };
      default: return { 
        label: '?', 
        bgColor: 'bg-gray-50', 
        textColor: 'text-gray-400', 
        fullName: 'Desconocido' 
      };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "transition-all duration-200 hover:scale-105",
        statusInfo.bgColor,
        statusInfo.textColor
      )}
      title={statusInfo.fullName}
    >
      {statusInfo.label}
    </Badge>
  );
}
