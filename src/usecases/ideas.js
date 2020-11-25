const Ideas = require("../models/ideas");

const createIdea = async (idea) => await Ideas.create(idea);

const getAllIdeas = async () =>
  await Ideas.find({ active: { $ne: false } })
    .populate("user")
    .populate("coach")
    .sort({ created: -1 });

const getIdeasByUser = async (id) =>
  await Ideas.find({ user: id, active: { $ne: false } })
    .populate("user")
    .populate("coach")
    .sort({ created: -1 });

const getIdeasById = async (id) =>
  await Ideas.findById(id).populate("user").populate("coach");

const updateStatus = async (id, data) =>
  await Ideas.findByIdAndUpdate(id, data, { new: true });

const deleteIdea = async (id) =>
  await Ideas.findByIdAndUpdate(id, { active: false }, { new: true });

module.exports = {
  createIdea,
  getAllIdeas,
  getIdeasByUser,
  getIdeasById,
  updateStatus,
  deleteIdea,
};
