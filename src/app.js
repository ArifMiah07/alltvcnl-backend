// app.js

import express from "express";
import cors from "cors";
import axios from "axios";
import buildIptv from './app/utils/utils.js'
import { routes } from "./app/modules/iptv/iptv.routes.js";


const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/v1/iptv', routes)

const iptvCustomData = buildIptv()
console.log(iptvCustomData);

app.get("/github", async (req, res) => {
  try {
    const response = await axios.get("https://api.github.com/users?since=2025");
    res.status(200).json({
      status: true,
      message: "ok",
      data: response.data,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error | "something went wrong" ,
      error: error,
    });
  }
});

app.get("/cnl", async (req, res) => {
  try {
    const response = await axios.get("https://iptv-org.github.io/api/streams.json");

    // Use query param to get start & limit (e.g., /cnl?start=0&limit=100)
    const { start = 0, limit = 100 } = req.query;

    const slicedData = response.data.slice(parseInt(start), parseInt(start) + parseInt(limit));

    res.status(200).json({
      status: true,
      message: "ok",
      data: slicedData,
      total: response.data.length,
    });

    console.log(`Sent ${slicedData.length} items.`);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: error.message || "Something went wrong",
    });
  }
});



//
app.get("/streams", async (req, res) => {
  try {
    const response = await axios.get(
      "https://iptv-org.github.io/api/streams.json"
    );
    res.status(200).json({
      status: true,
      message: "ok",
      data: response.data,
    });

    console.log(   response);
    return response;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message:  error | "something went wrong",
      error: error,
    });
  }
});


// get home 
app.get("/", (req, res) => {
  res.send("server is running");
});

export default app;