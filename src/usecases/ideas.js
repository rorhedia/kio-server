const Ideas = require("../models/ideas");

const createIdea = async (idea) => await Ideas.create(idea);

module.exports = {
  createIdea,
};
