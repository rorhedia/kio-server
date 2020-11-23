const Ideas = require("../models/ideas");

const createIdea = async (idea) => await Ideas.create(idea);

const getAllIdeas = async () =>
  await Ideas.find().populate("user").populate("coach").sort({ created: -1 });

const getIdeasByUser = async (id) =>
  await Ideas.find({ user: id })
    .populate("user")
    .populate("coach")
    .sort({ created: -1 });

module.exports = {
  createIdea,
  getAllIdeas,
  getIdeasByUser,
};
