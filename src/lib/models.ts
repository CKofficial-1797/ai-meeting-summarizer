import mongoose, { Schema, model, models } from "mongoose";

const SummarySchema = new Schema({
  transcript: String,
  summary: String,
  prompt: String,
  createdAt: { type: Date, default: Date.now },
});

export const Summary =
  models.Summary || model("Summary", SummarySchema);