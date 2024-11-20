const prisma = require(`../prisma`);
const {faker} = require(`@faker-js/faker`)

const seed = async ( numUsers = 6, totalNumTracks = 20, numPlaylists = 10 ) => {
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

  for (let i = 0; i < numPlaylists; i++){
    const randomIntAboveZero = (amount) => Math.ceil(Math.random() * amount) 

    // to have variation in playlist length do Math.ceil(Math.random()*totalNumTracks) instead of 8
    const numTracksPerPlaylist = 8;

    // randomInt generated some duplicates, so playlists have less than 8 tracks
    const randomTracks = Array.from({ length: numTracksPerPlaylist}, (_,j) => ({ id: randomIntAboveZero(totalNumTracks) }));

  await prisma.playlist.create({ 
    data: {
      name: faker.music.genre(),
      description: faker.lorem.paragraph(2),
      ownerId: randomIntAboveZero(numUsers),
      tracks: { connect: randomTracks} ,
    }
  });
  }
}
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
