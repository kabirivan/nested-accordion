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
  imageUrl?: string;
  etymology?: string;
  definition?: string;
  comparisons?: string;
  distributionText?: string;
  content?: string;
  references?: string;
  remarks?: string;
}

export interface FrogGenus {
  id: string;
  name: string;
  commonName: string;
  imageUrl?: string;
  etymology?: string;
  definition?: string;
  distribution?: string;
  content?: string;
  remarks?: string;
  summary: {
    totalSpecies: number;
    endemicSpecies: number;
    redListSpecies: number;
  };
  species: FrogSpecies[];
}

export interface GalleryImage {
  url: string;
  category: 'morfologia-interna' | 'morfologia-externa' | 'habitat' | 'comportamiento';
  caption?: string;
}

export interface SoundFile {
  url: string;
  title: string;
  description?: string;
  recordedBy?: string;
  recordedDate?: string;
  location?: string;
}

export interface LocationPoint {
  lat: number;
  lng: number;
  locality: string;
  altitude?: number;
  date?: string;
}

export interface FrogFamily {
  id: string;
  name: string;
  commonNames: string[];
  description: string;
  etymology?: string;
  definition?: string;
  distribution?: string;
  content?: string;
  remarks?: string;
  imageUrl?: string;
  gallery?: GalleryImage[];
  sounds?: SoundFile[];
  locations?: LocationPoint[];
  summary: {
    totalSpecies: number;
    totalGenera: number;
    endemicSpecies: number;
    redListSpecies: number;
  };
  genera: FrogGenus[];
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
      totalSpecies: 14,
      totalFamilies: 4,
      endemicSpecies: 5,
      redListSpecies: 7
    },
    families: [
      {
        id: "bufonidae",
        name: "Bufonidae",
        commonNames: ["Sapos", "Osornosapos", "Ranas arlequí"],
        description: "Familia de sapos verdaderos, conocidos por su piel rugosa y glándulas parotoides.",
        etymology: "El nombre Bufonidae proviene del latín 'bufo' que significa sapo. Esta denominación hace referencia a los miembros más característicos de la familia, los sapos verdaderos.",
        definition: "Los bufónidos son una familia de anfibios anuros que se caracterizan por tener piel rugosa con verrugas, glándulas parotoides prominentes detrás de los ojos, y cuerpos robustos. Son principalmente terrestres y tienen hábitos nocturnos.",
        distribution: "Esta familia tiene distribución cosmopolita, encontrándose en todos los continentes excepto la Antártida y algunas islas oceánicas. Son especialmente diversos en América tropical y África.",
        content: "La familia Bufonidae incluye más de 600 especies agrupadas en aproximadamente 50 géneros. Los sapos de esta familia muestran una gran variedad de adaptaciones ecológicas, desde especies totalmente terrestres hasta algunas que viven cerca de cuerpos de agua.",
        remarks: "Muchas especies de bufónidos secretan toxinas a través de sus glándulas parotoides como mecanismo de defensa. Estas toxinas pueden ser irritantes para los depredadores pero generalmente no son peligrosas para los humanos con un manejo adecuado.",
        imageUrl: "",
        gallery: [],
        sounds: [],
        locations: [
          {
            lat: -0.2298,
            lng: -78.5249,
            locality: "Quito, Pichincha",
            altitude: 2850,
            date: "2023-03-15"
          },
          {
            lat: -2.9001,
            lng: -79.0059,
            locality: "Cuenca, Azuay",
            altitude: 2560,
            date: "2023-05-20"
          },
          {
            lat: -0.9500,
            lng: -78.6167,
            locality: "Latacunga, Cotopaxi",
            altitude: 2750,
            date: "2023-07-10"
          },
          {
            lat: -2.1962,
            lng: -79.8862,
            locality: "Guayaquil, Guayas",
            altitude: 4,
            date: "2023-08-05"
          },
          {
            lat: -0.4653,
            lng: -76.9868,
            locality: "Coca, Orellana",
            altitude: 250,
            date: "2023-09-12"
          },
          {
            lat: 0.9824,
            lng: -79.6503,
            locality: "Esmeraldas, Esmeraldas",
            altitude: 15,
            date: "2023-10-18"
          },
          {
            lat: -1.2490,
            lng: -78.6067,
            locality: "Ambato, Tungurahua",
            altitude: 2577,
            date: "2023-11-22"
          },
          {
            lat: -3.9959,
            lng: -79.2074,
            locality: "Loja, Loja",
            altitude: 2060,
            date: "2024-01-08"
          }
        ],
        summary: {
          totalSpecies: 8,
          totalGenera: 3,
          endemicSpecies: 2,
          redListSpecies: 3
        },
        genera: [
          {
            id: "rhinella",
            name: "Rhinella",
            commonName: "Sapo",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Cane_toad.jpg/800px-Cane_toad.jpg",
            etymology: "The name Rhinella comes from the Greek 'rhinos' meaning nose or snout, referring to the prominent snout characteristic of many species in this genus.",
            definition: "Rhinella is a genus of true toads in the family Bufonidae. They are characterized by their robust body, dry warty skin, and prominent parotoid glands behind the eyes.",
            distribution: "The genus Rhinella is widely distributed throughout Central and South America, from Mexico to Argentina, occupying diverse habitats from lowland rainforests to montane cloud forests.",
            content: "This genus includes approximately 90 species of toads, many of which are common throughout their range. They play important ecological roles as predators of invertebrates and as prey for larger animals.",
            remarks: "Recent molecular studies have revealed that the genus Rhinella is paraphyletic and may require taxonomic revision in the future. Several species complexes show cryptic diversity.",
            summary: {
              totalSpecies: 4,
              endemicSpecies: 1,
              redListSpecies: 2
            },
            species: [
              {
                id: "rhinella-marina",
                scientificName: "Rhinella marina",
                discoverers: "Linnaeus",
                discoveryYear: 1758,
                commonName: "Sapo de Caña",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Cane_toad.jpg/800px-Cane_toad.jpg",
                description: "El sapo más grande del mundo, originario de América Central y del Sur.",
                etymology: "The specific epithet 'marina' refers to the species' association with coastal and marine environments, though this is somewhat misleading as it is equally common in inland areas.",
                definition: "Rhinella marina is a large, terrestrial toad native to Central and South America. It is characterized by its robust build, heavily keratinized skin with prominent parotoid glands, and ability to thrive in human-modified landscapes.",
                comparisons: "Rhinella marina se distingue de otras especies del género por su tamaño considerablemente mayor, glándulas parotoides más prominentes y su capacidad para adaptarse a ambientes urbanos. A diferencia de R. alata, carece de crestas cefálicas distintivas, y comparado con R. margaritifera, presenta una coloración más uniforme y menos variable. Su robustez corporal la diferencia claramente de especies más pequeñas como R. ecuatoriana.",
                distributionText: "Originally distributed from southern Texas to central Brazil and the Amazon Basin, this species has been introduced to many tropical and subtropical regions worldwide, including Australia, the Caribbean, and Oceania.",
                content: "This species is one of the most successful amphibian invaders globally. Adults can reach weights of over 2 kg, making them one of the largest toads in the world. They possess potent toxins in their parotoid glands that can be fatal to predators. Esta especie ha sido objeto de numerosos estudios debido a su impacto como especie invasora. Su biología reproductiva, comportamiento alimentario y estrategias de defensa han sido ampliamente documentadas.",
                references: "<ul><li>Linnaeus, C. (1758). Systema Naturae per Regna Tria Naturae. 10th Edition.</li><li>Lever, C. (2001). The Cane Toad: The History and Ecology of a Successful Colonist. Westbury Academic & Scientific Publishing.</li><li>Shine, R. (2010). The Ecological Impact of Invasive Cane Toads (Bufo marinus) in Australia. The Quarterly Review of Biology, 85(3), 253-291.</li><li>Urban, M.C., et al. (2007). Bigger is fatter: body size and fat content of cane toads (Rhinella marina) vary with latitude but not elevation. Journal of Animal Ecology, 76(5), 966-972.</li></ul>",
                remarks: "Rhinella marina has become a notorious invasive species in Australia where it was introduced in 1935 for pest control. It has had devastating impacts on native predators that attempt to consume it. Conservation status varies by region, with native populations stable but introduced populations causing ecological harm.",
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
                id: "rhinella-alata",
                scientificName: "Rhinella alata",
                discoverers: "Thominot",
                discoveryYear: 1884,
                commonName: "Sapo Alado",
                description: "Sapo de tamaño mediano con crestas prominentes en la cabeza que se asemejan a alas.",
                habitat: "Bosques tropicales húmedos, cerca de arroyos",
                size: "6-9 cm",
                diet: "Insectos, arañas, pequeños invertebrados",
                isEndemic: false,
                redListStatus: "LC",
                distribution: {
                  costa: true,
                  sierra: true,
                  oriente: true
                },
                altitudinalRange: {
                  min: 200,
                  max: 1800
                },
                climaticFloors: ["Tropical", "Subtropical", "Templado"]
              },
              {
                id: "rhinella-margaritifera",
                scientificName: "Rhinella margaritifera",
                discoverers: "Laurenti",
                discoveryYear: 1768,
                commonName: "Sapo Común de Sudamérica",
                description: "Sapo robusto con piel muy verrugosa y coloración variable de marrón a gris.",
                habitat: "Bosques primarios y secundarios, áreas abiertas",
                size: "7-12 cm",
                diet: "Hormigas, termitas, escarabajos, otros insectos",
                isEndemic: false,
                redListStatus: "LC",
                distribution: {
                  costa: false,
                  sierra: false,
                  oriente: true
                },
                altitudinalRange: {
                  min: 0,
                  max: 1500
                },
                climaticFloors: ["Tropical", "Subtropical"]
              },
              {
                id: "rhinella-ecuatoriana",
                scientificName: "Rhinella ecuatoriana",
                discoverers: "Mueses-Cisneros",
                discoveryYear: 2012,
                commonName: "Sapo Ecuatoriano",
                description: "Especie endémica de Ecuador, de tamaño mediano con coloración marrón rojiza.",
                etymology: "El epíteto específico 'ecuatoriana' hace referencia al país de origen de esta especie, Ecuador, donde fue descrita por primera vez.",
                definition: "Rhinella ecuatoriana es una especie de sapo endémica de Ecuador, caracterizada por su tamaño mediano, coloración marrón rojiza y distribución restringida a los bosques montanos andinos del país.",
                comparisons: "R. ecuatoriana se distingue de otras especies del género por su distribución geográfica restringida a Ecuador, su tamaño intermedio (5-8 cm) y su coloración marrón rojiza característica. A diferencia de R. marina, es mucho más pequeña y no presenta adaptaciones para ambientes urbanos. Comparada con R. alata, carece de las crestas cefálicas distintivas, y su coloración es más uniforme que la de R. margaritifera.",
                distributionText: "Esta especie es endémica de Ecuador y se distribuye únicamente en los bosques montanos andinos del país, entre los 1500 y 3000 metros de altitud.",
                content: "Rhinella ecuatoriana es una especie relativamente reciente en la literatura científica, descrita en 2012. Su biología y ecología aún están siendo estudiadas, pero se sabe que habita exclusivamente en bosques montanos andinos con vegetación densa. Esta especie endémica enfrenta amenazas debido a la pérdida de hábitat por deforestación y fragmentación de los bosques montanos andinos. Su distribución restringida la hace particularmente vulnerable a cambios ambientales.",
                references: "<ul><li>Mueses-Cisneros, J.J. (2012). A new species of Rhinella (Anura: Bufonidae) from the Andes of Ecuador. Zootaxa, 3306, 57-68.</li><li>Ron, S.R., et al. (2019). Amphibians of Ecuador. Version 2019.0. Museo de Zoología, Pontificia Universidad Católica del Ecuador.</li><li>Coloma, L.A., et al. (2013). Amphibians of Ecuador: A Critical Assessment. Revista Ecuatoriana de Medicina y Ciencias Biológicas, 34(1), 1-15.</li><li>IUCN SSC Amphibian Specialist Group. (2019). Rhinella ecuatoriana. The IUCN Red List of Threatened Species 2019.</li></ul>",
                remarks: "Esta especie representa un caso interesante de endemismo en los Andes ecuatorianos. Su descubrimiento reciente (2012) sugiere que aún hay diversidad por descubrir en la región andina.",
                habitat: "Bosques montanos andinos, áreas con vegetación densa",
                size: "5-8 cm",
                diet: "Insectos terrestres, arácnidos",
                isEndemic: true,
                redListStatus: "EN",
                distribution: {
                  costa: false,
                  sierra: true,
                  oriente: false
                },
                altitudinalRange: {
                  min: 1800,
                  max: 3200
                },
                climaticFloors: ["Templado", "Frío"]
              }
            ]
          },
          {
            id: "bufo",
            name: "Bufo",
            commonName: "Sapo común",
            summary: {
              totalSpecies: 2,
              endemicSpecies: 0,
              redListSpecies: 0
            },
            species: [
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
                  max: 2000
                },
                climaticFloors: ["Templado"]
              },
              {
                id: "bufo-spinosus",
                scientificName: "Bufo spinosus",
                discoverers: "Daudin",
                discoveryYear: 1803,
                commonName: "Sapo Espinoso",
                description: "Sapo europeo de gran tamaño con verrugas espinosas pronunciadas.",
                habitat: "Bosques mediterráneos, áreas rocosas, zonas agrícolas",
                size: "9-15 cm",
                diet: "Insectos grandes, lombrices, pequeños vertebrados",
                isEndemic: false,
                redListStatus: "LC",
                distribution: {
                  costa: false,
                  sierra: false,
                  oriente: false
                },
                altitudinalRange: {
                  min: 0,
                  max: 1500
                },
                climaticFloors: ["Templado", "Subtropical"]
              }
            ]
          },
          {
            id: "atelopus",
            name: "Atelopus",
            commonName: "Rana arlequín",
            summary: {
              totalSpecies: 2,
              endemicSpecies: 1,
              redListSpecies: 1
            },
            species: [
              {
                id: "atelopus-ignescens",
                scientificName: "Atelopus ignescens",
                discoverers: "Cornalia",
                discoveryYear: 1849,
                commonName: "Rana Arlequín de Quito",
                description: "Rana terrestre de colores brillantes, lamentablemente declarada extinta en estado silvestre.",
                habitat: "Bosques nublados andinos, quebradas de montaña",
                size: "3-4 cm",
                diet: "Hormigas, ácaros, pequeños artrópodos",
                isEndemic: true,
                redListStatus: "CR",
                distribution: {
                  costa: false,
                  sierra: true,
                  oriente: false
                },
                altitudinalRange: {
                  min: 2500,
                  max: 4000
                },
                climaticFloors: ["Frío", "Páramo"]
              },
              {
                id: "atelopus-elegans",
                scientificName: "Atelopus elegans",
                discoverers: "Boulenger",
                discoveryYear: 1882,
                commonName: "Rana Arlequín Elegante",
                description: "Especie diurna con patrones de coloración contrastantes en negro y amarillo o naranja.",
                habitat: "Bosques montanos húmedos, cerca de arroyos de montaña",
                size: "3-5 cm",
                diet: "Pequeños insectos, ácaros, colémbolos",
                isEndemic: false,
                redListStatus: "VU",
                distribution: {
                  costa: false,
                  sierra: true,
                  oriente: true
                },
                altitudinalRange: {
                  min: 1500,
                  max: 3000
                },
                climaticFloors: ["Templado", "Frío"]
              }
            ]
          }
        ]
      },
      {
        id: "hylidae",
        name: "Hylidae",
        commonNames: ["Ranas arborícolas", "Ranas de árbol"],
        description: "Familia de ranas arborícolas con adaptaciones especiales para la vida en los árboles.",
        etymology: "El nombre Hylidae deriva del griego 'hyle' (ὕλη) que significa bosque o madera, haciendo referencia a su hábitat arbóreo predominante.",
        definition: "Los hílidos son una familia de ranas caracterizadas por sus adaptaciones arbóreas, incluyendo discos adhesivos en los dedos, cuerpos esbeltos y patas largas. Muchas especies tienen colores brillantes y llamativos.",
        distribution: "Esta familia se encuentra principalmente en las Américas, con la mayor diversidad en los trópicos del Nuevo Mundo. Algunas especies también habitan en Australia y regiones templadas.",
        content: "La familia Hylidae comprende más de 700 especies en aproximadamente 50 géneros. Son conocidas por sus habilidades de escalada y muchas especies tienen cantos distintivos que utilizan durante la reproducción.",
        remarks: "Las ranas arborícolas son indicadores importantes de salud ambiental. Muchas especies están amenazadas debido a la pérdida de hábitat y el cambio climático.",
        imageUrl: "",
        gallery: [],
        sounds: [],
        summary: {
          totalSpecies: 2,
          totalGenera: 2,
          endemicSpecies: 1,
          redListSpecies: 0
        },
        genera: [
          {
            id: "hyla",
            name: "Hyla",
            commonName: "Rana arborícola",
            summary: {
              totalSpecies: 1,
              endemicSpecies: 0,
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
              }
            ]
          },
          {
            id: "agalychnis",
            name: "Agalychnis",
            commonName: "Rana de ojos rojos",
            summary: {
              totalSpecies: 1,
              endemicSpecies: 1,
              redListSpecies: 0
            },
            species: [
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
          }
        ]
      },
      {
        id: "ranidae",
        name: "Ranidae",
        commonNames: ["Ranas verdaderas", "Ranas de agua"],
        description: "La familia más diversa de ranas, con distribución mundial.",
        etymology: "El nombre Ranidae proviene del latín 'rana' que significa rana, siendo el término más antiguo y generalizado para referirse a estos anfibios.",
        definition: "Los ránidos son la familia arquetípica de ranas, caracterizadas por cuerpos robustos, patas traseras largas y potentes adaptadas para el salto, y piel lisa. Están estrechamente asociadas con ambientes acuáticos.",
        distribution: "La familia Ranidae tiene una distribución casi cosmopolita, encontrándose en todos los continentes excepto la Antártida y Sudamérica. Son especialmente abundantes en el hemisferio norte.",
        content: "Con más de 400 especies en cerca de 50 géneros, los ránidos son una de las familias más exitosas de anfibios. Incluyen muchas especies comunes y bien conocidas que han sido importantes en investigación científica.",
        remarks: "Las ranas de esta familia son ampliamente utilizadas en investigación biológica y educación. Algunas especies han experimentado declives poblacionales severos debido a enfermedades como la quitridiomicosis.",
        imageUrl: "",
        gallery: [],
        sounds: [],
        summary: {
          totalSpecies: 2,
          totalGenera: 2,
          endemicSpecies: 0,
          redListSpecies: 0
        },
        genera: [
          {
            id: "rana",
            name: "Rana",
            commonName: "Rana común",
            summary: {
              totalSpecies: 1,
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
              }
            ]
          },
          {
            id: "lithobates",
            name: "Lithobates",
            commonName: "Rana toro",
            summary: {
              totalSpecies: 1,
              endemicSpecies: 0,
              redListSpecies: 0
            },
            species: [
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
          }
        ]
      },
      {
        id: "dendrobatidae",
        name: "Dendrobatidae",
        commonNames: ["Ranas venenosas", "Ranas flecha", "Ranas dardo"],
        description: "Ranas pequeñas y coloridas conocidas por su toxicidad.",
        etymology: "El nombre Dendrobatidae proviene del griego 'dendro' (árbol) y 'bates' (caminante), aunque muchas especies son en realidad terrestres más que arbóreas.",
        definition: "Los dendrobátidos son ranas pequeñas caracterizadas por su coloración aposemática brillante (colores de advertencia) y la presencia de alcaloides tóxicos en su piel. Son diurnas, a diferencia de la mayoría de las ranas.",
        distribution: "Esta familia es endémica de América Central y Sudamérica, con la mayor diversidad en la región amazónica y los Andes. Habitan principalmente bosques tropicales húmedos de tierras bajas y montanos.",
        content: "La familia Dendrobatidae incluye más de 300 especies en 16 géneros. Sus toxinas cutáneas han sido estudiadas extensivamente por su potencial farmacológico y fueron utilizadas tradicionalmente por pueblos indígenas para envenenar dardos de caza.",
        remarks: "Las toxinas de estas ranas provienen de su dieta de ácaros y otros artrópodos en la naturaleza. Las ranas criadas en cautiverio con dietas alternativas no desarrollan las mismas toxinas. Son populares en el comercio de mascotas exóticas, aunque requieren cuidados especializados.",
        imageUrl: "",
        gallery: [],
        sounds: [],
        summary: {
          totalSpecies: 2,
          totalGenera: 2,
          endemicSpecies: 2,
          redListSpecies: 2
        },
        genera: [
          {
            id: "dendrobates",
            name: "Dendrobates",
            commonName: "Rana flecha",
            summary: {
              totalSpecies: 1,
              endemicSpecies: 1,
              redListSpecies: 1
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
              }
            ]
          },
          {
            id: "phyllobates",
            name: "Phyllobates",
            commonName: "Rana dorada",
            summary: {
              totalSpecies: 1,
              endemicSpecies: 1,
              redListSpecies: 1
            },
            species: [
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
        etymology: "El nombre Caeciliidae deriva del latín 'caecus' que significa ciego, en referencia a sus ojos rudimentarios o ausentes y sus hábitos subterráneos.",
        definition: "Los cecílidos son anfibios ápodos (sin extremidades) con cuerpos cilíndricos alargados adaptados para la vida fosorial (excavadora). Tienen piel lisa con anillos corporales y tentáculos sensoriales únicos entre los anfibios.",
        distribution: "Esta familia tiene distribución pantropical, encontrándose en América Central y del Sur, África subsahariana, y el sur de Asia. Habitan principalmente suelos húmedos de bosques tropicales.",
        content: "La familia Caeciliidae es la más grande del orden Gymnophiona, con más de 150 especies. Estos anfibios poco conocidos tienen ciclos de vida fascinantes, con algunas especies exhibiendo cuidado parental y alimentación de las crías con la piel de la madre.",
        remarks: "Las cecilias son los anfibios menos conocidos y estudiados debido a sus hábitos crípticos subterráneos. Juegan roles importantes en los ecosistemas del suelo, alimentándose de invertebrados. Muchas especies probablemente permanecen sin descubrir.",
        imageUrl: "",
        gallery: [],
        sounds: [],
        summary: {
          totalSpecies: 1,
          totalGenera: 1,
          endemicSpecies: 1,
          redListSpecies: 0
        },
        genera: [
          {
            id: "caecilia",
            name: "Caecilia",
            commonName: "Cecilia",
            summary: {
              totalSpecies: 1,
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
    ]
  }
];
