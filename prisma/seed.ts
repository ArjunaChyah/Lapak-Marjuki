import { PrismaClient, CategoryEnum } from '@prisma/client';

const prisma = new PrismaClient();

const initialProducts = [
  {
    id: "soto",
    name: "Soto Ayam Rumahan",
    category: CategoryEnum.makanan,
    price: 8000,
    description: "Soto ayam hangat dengan kuah kaya rempah khas Semarang, potongan ayam empuk, tauge segar, dan seledri.",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "nasi-rames",
    name: "Nasi Rames Spesial",
    category: CategoryEnum.makanan,
    price: 8000,
    description: "Nasi hangat dilengkapi lauk pauk rumahan lezat seperti oseng tempe, sayur lodeh, dan sambal terasi nikmat.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "indomie-biasa",
    name: "Indomie Biasa",
    category: CategoryEnum.makanan,
    price: 6000,
    description: "Mie instan favorit (Goreng/Rebus) dimasak pas dengan taburan bawang goreng dan rasanya mantap.",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80",
    isBestSeller: false,
    isFeatured: false,
  },
  {
    id: "indomie-telur",
    name: "Indomie Telur",
    category: CategoryEnum.makanan,
    price: 8000,
    description: "Mie instan gurih disajikan hangat dengan telur setengah matang/matang dan irisan cabai rawit segar.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "es-teh",
    name: "Es Teh Manis",
    category: CategoryEnum.minuman,
    price: 3000,
    description: "Es teh manis racikan asli rumahan, segar membasahi kerongkongan di siang hari.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "es-jeruk",
    name: "Es Jeruk Peras",
    category: CategoryEnum.minuman,
    price: 5000,
    description: "Minuman es jeruk peras alami kaya vitamin C, asam manis segar menyegarkan hari Anda.",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    isBestSeller: false,
    isFeatured: true,
  },
  {
    id: "mendoan",
    name: "Tempe Mendoan (1 Pcs)",
    category: CategoryEnum.gorengan,
    price: 1500,
    description: "Tempe mendoan hangat gurih dengan balutan tepung daun bawang, renyah di luar lembut di dalam.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "tahu-bakso",
    name: "Tahu Bakso Semarang (1 Pcs)",
    category: CategoryEnum.gorengan,
    price: 2500,
    description: "Tahu gurih berisi adonan daging sapi bakso pilihan khas Semarang yang legit dan lezat.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "bakwan-jagung",
    name: "Bakwan Jagung (1 Pcs)",
    category: CategoryEnum.gorengan,
    price: 1500,
    description: "Gorengan jagung manis renyah dengan bumbu rempah pilihan, cocok untuk teman makan.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    isBestSeller: false,
    isFeatured: false,
  },
];

async function main() {
  console.log('Seeding Warung Marjuki\'S MySQL database...');

  for (const item of initialProducts) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }

  console.log('Database seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
