// app.js

import express from "express";
import cors from "cors";
import { routes } from "./app/modules/iptv/iptv.routes.js";
import { githubRoutes } from "./app/modules/github/github.routes.js";


const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/v1/iptv', routes)
app.use('/', githubRoutes)



// get home 
app.get("/", (req, res) => {
  res.send("server is running");
});

export default app;