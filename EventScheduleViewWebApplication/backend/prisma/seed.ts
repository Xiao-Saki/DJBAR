import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //TODO パスワードのハッシュ化(現在は平文で実装)
  // User
  await prisma.user.createMany({
    data: [
      {
        email: 'minazuki12.rion@gmail.com',
        password: 'Minazuki1215',
        name: '水奈月リオン',
      },
      {
        email: 'otonasiio1215@gmail.com',
        password: 'Otonasiio1215',
        name: '音無いお',
      },
    ],
    skipDuplicates: true, // すでに同じemailがあればスキップ
  });

  // Bar
  const bar1 = await prisma.bar.create({
    data: {
      name: '菜コロ',
      address: '東京都台東区日本堤2-22-6',
      tel: '03-6802-4862',
      description: 'ワイのおかんの店from製作者',
    },
  });
  const bar2 = await prisma.bar.create({
    data: {
      name: 'Bar Blue',
      address: '大阪府大阪市北区浪花町13-33',
      tel: '080-4607-9230',
      description: '全然お店じゃないけどワイのおうち',
    },
  });

  const dj1 = await prisma.dJ.create({
    data: {
      name: 'ÆSir',
      genre: 'House',
      profile: 'Cytus II のストーリーの重要人物となるDJ。ちなみに局はみんな神。',
    },
  });

  const dj2 = await prisma.dJ.create({
    data: {
      name: 'DJ Myosuke',
      genre: 'Hardcore',
      profile: 'ハードコアタノCのメンバー。最強に曲がかっこいいがばきっく最強',
    },
  });

  // User取得(イベント登録者)
  const user1 = await prisma.user.findUnique({
    where: { email: 'minazuki12.rion@gmail.com' },
  });

  // Event
  const event1 = await prisma.event.create({
    data: {
      title: "Underground's Parasite Festival",
      date: new Date('2025-08-01T21:00:00Z'),
      imageUrl: '',
      detail: '殻を破られるように狂うミックスの波に呑まれるイベント',
      barId: bar2.id,
      userId: user1?.id || 1,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'SUMMER PARTY',
      date: new Date('2025-08-01T21:00:00Z'),
      imageUrl: '',
      detail: '夏を楽しむスペシャルイベント！',
      barId: bar1.id,
      userId: user1?.id || 1,
    },
  });

  // EventDJ (中間テーブル)
  await prisma.eventDJ.createMany({
    data: [
      { eventId: event1.id, djId: dj1.id },
      { eventId: event1.id, djId: dj2.id },
      { eventId: event2.id, djId: dj2.id },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
