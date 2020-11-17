const Ideas = require("../models/ideas");

const createIdea = async (idea) => await Ideas.create(idea);

const getAllIdeas = async () =>
  await Ideas.find().populate("user").populate("coach");

const getIdeasById = async (id) =>
  await Ideas.findById(id).populate("user").populate("coach");

module.exports = {
  createIdea,
  getAllIdeas,
  getIdeasById,
};
