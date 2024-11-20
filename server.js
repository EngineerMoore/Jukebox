const express = require(`express`);
const app = express();

const PORT = 3000;


app.use(require(`morgan`)(`dev`))

app.get("/", (req, res, next) => {
  res.send(`Welcome to the Jukebox API`)
})

app.use((req, res, next) => {
  next({ status: 404, message: `Endpoint not found`})
})

app.use((e, req, res, next) => {
  console.error(e);
  res
    .status(e.status ?? 500)
    .json(e.message ?? `Something went wrong.`)
})
app.listen(PORT, () => {
  console.log(`You are now listening on port ${PORT}`)
})