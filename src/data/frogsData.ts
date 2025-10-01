export interface FrogSpecies {
  id: string;
  scientificName: string;
  discoverers: string;
  discoveryYear: number;
  commonName: string;
  description: string;
  habitat: string;
  size: string;
  diet: string;
  isEndemic: boolean;
  redListStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD';
  distribution: {
    costa: boolean;
    sierra: boolean;
    oriente: boolean;
  };
  altitudinalRange: {
    min: number;
    max: number;
  };
  climaticFloors: string[];
}

export interface FrogFamily {
  id: string;
  name: string;
  commonNames: string[];
  description: string;
  summary: {
    totalSpecies: number;
    totalGenera: number;
    endemicSpecies: number;
    redListSpecies: number;
  };
  species: FrogSpecies[];
}

export interface FrogOrder {
  id: string;
  name: string;
  description: string;
  summary: {
    totalSpecies: number;
    totalFamilies: number;
    endemicSpecies: number;
    redListSpecies: number;
  };
  families: FrogFamily[];
}

export const frogsData: FrogOrder[] = [
  {
    id: "anura",
    name: "Anura (Ranas y Sapos)",
    description: "El orden más diverso de anfibios, incluyendo ranas, sapos y ranas arborícolas.",
    summary: {
      totalSpecies: 8,
      totalFamilies: 4,
      endemicSpecies: 3,
      redListSpecies: 5
    },
    families: [
      {
        id: "bufonidae",
        name: "Bufonidae",
        commonNames: ["Sapos", "Osornosapos", "Ranas arlequí"],
        description: "Familia de sapos verdaderos, conocidos por su piel rugosa y glándulas parotoides.",
        summary: {
          totalSpecies: 2,
          totalGenera: 1,
          endemicSpecies: 0,
          redListSpecies: 0
        },
        species: [
                  {
                    id: "bufo-marinus",
                    scientificName: "Rhinella marina",
                    discoverers: "Linnaeus",
                    discoveryYear: 1758,
                    commonName: "Sapo de Caña",
                    description: "El sapo más grande del mundo, originario de América Central y del Sur.",
                    habitat: "Tropical y subtropical, desde bosques hasta áreas urbanas",
                    size: "10-15 cm (machos), 15-25 cm (hembras)",
                    diet: "Insectos, pequeños vertebrados, materia vegetal",
                    isEndemic: false,
                    redListStatus: "LC",
                    distribution: {
                      costa: true,
                      sierra: false,
                      oriente: true
                    },
                    altitudinalRange: {
                      min: 0,
                      max: 1200
                    },
                    climaticFloors: ["Tropical", "Subtropical"]
                  },
          {
            id: "bufo-bufo",
            scientificName: "Bufo bufo",
            discoverers: "Linnaeus",
            discoveryYear: 1758,
            commonName: "Sapo Común Europeo",
            description: "Sapo robusto y ampliamente distribuido en Europa.",
            habitat: "Bosques, praderas, jardines, áreas urbanas",
            size: "8-13 cm",
            diet: "Insectos, gusanos, caracoles",
            isEndemic: false,
            redListStatus: "LC",
            distribution: {
              costa: false,
              sierra: false,
              oriente: false
            },
            altitudinalRange: {
              min: 0,
              max: 0
            },
            climaticFloors: []
          }
        ]
      },
      {
        id: "hylidae",
        name: "Hylidae",
        commonNames: ["Ranas arborícolas", "Ranas de árbol"],
        description: "Familia de ranas arborícolas con adaptaciones especiales para la vida en los árboles.",
        summary: {
          totalSpecies: 2,
          totalGenera: 2,
          endemicSpecies: 1,
          redListSpecies: 0
        },
        species: [
          {
            id: "hyla-cinerea",
            scientificName: "Hyla cinerea",
            discoverers: "Schneider",
            discoveryYear: 1799,
            commonName: "Rana Arborícola Verde",
            description: "Rana arborícola de color verde brillante, excelente trepadora.",
            habitat: "Bosques húmedos, pantanos, cerca de cuerpos de agua",
            size: "3-6 cm",
            diet: "Insectos voladores, arañas",
            isEndemic: false,
            redListStatus: "LC",
            distribution: {
              costa: true,
              sierra: false,
              oriente: false
            },
            altitudinalRange: {
              min: 0,
              max: 800
            },
            climaticFloors: ["Tropical"]
          },
          {
            id: "agalychnis-callidryas",
            scientificName: "Agalychnis callidryas",
            discoverers: "Cope",
            discoveryYear: 1862,
            commonName: "Rana de Ojos Rojos",
            description: "Famosa por sus ojos rojos brillantes y colores vibrantes.",
            habitat: "Bosques tropicales de tierras bajas",
            size: "5-7 cm (machos), 6-8 cm (hembras)",
            diet: "Insectos, arañas, pequeños invertebrados",
            isEndemic: true,
            redListStatus: "LC",
            distribution: {
              costa: true,
              sierra: false,
              oriente: false
            },
            altitudinalRange: {
              min: 0,
              max: 1200
            },
            climaticFloors: ["Tropical", "Subtropical"]
          }
        ]
      },
      {
        id: "ranidae",
        name: "Ranidae",
        commonNames: ["Ranas verdaderas", "Ranas de agua"],
        description: "La familia más diversa de ranas, con distribución mundial.",
        summary: {
          totalSpecies: 2,
          totalGenera: 2,
          endemicSpecies: 0,
          redListSpecies: 0
        },
        species: [
          {
            id: "rana-temporaria",
            scientificName: "Rana temporaria",
            discoverers: "Linnaeus",
            discoveryYear: 1758,
            commonName: "Rana Común Europea",
            description: "Rana terrestre común en Europa, con gran variabilidad de color.",
            habitat: "Bosques, praderas, montañas hasta 3000m",
            size: "6-9 cm",
            diet: "Insectos, arañas, gusanos",
            isEndemic: false,
            redListStatus: "LC",
            distribution: {
              costa: false,
              sierra: false,
              oriente: false
            },
            altitudinalRange: {
              min: 0,
              max: 0
            },
            climaticFloors: []
          },
          {
            id: "lithobates-catesbeianus",
            scientificName: "Lithobates catesbeianus",
            discoverers: "Shaw",
            discoveryYear: 1802,
            commonName: "Rana Toro",
            description: "Una de las ranas más grandes de América del Norte.",
            habitat: "Lagos, estanques, pantanos de agua dulce",
            size: "9-15 cm",
            diet: "Insectos, peces pequeños, otras ranas, pequeños mamíferos",
            isEndemic: false,
            redListStatus: "LC",
            distribution: {
              costa: true,
              sierra: true,
              oriente: false
            },
            altitudinalRange: {
              min: 0,
              max: 2500
            },
            climaticFloors: ["Tropical", "Subtropical", "Templado"]
          }
        ]
      },
      {
        id: "dendrobatidae",
        name: "Dendrobatidae",
        commonNames: ["Ranas venenosas", "Ranas flecha", "Ranas dardo"],
        description: "Ranas pequeñas y coloridas conocidas por su toxicidad.",
        summary: {
          totalSpecies: 2,
          totalGenera: 2,
          endemicSpecies: 2,
          redListSpecies: 2
        },
        species: [
          {
            id: "dendrobates-azureus",
            scientificName: "Dendrobates azureus",
            discoverers: "Hoogmoed",
            discoveryYear: 1969,
            commonName: "Rana Flecha Azul",
            description: "Rana venenosa de color azul brillante, endémica de Surinam.",
            habitat: "Bosques tropicales húmedos",
            size: "3-4 cm",
            diet: "Hormigas, ácaros, pequeños insectos",
            isEndemic: true,
            redListStatus: "VU",
            distribution: {
              costa: true,
              sierra: false,
              oriente: false
            },
            altitudinalRange: {
              min: 0,
              max: 600
            },
            climaticFloors: ["Tropical"]
          },
          {
            id: "phyllobates-terribilis",
            scientificName: "Phyllobates terribilis",
            discoverers: "Myers, Daly & Malkin",
            discoveryYear: 1978,
            commonName: "Rana Dorada Venenosa",
            description: "Considerada la rana más venenosa del mundo.",
            habitat: "Bosques tropicales de la costa del Pacífico de Colombia",
            size: "4-5 cm",
            diet: "Hormigas, ácaros, pequeños insectos",
            isEndemic: true,
            redListStatus: "EN",
            distribution: {
              costa: true,
              sierra: false,
              oriente: false
            },
            altitudinalRange: {
              min: 0,
              max: 500
            },
            climaticFloors: ["Tropical"]
          }
        ]
      }
    ]
  },
  {
    id: "gymnophiona",
    name: "Gymnophiona (Cecilias)",
    description: "Anfibios sin extremidades, parecidos a gusanos, que viven principalmente bajo tierra.",
    summary: {
      totalSpecies: 1,
      totalFamilies: 1,
      endemicSpecies: 1,
      redListSpecies: 0
    },
    families: [
      {
        id: "caeciliidae",
        name: "Caeciliidae",
        commonNames: ["Cecilias", "Gusanos ciegos"],
        description: "La familia más diversa de cecilias, con especies en América, África y Asia.",
        summary: {
          totalSpecies: 1,
          totalGenera: 1,
          endemicSpecies: 1,
          redListSpecies: 0
        },
        species: [
          {
            id: "caecilia-thompsoni",
            scientificName: "Caecilia thompsoni",
            discoverers: "Boulenger",
            discoveryYear: 1902,
            commonName: "Cecilia de Thompson",
            description: "Una de las cecilias más grandes conocidas, endémica de Colombia.",
            habitat: "Suelos húmedos de bosques tropicales",
            size: "Hasta 1.5 metros",
            diet: "Gusanos, insectos del suelo, pequeños vertebrados",
            isEndemic: true,
            redListStatus: "DD",
            distribution: {
              costa: false,
              sierra: true,
              oriente: true
            },
            altitudinalRange: {
              min: 800,
              max: 2000
            },
            climaticFloors: ["Subtropical", "Templado"]
          }
        ]
      }
    ]
  }
];
