const Coaches = require("../models/coaches");

const createCoach = async (coach) => await Coaches.create(coach);

module.exports = {
  createCoach,
};
