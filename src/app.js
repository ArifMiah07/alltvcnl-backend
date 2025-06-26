// app.js

import express from "express";
import cors from "cors";
import { iptvRoutes } from "./app/modules/iptv/iptv.routes.js";
import { githubRoutes } from "./app/modules/github/github.routes.js";

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/v1/iptv', iptvRoutes)
app.use('/', githubRoutes)



// get home 
app.get("/", (req, res) => {
  res.send("server is running");
});

export default app;