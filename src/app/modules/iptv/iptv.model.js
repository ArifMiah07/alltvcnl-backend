import { model, Schema } from "mongoose";

const streamsSchema = new Schema(
  {
    channel: { type: String, default: null },
    feed: { type: String, default: null },
    url: { type: String, required: true },
    referrer: { type: String, default: null },
    user_agent: { type: String, default: null },
    quality: { type: String, default: null }
  },
  {
    timestamps: true,
  }
);


export const Streams = model('Streams', streamsSchema)