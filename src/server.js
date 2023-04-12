const express = require("express");
const appRoutes = require("./routers/routes")
const app = express()

app.use(express.json())
app.use(appRoutes)


app.listen(3333, () => console.log("server up in 3333"));






