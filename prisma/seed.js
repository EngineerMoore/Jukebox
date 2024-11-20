const prisma = require(`../prisma`);
const {faker} = require(`@faker-js/faker`)

const seed = async ( numUsers = 5, totalNumTracks = 20, numPlaylists = 10 ) => {

// Array like object
const users = Array.from({length: numUsers}, () => ({
 username: faker.internet.username(),
}));
await prisma.user.createMany({ data: users });


const tracks = Array.from({length: totalNumTracks}, () => ({
  name: faker.music.songName(),
}));
await prisma.track.createMany({ data: tracks });

// For loop here because we want to make sure numTracksPerPlaylist and randomTracks List are re-randomized
for (let i=0; i < numPlaylists; i++){

// random number b/w 1-20
  const numTracksPerPlaylist = Math.ceil(Math.random()*20);
  const randomTracks = Array.from({ length: numTracksPerPlaylist}, () => ({ id: Math.ceil(Math.random()*20) }));

    await prisma.playlist.create({
      data: {
        name: faker.music.genre(),
        description: faker.lorem.paragraph(2),
        ownerId: Math.ceil(Math.random()*5),
        tracks: { connect: randomTracks },
      }
    });
  };
}
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
