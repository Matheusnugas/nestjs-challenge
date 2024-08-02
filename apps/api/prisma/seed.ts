import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const companies = [
    {
      name: 'Tatooine Trading Co.',
      ticker: 'TAT',
      description:
        'A leading provider of intergalactic goods and services, known for its operations on the desert planet Tatooine.',
    },
    {
      name: 'Coruscant Enterprises',
      ticker: 'CRS',
      description:
        'A major conglomerate headquartered on Coruscant, specializing in high-tech industries and financial services.',
    },
    {
      name: 'Naboo Innovations',
      ticker: 'NAB',
      description:
        'A cutting-edge technology firm from Naboo, renowned for its advancements in clean energy and environmental technology.',
    },
    {
      name: 'Hoth Industries',
      ticker: 'HTH',
      description:
        'An industrial powerhouse known for its cold-resistant materials and survival gear, based on the icy planet Hoth.',
    },
    {
      name: 'Dagobah Systems',
      ticker: 'DGB',
      description:
        'A niche company focused on ecological research and biotech, operating from the swampy terrain of Dagobah.',
    },
    {
      name: 'Alderaan Resources',
      ticker: 'ALD',
      description:
        'A natural resources company, famed for its sustainable mining and mineral extraction techniques, originally from Alderaan.',
    },
    {
      name: 'Mandalore Manufacturing',
      ticker: 'MND',
      description:
        'A premier manufacturer of high-grade armor and weapons, deeply rooted in the warrior culture of Mandalore.',
    },
    {
      name: 'Kashyyyk Technologies',
      ticker: 'KSH',
      description:
        'A tech firm from the Wookiee homeworld of Kashyyyk, specializing in advanced computing and robotics.',
    },
    {
      name: 'Endor Energy',
      ticker: 'END',
      description:
        'An energy company known for harnessing the natural resources of the forest moon of Endor, focusing on renewable energy sources.',
    },
    {
      name: 'Bespin Cloud Services',
      ticker: 'BSP',
      description:
        'A leading provider of gas mining and cloud-based technologies, operating in the skies of Bespin.',
    },
    {
      name: 'Mustafar Minerals',
      ticker: 'MST',
      description:
        'A mining company that extracts valuable minerals from the volcanic planet Mustafar, known for its high-risk, high-reward operations.',
    },
    {
      name: 'Jakku Junkyards',
      ticker: 'JKK',
      description:
        'A salvage company specializing in recovering and repurposing scrap materials from the barren desert planet Jakku.',
    },
    {
      name: 'Kamino Cloning Corp.',
      ticker: 'KMC',
      description:
        'A biotech corporation famous for its cloning technology, headquartered on the oceanic planet Kamino.',
    },
    {
      name: 'Geonosis Engineering',
      ticker: 'GEO',
      description:
        'A construction and droid manufacturing company from Geonosis, known for its large-scale engineering projects.',
    },
    {
      name: 'Yavin 4 Yards',
      ticker: 'YAV',
      description:
        'A shipbuilding company located on Yavin 4, specializing in the construction and repair of spacecraft.',
    },
    {
      name: 'Corellia Shipbuilding',
      ticker: 'COR',
      description:
        'A renowned shipbuilding company from Corellia, famous for its fast and reliable starships.',
    },
    {
      name: 'Ryloth Resources',
      ticker: 'RYL',
      description:
        'A resource extraction company operating on Ryloth, focusing on mining and exporting rare minerals.',
    },
    {
      name: 'Dantooine Dynamics',
      ticker: 'DNT',
      description:
        'A research and development firm based on Dantooine, known for its innovations in agriculture and sustainable technologies.',
    },
    {
      name: 'Felucia Farms',
      ticker: 'FEL',
      description:
        'An agricultural company that cultivates exotic plants and herbs, taking advantage of Felucia’s unique biosphere.',
    },
    {
      name: 'Lothal Logistics',
      ticker: 'LTH',
      description:
        'A logistics and transportation company based on Lothal, providing efficient cargo and freight services across the galaxy.',
    },
  ];

  for (const company of companies) {
    await prisma.company.create({
      data: company,
    });
  }

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
