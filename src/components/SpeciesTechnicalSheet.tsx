'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Camera, Volume2, MapPin } from 'lucide-react';
import ClimaticFloorChart from './ClimaticFloorChart';

interface SpeciesTechnicalSheetProps {
  scientificName: string;
  collectors: string;
  commonName: string;
  order: string;
  family: string;
  genus: string;
  etymology?: string;
  identification?: string;
  comparisons?: string;
  naturalHistory?: string;
  content?: string;
  distribution?: string;
  conservation?: string;
  references?: string;
  isEndemic?: boolean;
  redListStatus?: string;
  altitudinalRange?: {
    min: number;
    max: number;
  };
  climaticFloors?: string[];
}

export default function SpeciesTechnicalSheet({
  scientificName,
  collectors,
  commonName,
  order,
  family,
  genus,
  etymology,
  identification,
  comparisons,
  naturalHistory,
  content,
  distribution,
  conservation,
  references,
  isEndemic,
  redListStatus,
  altitudinalRange,
  climaticFloors
}: SpeciesTechnicalSheetProps) {
  return (
    <Card className="bg-white rounded-none border-0 flex flex-col p-0 gap-0 overflow-hidden" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: 0, border: 'none' }}>
      {/* Encabezado */}
      <CardHeader className="text-gray-900 text-center sticky top-0 z-30" style={{ padding: '30px', backgroundColor: '#ffffff' }}>
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-3xl font-bold italic" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}>
            {scientificName}
          </h1>
            <p className="text-sm" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif', color: '#666666' }}>
              ({collectors})
          </p>
          </div>
          <p className="text-xl font-semibold" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif', color: '#333333' }}>
            {commonName}
          </p>
          <Separator className="my-4 bg-gray-300" />
          {/* Breadcrumb de taxonomía */}
          <Breadcrumb className="flex justify-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="#" 
                  className="text-xs hover:text-gray-900 transition-colors"
                  style={{ color: '#666666', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}
                >
                  {order}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-400">
                →
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="#" 
                  className="text-xs hover:text-gray-900 transition-colors"
                  style={{ color: '#666666', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}
                >
                  {family}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-400">
                →
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="#" 
                  className="text-xs hover:text-white transition-colors italic"
                  style={{ color: '#999999', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}
                >
                  {genus}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-400">
                →
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage 
                  className="text-xs italic"
                  style={{ color: '#333333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}
                >
                  {scientificName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </CardHeader>

      {/* Cuerpo - Layout con sidebar fijo y contenido con scroll */}
      <CardContent className="p-0 flex-1 overflow-y-auto">
        <div className="flex">
          {/* Columna izquierda - Contenido principal */}
          <div className="flex-1">
            <div className="p-8 space-y-10">
              {/* Secciones de contenido */}
              {etymology && (
                <section>
                <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Etimología
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                    color: '#444444',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: etymology }} />
                  </div>
                </section>
              )}

              {identification && (
                <section>
                <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Identificación
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                    color: '#444444',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: identification }} />
                  </div>
                </section>
              )}

              {comparisons && (
                <section>
                <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Comparaciones
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                    color: '#444444',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: comparisons }} />
                  </div>
                </section>
              )}

              {naturalHistory && (
                <section>
                <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Historia natural
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                    color: '#444444',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: naturalHistory }} />
                  </div>
                </section>
              )}

              {content && (
                <section>
                <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Contenido
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                    color: '#444444',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                </section>
              )}

              {distribution && (
                <section>
                <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Distribución
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                    color: '#444444',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: distribution }} />
                  </div>
                </section>
              )}

              {conservation && (
                <section>
                <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Conservación
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                    color: '#444444',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: conservation }} />
                  </div>
                </section>
              )}

              {references && (
                <section>
                <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Referencias
                </h3>
                  <div className="text-justify" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                    color: '#444444',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: references }} />
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Columna derecha - Sidebar fijo */}
          <div className="w-96 border-l sticky top-0 h-screen overflow-y-auto">
            <div style={{ padding: '25px 30px' }} className="space-y-8">
              {/* Información General */}
              <section>
                <h3 className="mb-4" style={{
                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Información General
                </h3>
                
                <div className="border rounded-none p-4" style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}>
                  {/* Endemismo */}
                  <div className="mb-4">
                    <h4 className="mb-2" style={{
                      color: '#333333',
                      fontSize: '14px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                      fontWeight: '600'
                    }}>
                      Endemismo
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: isEndemic ? '#16a34a' : '#6b7280' }}>
                        {isEndemic ? 'Endémica' : 'No endémica'}
                      </span>
                    </div>
                  </div>

                  {/* Lista Roja */}
                  {redListStatus && (
                    <div className="mb-4">
                      <h4 className="mb-2" style={{
                        color: '#333333',
                        fontSize: '14px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: '600'
                      }}>
                        Lista Roja IUCN
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-1 rounded-none" style={{ 
                          backgroundColor: redListStatus === 'LC' ? '#f8f9fa' : 
                                          redListStatus === 'NT' ? '#f1f3f4' :
                                          redListStatus === 'VU' ? '#e8eaed' :
                                          redListStatus === 'EN' ? '#dadce0' :
                                          redListStatus === 'CR' ? '#bdc1c6' : '#f8f9fa',
                          color: redListStatus === 'LC' ? '#5f6368' : 
                                redListStatus === 'NT' ? '#5f6368' :
                                redListStatus === 'VU' ? '#5f6368' :
                                redListStatus === 'EN' ? '#3c4043' :
                                redListStatus === 'CR' ? '#202124' : '#5f6368',
                          border: '1px solid',
                          borderColor: redListStatus === 'LC' ? '#e8eaed' : 
                                     redListStatus === 'NT' ? '#dadce0' :
                                     redListStatus === 'VU' ? '#bdc1c6' :
                                     redListStatus === 'EN' ? '#9aa0a6' :
                                     redListStatus === 'CR' ? '#5f6368' : '#e8eaed'
                        }}>
                          {redListStatus}
                        </span>
                        <span className="text-sm" style={{ color: '#666666' }}>
                          {redListStatus === 'LC' ? 'Preocupación Menor' :
                           redListStatus === 'NT' ? 'Casi Amenazada' :
                           redListStatus === 'VU' ? 'Vulnerable' :
                           redListStatus === 'EN' ? 'En Peligro' :
                           redListStatus === 'CR' ? 'Críticamente Amenazada' :
                           redListStatus === 'EW' ? 'Extinta en Estado Silvestre' :
                           redListStatus === 'EX' ? 'Extinta' :
                           redListStatus === 'DD' ? 'Datos Deficientes' : redListStatus}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Distribución altitudinal */}
                  {altitudinalRange && climaticFloors && (
                    <div>
                      <h4 className="mb-2" style={{
                        color: '#333333',
                        fontSize: '14px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: '600'
                      }}>
                        Distribución altitudinal
                      </h4>
                      <ClimaticFloorChart
                        altitudinalRange={altitudinalRange}
                        climaticFloors={climaticFloors}
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* Recursos */}
              <section>
              <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Recursos
                </h3>
                <div className="space-y-4">
                  <div className="border rounded-none p-4 transition-colors cursor-pointer hover:bg-gray-25" style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-none flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                        <Camera className="w-5 h-5" style={{ color: '#333333' }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: '#333333' }}>Fotos</p>
                        <p className="text-sm" style={{ color: '#666666' }}>Galería fotográfica</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-none p-4 transition-colors cursor-pointer hover:bg-gray-25" style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-none flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                        <Volume2 className="w-5 h-5" style={{ color: '#333333' }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: '#333333' }}>Sonidos</p>
                        <p className="text-sm" style={{ color: '#666666' }}>Grabaciones de audio</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-none p-4 transition-colors cursor-pointer hover:bg-gray-25" style={{ backgroundColor: '#f9f9f9', borderColor: '#dddddd' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-none flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                        <MapPin className="w-5 h-5" style={{ color: '#333333' }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: '#333333' }}>Mapa</p>
                        <p className="text-sm" style={{ color: '#666666' }}>Distribución geográfica</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Fuentes Externas */}
              <section>
              <h3 className="mb-4" style={{

                  color: '#333333',
                  fontSize: '16px',
                  padding: '8px 0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold'
                }}>
                  Fuentes externas
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto p-2 hover:bg-gray-50 group border rounded-none"
                          style={{ backgroundColor: '#f9f9f9' }}
                          asChild
                        >
                          <a href="#">
                            <img 
                              src="/assets/references/wikipedia.png" 
                              alt="ASW Logo" 
                              className="mx-auto transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ASW - Amphibian Species of the World</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto p-2 hover:bg-gray-50 group border rounded-none"
                          style={{ backgroundColor: '#f9f9f9' }}
                          asChild
                        >
                          <a href="#">
                            <img 
                              src="/assets/references/amphibiaweb.png" 
                              alt="AmphibiaWeb Logo" 
                              className="mx-auto transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>AmphibiaWeb</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto p-2 hover:bg-gray-50 group border rounded-none"
                          style={{ backgroundColor: '#f9f9f9' }}
                          asChild
                        >
                          <a href="#">
                            <img 
                              src="/assets/references/ncbi.png" 
                              alt="NCBI Logo" 
                              className="mx-auto transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>NCBI - National Center for Biotechnology Information</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto p-2 hover:bg-gray-50 group border rounded-none"
                          style={{ backgroundColor: '#f9f9f9' }}
                          asChild
                        >
                          <a href="#">
                            <img 
                              src="/assets/references/vertnet.png" 
                              alt="VertNet Logo" 
                              className="mx-auto transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>VertNet</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto p-2 hover:bg-gray-50 group border rounded-none"
                          style={{ backgroundColor: '#f9f9f9' }}
                          asChild
                        >
                          <a href="#">
                            <img 
                              src="/assets/references/iNaturalist.png" 
                              alt="iNaturalist Logo" 
                              className="mx-auto transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>iNaturalist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto p-2 hover:bg-gray-50 group border rounded-none"
                          style={{ backgroundColor: '#f9f9f9' }}
                          asChild
                        >
                          <a href="#">
                            <img 
                              src="/assets/references/redlist.png" 
                              alt="IUCN Logo" 
                              className="mx-auto transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>IUCN Red List</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </section>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
