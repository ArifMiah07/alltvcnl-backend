// server.js

import app from "./app.js";
import mongoose from "mongoose";
import config from "./app/config/index.js";

// let server;


async function main() {
  try {
    await mongoose.connect(config.DB_URL);
    app.listen(config.port, () => {
      console.log(`server is running on port: ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();