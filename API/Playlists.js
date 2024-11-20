const prisma = require(`../prisma`);
const express = require(`express`);
const router = express.Router();
module.exports = router

router.get("/", async (req, res, next) => {
  try {
  const playlists = await prisma.user.findMany();
  res.json(playlists);
}catch(e){
  next(e);
}
})

router.post("/", async (req, res, next) => {
  
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