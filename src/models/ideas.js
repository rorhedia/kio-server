const mongoose = require("mongoose");
const { Schema } = mongoose;

const statusList = {
  values: ["Aprobado", "Rechazado", "Pendiente"],
  message: "Elige un rol válido",
};

const ideasSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  coach: {
    type: mongoose.Types.ObjectId,
    ref: "coaches",
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: "Debe agregar el nombre de la idea",
    maxlength: 60,
    minlength: 3,
  },
  description: {
    type: String,
    required: "Debe describir la idea",
    trim: true,
    minlength: 20,
  },
  effect: {
    type: String,
    required: "Debe describir el impacto de la idea",
    trim: true,
    minlength: 20,
  },
  image: {
    type: String,
  },
  file: {
    type: String,
  },
  status: {
    type: String,
    enum: statusList,
    default: "Pendiente",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ideas", ideasSchema);
