import arrival from '../assets/images/Michien_strolling_through_Zapzipstadt.png'
import studying from '../assets/images/Michien_Studying_Zapzipstadt.png'
import landing from '../assets/images/Michien_Landing_in_Zapzipstadt.png'
import planting from '../assets/images/Michien_planting_Zapzipstadt.png'
import houses from '../assets/images/Michien_building_Zapzipstadt.png'
import recycling from '../assets/images/Michien_recycling_Zapzipstadt.png'
import school from '../assets/images/Michien_inauguration_Zapzipstadt.png'
import education from '../assets/images/Michien_renewed_society_Zapzipstadt.png'
import transport from '../assets/images/Michien_green_cycle_Zapzipstadt.png'
import flyingBuildings from '../assets/images/Michien_Modern_World_Zapzipstadt.png'
import technology from '../assets/images/Michien_sharing_technology_Zapzipstadt.png'
import solar from '../assets/images/Michien_Renewable_Energy_Zapzipstadt.png'

export const periods = [
  {
    years: '2000–2001',
    title: 'Ankunft auf der Erde',
    events: [
      {
        id: 'ankunft',
        year: 2000,
        title: 'Frau Zipzen kommt an',
        text: 'Frau Zipzen kam mit ihrem Raumschiff auf die Erde.',
        image: arrival,
        alt: 'Frau Zipzen steht neben ihrem gelandeten Raumschiff.',
      },
      {
        id: 'deutschlernen',
        year: 2001,
        title: 'Frau Zipzen lernt Deutsch',
        text: 'Frau Zipzen lernte Deutsch.',
        image: studying,
        alt: 'Frau Zipzen lernt mit einem Buch an einem Schreibtisch.',
      },
      {
        id: 'michien-ankunft',
        year: 2001,
        title: 'Die Michien kommen an',
        text: 'Die Michien reisten mit einem Raumschiff zur Erde.',
        image: landing,
        alt: 'Mehrere Michien steigen aus einem grünen Raumschiff.',
      },
    ],
  },
  {
    years: '2002–2004',
    title: 'Die ersten grünen Schritte',
    events: [
      {
        id: 'katzengras',
        year: 2002,
        title: 'Die ersten Katzengrasfelder',
        text: 'Die Michien pflanzten die ersten Felder mit Katzengras.',
        image: planting,
        alt: 'Die Michien pflanzen und gießen Katzengras.',
      },
      {
        id: 'haeuser',
        year: 2003,
        title: 'Nachhaltige Häuser',
        text: 'Die Michien bauten Häuser aus nachhaltigen Materialien.',
        image: houses,
        alt: 'Die Michien bauen Holzhäuser mit begrünten Dächern.',
      },
      {
        id: 'plastikverbot',
        year: 2004,
        title: 'Plastikverbot in der Stadt',
        text: 'Die Michien verboten Plastik in der ganzen Stadt.',
        image: recycling,
        alt: 'Die Michien sortieren Abfälle neben einem Schild für das Plastikverbot.',
      },
    ],
  },
  {
    years: '2010–2018',
    title: 'Bildung und Mobilität',
    events: [
      {
        id: 'umweltschule',
        year: 2010,
        title: 'Eine Schule für die Umwelt',
        text: 'Die Michien gründeten eine Umweltschule in Zapzipstadt.',
        image: school,
        alt: 'Die Michien eröffnen die Umweltschule und pflanzen Bäume.',
      },
      {
        id: 'nachhaltigkeit',
        year: 2014,
        title: 'Nachhaltigkeit im Alltag',
        text: 'Die Michien studierten Nachhaltigkeit und zeigten den Menschen, wie man umweltfreundlich lebt.',
        image: education,
        alt: 'Die Michien zeigen den Menschen, wie sie Pflanzen anbauen und Abfälle wiederverwenden.',
      },
      {
        id: 'mobilitaet',
        year: 2018,
        title: 'Nachhaltige Verkehrsmittel',
        text: 'Alle Verkehrsmittel in der Stadt waren nachhaltig.',
        image: transport,
        alt: 'Ein grüner Zug fährt über Fahrrädern und einem kleinen Elektroauto.',
      },
    ],
  },
  {
    years: '2020–2026',
    title: 'Die Stadt der Zukunft',
    events: [
      {
        id: 'fliegende-gebaeude',
        year: 2020,
        title: 'Fliegende Gebäude',
        text: 'Die Michien bauten die ersten fliegenden Gebäude der Stadt.',
        image: flyingBuildings,
        alt: 'Grüne Gebäude schweben über Zapzipstadt.',
      },
      {
        id: 'technologie',
        year: 2024,
        title: 'Technologie für die Menschen',
        text: 'Die Michien teilten ihre Technologie mit den Menschen.',
        image: technology,
        alt: 'Ein Michien zeigt einem Menschen ein kleines technisches Gerät.',
      },
      {
        id: 'solarenergie',
        year: 2026,
        title: 'Solarenergie in der Stadt',
        text: 'Die Michien installierten Solarmodule in der ganzen Stadt.',
        image: solar,
        alt: 'Die Michien installieren Solarmodule auf einem Hausdach.',
      },
    ],
  },
]
