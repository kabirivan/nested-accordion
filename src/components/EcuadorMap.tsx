'use client';

import { useState, useEffect } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { LocationPoint } from '@/data/frogsData';
import dynamic from 'next/dynamic';

// Importación dinámica de MapContainer y componentes relacionados
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface EcuadorMapProps {
  readonly locations?: LocationPoint[];
}

export default function EcuadorMap({ locations = [] }: EcuadorMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationPoint | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Centro de Ecuador
  const ecuadorCenter: [number, number] = [-1.8312, -78.1834];

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-96 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
          <p className="text-secondary">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mapa de Leaflet */}
      <div className="relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <div className="h-[500px] relative z-0">
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />
          <MapContainer
            center={ecuadorCenter}
            zoom={7}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            {/* Capa de terreno con relieve */}
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
              subdomains="abcd"
              minZoom={0}
              maxZoom={18}
            />
            
            {locations.map((location, index) => (
              <CircleMarker
                key={index}
                center={[location.lat, location.lng]}
                radius={8}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.7,
                  weight: 2
                }}
                eventHandlers={{
                  click: () => setSelectedLocation(location)
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-semibold text-sm">{location.locality}</h4>
                    {location.altitude && (
                      <p className="text-xs text-gray-600">Altitud: {location.altitude}m</p>
                    )}
                    {location.date && (
                      <p className="text-xs text-gray-600">Fecha: {location.date}</p>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Información del punto seleccionado */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-white border-2 border-gray-300 rounded-lg z-10">
            <div className="flex items-start gap-2">
              <MapPinIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-primary">{selectedLocation.locality}</h4>
                {selectedLocation.altitude && (
                  <p className="text-sm text-secondary">Altitud: {selectedLocation.altitude}m</p>
                )}
                {selectedLocation.date && (
                  <p className="text-sm text-secondary">Fecha: {selectedLocation.date}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lista de ubicaciones */}
      {locations.length > 0 && (
        <div>
          <h4 className="font-semibold text-primary mb-2">Registros de ubicación ({locations.length})</h4>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {locations.map((location, index) => (
              <button
                key={index}
                onClick={() => setSelectedLocation(location)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedLocation === location
                    ? 'border-primary bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-primary truncate">{location.locality}</p>
                    <div className="flex gap-3 mt-1 text-xs text-secondary">
                      {location.altitude && <span>Alt: {location.altitude}m</span>}
                      {location.date && <span>{location.date}</span>}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {locations.length === 0 && (
        <div className="text-center p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-secondary">No hay registros de ubicación disponibles</p>
        </div>
      )}
    </div>
  );
}

