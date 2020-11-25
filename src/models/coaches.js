const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const coachesSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "El nombre es obligatorio",
    maxlength: 60,
    minlength: 3,
  },
  lastname: {
    type: String,
    trim: true,
    required: "El apellido es obligatorio",
    maxlength: 60,
    minlength: 3,
  },
  email: {
    type: String,
    required: "El correo es obligatorio",
    trim: true,
    unique: true,
    uniqueCaseInsensitive: true,
    match: [emailValidation, "Por favor ingresa un correo válido"],
  },
  age:{
    type:Number,
    maxlength: 2,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("coaches", coachesSchema);
