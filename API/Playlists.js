const prisma = require(`../prisma`);
const express = require(`express`);
const router = express.Router();
module.exports = router

router.get("/", async (req, res, next) => {
  try {
  const playlists = await prisma.playlist.findMany();
  res.json(playlists);
}catch(e){
  next(e);
}
})

router.post("/", async (req, res, next) => {
  const { name, description, ownerId, trackIds } = req.body;

  
  const nextError = (field, dataType) => next({
    status: 400,
    message: `Attention, please provide ${field} (${field}: ${dataType})`
  })
  
  if (!name){nextError("name", "String")}
  if (!description){nextError("description", "String")}
  if (!ownerId){nextError("ownerId", "[Int]")}
  if (!trackIds){nextError("trackIds", "[Int]")}

  const tracks = trackIds.map((id) => ({id: +id}))

  try{

    const newPlaylist = await prisma.playlist.create({
      data: {
        name, 
        description, 
        ownerId: +ownerId, 
        tracks: {connect: tracks},
      },
      include: {
        owner: true,
        tracks: true,
      },
    });
    res.status(201).json(newPlaylist)
  }catch(e){
    next(e)
  }
})

router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const playlist = await prisma.playlist.findUnique({ where: {id: +id}, include: {tracks: true}});
    res.json(playlist);
  }catch(e){
    next(e);
  }
})