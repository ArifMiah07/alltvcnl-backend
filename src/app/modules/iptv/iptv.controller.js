// src/app/modules/iptv/iptv.controller.js //for better debugging

import axios from "axios";
import { iptvServices } from "./iptv.service.js";

// iptv channels controller
const iptvChannelsController = async (req, res, next) => {
  try {

    const url = "https://iptv-org.github.io/api/channels.json";
    const response = await axios.get(url);

    const { start = 0, limit = 10 } = req.query;
    const slicedData = response.data.slice(
      parseInt(start),
      parseInt(start) + parseInt(limit)
    );
    res.status(200).json({
      status: true,
      message: "data retrieved successfully!",
      data: slicedData,
      total: response.data.length,
    });
    // console.log(`Sent ${slicedData.length} items.`);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: false,
      message: error.message || "something went wrong!",
      error: error,
    });
  }
};

// iptv streams controller

const createiptvStreamsController = async (req, res) => {
  try {

    const url = "https://iptv-org.github.io/api/streams.json";
    const result = await axios.get(url);
    const storeData = await iptvServices.createIptvDataIntoDb(result.data);
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

    // console.log(`total data: ${result.data.length}`);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: false,
      message: error.message || "something went wrong!",
      error: error,
    });
  }
};

// iptv streams controller

const iptvStreamsController = async (req, res) => {
  try {

    const url = "https://iptv-org.github.io/api/streams.json";
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

    // console.log(`total data: ${result.data.length}`);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: false,
      message: error.message || "something went wrong!",
      error: error,
    });
  }
};

export const iptvControllers = {
  iptvChannelsController,
  iptvStreamsController,
  createiptvStreamsController,
};
