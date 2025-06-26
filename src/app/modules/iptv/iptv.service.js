import { Streams } from "./iptv.model.js";

const createIptvDataIntoDb = async (payload) => {
  const result = await Streams.insertMany(payload, { ordered: false });
  return result;
};

export const iptvServices = {
  createIptvDataIntoDb,
};
