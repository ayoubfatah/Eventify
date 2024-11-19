import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const events = [
  {
    id: 1,
    name: "Harmony Festival",
    slug: "harmony-festival",
    city: "Austin",
    location: "Austin Convention Center",
    date: "2030-11-15T00:00:00.000Z",
    organizerName: "Music Enthusiasts LLC",
    imageUrl:
      "https://images.unsplash.com/photo-1700348305514-b9eea0c9999b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Harmony Festival is a celebration of all music genres, bringing together musicians, artists, and music enthusiasts from around the world. Experience a day filled with live performances, interactive workshops, and a vibrant atmosphere of creativity and harmony. Join us for an unforgettable musical journey!",
  },
  {
    id: 2,
    name: "3D Animation Workshop",
    slug: "3d-animation-workshop",
    city: "Austin",
    location: "Austin Convention Center",
    date: "2030-12-08T00:00:00.000Z",
    organizerName: "3D Animators Inc.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1683740128079-09405ab63ab8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Dive into the captivating world of 3D animation at our exclusive 3D Animation Masterclass! Whether you're an aspiring animator, a student studying animation, or a professional looking to enhance your skills, this workshop offers a unique opportunity to learn from industry experts and elevate your animation prowess.",
  },
  {
    id: 3,
    name: "Rock the City Concert",
    slug: "rock-the-city-concert",
    city: "Austin",
    location: "Austin Music Hall",
    date: "2030-11-18T00:00:00.000Z",
    organizerName: "Rock On Productions",
    imageUrl:
      "https://images.unsplash.com/photo-1529787184525-7d3933bec5a0?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Get ready to rock out at Rock the City Concert! Experience electrifying performances by top rock bands, enjoy high-energy music, and immerse yourself in an unforgettable night of pure rock and roll.",
  },
  {
    id: 4,
    name: "Artisan Craft Fair",
    slug: "artisan-craft-fair",
    city: "Seattle",
    location: "Seattle Exhibition Center",
    date: "2030-12-01T00:00:00.000Z",
    organizerName: "Craftsmanship Guild",
    imageUrl:
      "https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100",
    description:
      "Discover unique handmade crafts and artworks at the Artisan Craft Fair. Meet talented artisans, shop for one-of-a-kind items, and support local craftsmanship. Join us for a day of creativity and craftsmanship.",
  },
  {
    id: 5,
    name: "Jazz Fusion Night",
    slug: "jazz-fusion-night",
    city: "Austin",
    location: "Austin Jazz Lounge",
    date: "2030-11-29T00:00:00.000Z",
    organizerName: "Groove Masters Productions",
    imageUrl:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Indulge in the smooth melodies and rhythmic beats of jazz fusion at Jazz Fusion Night. Experience world-class jazz performances, savor delicious cocktails, and immerse yourself in the soulful ambiance of live jazz music.",
  },
  {
    id: 6,
    name: "Indie Music Showcase",
    slug: "indie-music-showcase",
    city: "Austin",
    location: "Austin Indie Spot",
    date: "2030-11-25T00:00:00.000Z",
    organizerName: "Indie Vibes Records",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Discover the next big indie artists at the Indie Music Showcase. Experience live performances by emerging talents, support independent music, and be part of a vibrant community of music enthusiasts and artists.",
  },
  {
    id: 7,
    name: "Global Food Festival",
    slug: "global-food-festival",
    city: "Seattle",
    location: "Seattle Waterfront Park",
    date: "2030-10-30T00:00:00.000Z",
    organizerName: "Foodie Ventures Inc.",
    imageUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Embark on a culinary journey around the world at the Global Food Festival. Delight your taste buds with international cuisines, cooking demonstrations, and food tastings. Experience the flavors of different cultures in one delicious event.",
  },
  {
    id: 8,
    name: "Tech Innovators Summit",
    slug: "tech-innovators-summit",
    city: "Seattle",
    location: "Seattle Convention Center",
    date: "2030-11-15T00:00:00.000Z",
    organizerName: "InnovateTech Inc.",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "The Tech Innovators Summit is where visionaries, entrepreneurs, and tech enthusiasts converge. Explore the latest technological advancements, attend insightful keynotes from industry leaders, and participate in hands-on workshops. Connect with innovators, pitch your ideas, and be a part of shaping the future of technology.",
  },
  {
    id: 9,
    name: "Enchanted Garden Gala",
    slug: "enchanted-garden-gala",
    city: "Austin",
    location: "Austin Museum of Art",
    date: "2030-12-02T00:00:00.000Z",
    organizerName: "Cultural Garden Society",
    imageUrl:
      "https://images.unsplash.com/photo-1460533893735-45cea2212645?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Step into a world of wonder at the Enchanted Garden Gala, a magical evening of art, music, and fantasy. Explore enchanting garden installations, experience live performances by world-class musicians and dancers, and indulge in gourmet delicacies. Dress in your most glamorous attire and immerse yourself in a night of elegance and enchantment.",
  },
  {
    id: 10,
    name: "Comedy Extravaganza",
    slug: "comedy-extravaganza",
    city: "Austin",
    location: "Austin Laugh Factory",
    date: "2030-11-06T00:00:00.000Z",
    organizerName: "Laugh Productions",
    imageUrl:
      "https://images.unsplash.com/photo-1683117855296-979f17e62e87?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Prepare for a night of laughter with top comedians from around the world. Enjoy stand-up, improv, and sketches that will have you in stitches!",
  },
  {
    id: 11,
    name: "Science and Space Expo",
    slug: "science-space-expo",
    city: "Seattle",
    location: "Seattle Science Center",
    date: "2030-10-29T00:00:00.000Z",
    organizerName: "Cosmic Explorers Society",
    imageUrl:
      "https://images.unsplash.com/photo-1493528237448-144452699e16?q=80&w=2803&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Explore the wonders of science and space at this interactive expo. Engage in hands-on experiments, meet scientists, and learn about the mysteries of the universe.",
  },
  {
    id: 12,
    name: "Fashion Runway",
    slug: "fashion-runway",
    city: "Austin",
    location: "Austin Fashion Week Venue",
    date: "2030-11-12T00:00:00.000Z",
    organizerName: "Chic Trends Agency",
    imageUrl:
      "https://images.unsplash.com/photo-1708660369108-2159953bf436?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Witness the latest trends on the runway. Top designers will showcase their collections, setting the stage for the future of fashion.",
  },
  {
    id: 13,
    name: "Culinary Masterclass",
    slug: "culinary-masterclass",
    city: "Seattle",
    location: "Seattle Epicurean Institute",
    date: "2030-12-02T00:00:00.000Z",
    organizerName: "Gourmet Chefs Society",
    imageUrl:
      "https://images.unsplash.com/photo-1625937712159-e305336cbf4b?q=80&w=2389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Join renowned chefs for a culinary journey. Learn cooking techniques, taste exquisite dishes, and elevate your skills in the art of gastronomy.",
  },
  {
    id: 14,
    name: "Film Buffs Symposium",
    slug: "film-buffs-symposium",
    city: "Austin",
    location: "Austin Film Institute",
    date: "2030-11-08T00:00:00.000Z",
    organizerName: "Cinema Society",
    imageUrl:
      "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A gathering for film enthusiasts! Screen classic movies, engage in discussions with filmmakers, and gain insights into the world of cinema.",
  },
  {
    id: 15,
    name: "Literary Salon",
    slug: "literary-salon",
    city: "Seattle",
    location: "Seattle & Co. Bookstore",
    date: "2030-12-15T00:00:00.000Z",
    organizerName: "Words Society",
    imageUrl:
      "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Celebrate the written word at this literary gathering. Listen to readings by acclaimed authors, participate in book discussions, and embrace the magic of storytelling.",
  },
  {
    id: 16,
    name: "Wellness Expo",
    slug: "wellness-expo",
    city: "Austin",
    location: "Austin Convention Center",
    date: "2030-11-30T00:00:00.000Z",
    organizerName: "Wellness Warriors Inc.",
    imageUrl:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Immerse yourself in the world of fitness and well-being. Attend fitness classes, learn about nutrition, and explore holistic approaches to health.",
  },
  {
    id: 17,
    name: "Digital Art Symposium",
    slug: "digital-art-symposium",
    city: "Seattle",
    location: "Seattle Art Gallery",
    date: "2030-11-01T00:00:00.000Z",
    organizerName: "Tech Creatives Collective",
    imageUrl:
      "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Discover the intersection of technology and art. Experience digital art installations, attend VR workshops, and meet digital artists pushing creative boundaries.",
  },
  {
    id: 18,
    name: "Dance Fusion Festival",
    slug: "dance-fusion-festival",
    city: "Austin",
    location: "Austin Street Dance Studio",
    date: "2030-11-28T00:00:00.000Z",
    organizerName: "Rhythm Revolution",
    imageUrl:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Experience a blend of dance styles from around the world. Participate in dance workshops, watch electrifying performances, and dance the night away.",
  },
];

async function main() {
  console.log("start seeding ...");
  for (const event of events) {
    const result = await prisma.eventifyEvent.upsert({
      where: { id: event.id },
      update: {},
      create: event,
    });
    console.log(`created event with id : ${result.id}`);
  }
  console.log("seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
