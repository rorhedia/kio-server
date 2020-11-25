const Coaches = require("../models/coaches");

const createCoach = async (coach) => await Coaches.create(coach);

const getCoaches = async () => await Coaches.find();

module.exports = {
  createCoach,
  getCoaches,
};
