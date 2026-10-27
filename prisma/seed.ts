import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import type { AgeId, ThemeId } from "../lib/catalog";
import { parseVideoUrl } from "../lib/video";

const prisma = new PrismaClient();

const PASSING = "https://www.youtube.com/watch?v=Kb58F3r_TQM";
const YOUTH = "https://www.youtube.com/watch?v=fSQOo_3FqAY";
const GOALKEEPER_KIDS = "https://www.youtube.com/watch?v=BHsPdQ7EnZM";
const GOALKEEPER = "https://www.youtube.com/watch?v=bKlB-sSlPIU";
const PASSING_LONG = "https://www.youtube.com/watch?v=2Tn5YLqwRsI";

type SeedExercise = {
  title: string;
  body: string;
  videoUrl: string;
  forPlayers: boolean;
  forCoaches: boolean;
  published: boolean;
  ageGroups: AgeId[];
  themes: ThemeId[];
};

const exercises: SeedExercise[] = [
  {
    title: "Pallonkuljetus porttien läpi",
    body: "Kesto noin 10 minuuttia. Alue 15×15 metriä, yksi pallo pelaajaa kohti.\n\n1. Jokainen kuljettaa palloa alueella ja vaihtaa jalkaa.\n2. Valmentaja näyttää värin: punainen on pysähdys, vihreä suunnanvaihto.\n3. Lopuksi kuljetus pienen portin läpi ja syöttö parille.\n\nOnnistuminen: katse ylhäällä ja pallo lähellä jalkaa.",
    videoUrl: PASSING,
    forPlayers: true,
    forCoaches: false,
    published: true,
    ageGroups: ["7-9"],
    themes: ["tekniikka"],
  },
  {
    title: "Hippa pallon kanssa",
    body: "Kesto 8 minuuttia. Rajattu alue ja yksi pallo pelaajaa kohti.\n\nHippa yrittää koskettaa muita. Kiinni jäänyt pelaaja pysähtyy pallon kanssa ja pääsee takaisin, kun pari kuljettaa hänen jalkojensa välistä.\n\nPelaajat pitävät pallon hallinnassa myös paetessa.",
    videoUrl: YOUTH,
    forPlayers: true,
    forCoaches: false,
    published: true,
    ageGroups: ["7-9"],
    themes: ["fysiikka"],
  },
  {
    title: "Maalivahdin perusasento",
    body: "Kesto 10 minuuttia. Pieni maali ja pehmeät syötöt.\n\n1. Maalivahti seisoo valmiina, polvet notkeina ja kädet edessä.\n2. Pari vierittää pallon maalia kohti.\n3. Maalivahti ottaa pallon syliin ja vierittää sen takaisin.\n\nHarjoite pysyy leikinomaisena. Ei kovia laukauksia.",
    videoUrl: GOALKEEPER_KIDS,
    forPlayers: true,
    forCoaches: false,
    published: true,
    ageGroups: ["7-9"],
    themes: ["maalivahti"],
  },
  {
    title: "Syöttö ja liike",
    body: "Kesto 12 minuuttia. Neljä pelaajaa neliössä, kaksi palloa.\n\nSyöttäjä liikkuu syötön jälkeen vapaaseen kulmaan. Vastaanottaja avaa itselleen tilan ennen ensimmäistä kosketusta.\n\nYksi tavoite: syötön jälkeen et jää paikoillesi.",
    videoUrl: PASSING_LONG,
    forPlayers: true,
    forCoaches: false,
    published: true,
    ageGroups: ["10-13"],
    themes: ["tekniikka"],
  },
  {
    title: "2 vastaan 1",
    body: "Kesto 12 minuuttia. Alue 20×15 metriä ja pieni maali.\n\nKaksi hyökkääjää lähtee syötöllä, yksi puolustaja tulee vastaan viivästyneesti. Hyökkääjät tekevät yhden syötön ennen laukausta.\n\nPuolustaja onnistuu, jos hän viivyttää ja pakottaa syötön sivulle.",
    videoUrl: YOUTH,
    forPlayers: true,
    forCoaches: false,
    published: true,
    ageGroups: ["10-13"],
    themes: ["taktiikka"],
  },
  {
    title: "Lämmittely ennen peliä",
    body: "Kesto 8 minuuttia. Koko joukkueella, yksi pallo paria kohti.\n\n1. Hölkkä ja pallon kuljetus kentän poikki.\n2. Syöttely liikkeessä, ensin lyhyt ja sitten pidempi syöttö.\n3. Kolme kevyttä laukausta molemmilla jaloilla.\n\nSama lämmittely sopii pelaajille ja valmentajan muistilistaksi.",
    videoUrl: PASSING,
    forPlayers: true,
    forCoaches: true,
    published: true,
    ageGroups: ["10-13"],
    themes: ["fysiikka"],
  },
  {
    title: "Ulosmurtautuminen",
    body: "Kesto 15 minuuttia. Puolikas kenttä, maalivahti mukana.\n\nMaalivahti aloittaa pallon keskikentälle. Laitapakit tarjoavat leveän syöttösuunnan ja ysit tiputtavat pallon.\n\nTavoite: ensimmäinen syöttö lähtee eteenpäin, ei taaksepäin varmuuden vuoksi.",
    videoUrl: PASSING_LONG,
    forPlayers: true,
    forCoaches: false,
    published: true,
    ageGroups: ["14-18"],
    themes: ["pelinrakentaminen"],
  },
  {
    title: "Kiinniotto ja jakaminen",
    body: "Kesto 15 minuuttia. Maalivahti ja neljä kenttäpelaajaa.\n\nLaukaukset tulevat vuorotellen keskeltä ja laidasta. Kiinnioton jälkeen maalivahti jakaa pallon merkittyyn pelaajaan kahdella kosketuksella.\n\nKatse nousee ennen jakamista.",
    videoUrl: GOALKEEPER,
    forPlayers: true,
    forCoaches: false,
    published: true,
    ageGroups: ["14-18", "10-13"],
    themes: ["maalivahti"],
  },
  {
    title: "Näin ohjeistat harjoitteen",
    body: "Valmentajalle ennen harjoitusta.\n\nKerro pelaajille yksi tavoite, ei kolmea. Näytä malli kerran ja päästä pelaajat kokeilemaan nopeasti.\n\nPysäytä peli, kun tavoite näkyy. Kysy pelaajalta, mitä hän näki, ennen kuin näytät ratkaisun.",
    videoUrl: PASSING,
    forPlayers: false,
    forCoaches: true,
    published: true,
    ageGroups: ["7-9", "10-13"],
    themes: ["taktiikka"],
  },
  {
    title: "Pelitilanteen pysäytys",
    body: "Valmentajalle 14–18-vuotiaiden harjoitukseen.\n\nPysäytä peli heti, kun joukkue menettää pallon keskustassa. Kysy lähimmältä pelaajalta, missä seuraava syöttösuunta oli.\n\nJatka pelistä samasta paikasta. Yksi pysäytys kolmessa minuutissa riittää.",
    videoUrl: GOALKEEPER,
    forPlayers: false,
    forCoaches: true,
    published: true,
    ageGroups: ["14-18"],
    themes: ["pelinrakentaminen"],
  },
  {
    title: "Luonnos: heikko jalka",
    body: "Tämä harjoite ei näy pelaajille ennen julkaisua.\n\nKuljeta ja syötä vain heikommalla jalalla kahden minuutin jaksoissa.",
    videoUrl: YOUTH,
    forPlayers: true,
    forCoaches: false,
    published: false,
    ageGroups: ["14-18"],
    themes: ["tekniikka"],
  },
];

async function main() {
  const email = (process.env.DIRECTOR_EMAIL ?? "paallikko@bk46.local").toLowerCase();
  const password = process.env.DIRECTOR_PASSWORD ?? "treenipankki";

  for (const exercise of exercises) {
    if (!parseVideoUrl(exercise.videoUrl)) {
      throw new Error(`Videon osoite ei kelpaa: ${exercise.videoUrl}`);
    }
  }

  await prisma.exerciseTheme.deleteMany();
  await prisma.exerciseAgeGroup.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email,
      name: "Valmennuspäällikkö",
      passwordHash: await hash(password, 10),
    },
  });

  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: {
        title: exercise.title,
        body: exercise.body,
        videoUrl: exercise.videoUrl,
        forPlayers: exercise.forPlayers,
        forCoaches: exercise.forCoaches,
        published: exercise.published,
        ageGroups: { create: exercise.ageGroups.map((ageGroup) => ({ ageGroup })) },
        themes: { create: exercise.themes.map((theme) => ({ theme })) },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
