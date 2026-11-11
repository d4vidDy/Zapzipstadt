import marketImage from '../assets/images/Michien_Green_Market_Module_Zapzipstadt.png'
import schoolImage from '../assets/images/Michien_Healthy_Garden_Module_Zapzipstadt.png'
import grassImage from '../assets/images/Michien_cat_grass_module_Zapzipstadt.png'
import flyingImage from '../assets/images/Michien_flying_city_module_Zapzipstadt.png'
import transportImage from '../assets/images/Zapzipstadt_Public_Transport_Module.png'

export const cityPlaces = [
  {
    id: 'katzengrasfeld',
    label: 'Katzengrasfeld',
    name: 'Das Katzengrasfeld',
    category: 'Natur & Erholung',
    image: grassImage,
    alt: 'Grünes Katzengrasfeld mit Michien, Bäumen und Solarmodulen auf einer rautenförmigen Insel',
    position: { x: '33.5%', y: '33%', layer: 1 },
    highlights: ['Blumen & Bäume', 'Ruhe & frische Luft'],
    paragraphs: [
      'Das große Katzengrasfeld ist sehr schön und grün. Es hat viele bunte Blumen und große Bäume. Das grüne Feld ist sehr ruhig und sauber.',
      'Die kleinen Katzen spielen auf dem weichen Gras. Die frische Luft ist sehr angenehm. Es ist ein schöner und natürlicher Ort.',
    ],
  },
  {
    id: 'umweltschule',
    label: 'Umweltschule',
    name: 'Die Umweltschule',
    category: 'Bildung & Nachhaltigkeit',
    image: schoolImage,
    alt: 'Moderne Umweltschule mit begrüntem Dach, Gewächshaus und lernenden Michien',
    position: { x: '66.5%', y: '33%', layer: 2 },
    highlights: ['Erneuerbare Energie', 'Gemeinsam lernen'],
    paragraphs: [
      'Die moderne Umweltschule ist sehr groß und schön. Sie hat große Fenster und viele grüne Pflanzen. Die nachhaltige Schule benutzt erneuerbare Energie.',
      'Die freundlichen Lehrer unterrichten die Bürger und die Menschen. Es ist ein wichtiger und umweltfreundlicher Ort.',
    ],
  },
  {
    id: 'markt',
    label: 'Gesunder Markt',
    name: 'Der gesunde Markt',
    category: 'Ernährung & Gemeinschaft',
    image: marketImage,
    alt: 'Gesunder Markt mit grünen Marktständen, Gemüse und einkaufenden Michien',
    position: { x: '17%', y: '66%', layer: 3 },
    highlights: ['Gesundes Gemüse', 'Sonntags Live-Musik'],
    paragraphs: [
      'Der bunte Markt mit gesundem Gemüse hat große und bunte Stände. Jeden Sonntag gibt es Live-Musik.',
      'Hier kannst du die Kultur erleben. Der Markt ist ein wichtiger Treffpunkt für die Menschen.',
    ],
  },
  {
    id: 'fliegendes-gebaeude',
    label: 'Fliegendes Gebäude',
    name: 'Das fliegende Gebäude',
    category: 'Architektur & Solarenergie',
    image: flyingImage,
    alt: 'Fliegendes Gebäude mit Solardächern, grünen Terrassen und Michien',
    position: { x: '50%', y: '66%', layer: 4 },
    highlights: ['Solarenergie', 'Aussicht & Extremsport'],
    paragraphs: [
      'Das futuristische Gebäude ist beeindruckend. Das nachhaltige Gebäude ist umweltfreundlich. Das ganze Gebäude funktioniert mit Solarenergie.',
      'Das große Gebäude hat die beste Aussicht auf die Stadt. Die Einwohner können Extremsportarten machen.',
    ],
  },
  {
    id: 'bahnhof',
    label: 'Bahnhof',
    name: 'Der Bahnhof',
    category: 'Mobilität & Verbindung',
    image: transportImage,
    alt: 'Futuristischer Bahnhof mit elektrischem Zug und reisenden Michien',
    position: { x: '83%', y: '66%', layer: 5 },
    highlights: ['Elektrische Züge', 'Freitags kostenlos'],
    paragraphs: [
      'Der futuristische Bahnhof ist modern und umweltfreundlich. Die schnellen elektrischen Züge transportieren die Menschen durch die Stadt.',
      'Jeden Freitag ist der öffentliche Verkehr für alle kostenlos.',
    ],
  },
]
