const prisma = require(`../prisma`);
const express = require(`express`);
const router = express.Router();
module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  }catch(e){
    next(e);
  }
})

router.get("/:id", async (req, res, next) => {
  
})