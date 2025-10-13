'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface InterpretationGuideProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function InterpretationGuide({ isOpen, onClose }: InterpretationGuideProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Guía de Interpretación</DialogTitle>
          <DialogDescription>
            Comprende los símbolos y abreviaciones utilizadas en el catálogo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sección Endémica */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Endémica (En)
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-black text-lg font-bold">✓</span>
                <span className="text-sm text-muted-foreground">Especie endémica</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-lg">-</span>
                <span className="text-sm text-muted-foreground">Especie no endémica</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Sección Lista Roja */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Lista Roja (LR)
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-50 text-gray-600">LC</Badge>
                <span className="text-sm text-muted-foreground">Preocupación Menor</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-100 text-gray-700">NT</Badge>
                <span className="text-sm text-muted-foreground">Casi Amenazado</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-200 text-gray-800">VU</Badge>
                <span className="text-sm text-muted-foreground">Vulnerable</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-300 text-gray-900">EN</Badge>
                <span className="text-sm text-muted-foreground">En Peligro</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-400 text-gray-950">CR</Badge>
                <span className="text-sm text-muted-foreground">En Peligro Crítico</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-500 text-white">EW</Badge>
                <span className="text-sm text-muted-foreground">Extinto en Estado Silvestre</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-700 text-white">EX</Badge>
                <span className="text-sm text-muted-foreground">Extinto</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-100 text-gray-400">DD</Badge>
                <span className="text-sm text-muted-foreground">Datos Insuficientes</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Sección Pisos Climáticos */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Pisos Climáticos
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-4 rounded border" style={{ backgroundColor: '#90EE90' }}></div>
                <span className="text-sm text-muted-foreground">Tropical (0-1000m)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-4 rounded border" style={{ backgroundColor: '#D2B48C' }}></div>
                <span className="text-sm text-muted-foreground">Subtropical (1000-2000m)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-4 rounded border" style={{ backgroundColor: '#CD853F' }}></div>
                <span className="text-sm text-muted-foreground">Templado (2000-3000m)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-4 rounded border" style={{ backgroundColor: '#8B4513' }}></div>
                <span className="text-sm text-muted-foreground">Frío (3000-4000m)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-4 rounded border" style={{ backgroundColor: '#A0522D' }}></div>
                <span className="text-sm text-muted-foreground">Páramo (4000-5000m)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-4 rounded border border-gray-300" style={{ backgroundColor: '#FFFFFF' }}></div>
                <span className="text-sm text-muted-foreground">Nival (&gt;5000m)</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Sección Distribución */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Distribución (C/S/O)
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-sm">C:</span>
                <span className="text-sm text-muted-foreground">Costa</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-sm">S:</span>
                <span className="text-sm text-muted-foreground">Sierra</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-sm">O:</span>
                <span className="text-sm text-muted-foreground">Oriente</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
