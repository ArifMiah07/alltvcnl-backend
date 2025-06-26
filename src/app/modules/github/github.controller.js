// src/app/modules/iptv/iptv.controller.js //for better debugging
import axios from "axios";

// github controller

const githubApiController = async (req, res) => {
  try {
    // single
    const randomUserId = "";

    // multiple
    const randomId = Math.floor(Math.random() * 160000000) + 1; //155251439
    // console.log(randomId);
    const url = `https://api.github.com/users?since=${randomId}`;
    const result = await axios.get(url);
    const { start = 0, limit = 10 } = req.query;
    const slicedData = result.data.slice(
      parseInt(start),
      parseInt(start) + parseInt(limit)
    );
    res.status(200).json({
      status: true,
      message: "get data successfully!",
      result: slicedData,
      total: result.data.length,
    });

    console.log(`total data: ${result.data.length}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message || "something went wrong!",
      error: error,
    });
  }
};

export const githubControllers = {
  githubApiController,
};
