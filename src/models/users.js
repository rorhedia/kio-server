const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userRole = {
  values: ["admin", "user"],
  message: "Elige un rol válido",
};

const usersSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "El nombre es obligatorio",
    maxlength: 100,
    minlength: 5,
  },
  email: {
    type: String,
    required: "El correo es obligatorio",
    trim: true,
    unique: true,
    uniqueCaseInsensitive: true,
    match: [emailValidation, "Por favor ingresa un correo válido"],
  },
  picture: {
    type: String,
    trim: true,
    default: "",
  },
  googleId: {
    type: String,
    trim: true,
    unique: true,
    uniqueCaseInsensitive: true,
    default: "",
  },
  provider: {
    type: String,
    trim: true,
    default: "",
  },
  role: {
    type: String,
    enum: userRole,
    default: "user",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", usersSchema);
