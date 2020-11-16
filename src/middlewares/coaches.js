const yup = require("yup");

function formValidation(req, res, next) {
  try {
    yup
      .object()
      .shape({
        name: yup
          .string("Solo se aceptan letras en el nombre")
          .min(3, "Mínimo 3 caracteres")
          .max(60)
          .matches(/^[a-zA-Z]+$/, "Solo se aceptan letras en el nombre")
          .required("El nombre es obligatorio"),
        lastname: yup
          .string("Solo se aceptan letras en el nombre")
          .min(3, "Mínimo 3 caracteres")
          .max(60)
          .matches(/^[a-zA-Z]+$/, "Solo se aceptan letras en el apellido")
          .required("El apellido es obligatorio"),
        email: yup
          .string("Formato de correo inválido")
          .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Formato de correo inválido"
          )
          .required("El correo es obligatorio"),
        age: yup
          .string()
          .matches(/^[0-9]+$/, "Solo se aceptan números")
          .max(2, "Máximo 2 caracteres"),
      })
      .validateSync(req.body);

    next();
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: {
        name: error.name,
        message: error.message,
        path: error.path,
      },
    });
  }
}

module.exports = { formValidation };
