const yup = require("yup");

function authValidation(req, res, next) {
  try {
    yup
      .object()
      .shape({
        name: yup
          .string("Solo se aceptan letras en el nombre")
          .min(5, "El nombre debe contener almenos 5 letras")
          .max(100)
          .matches(/^[a-zA-Z]+$/, "Solo se aceptan letras en el nombre")
          .required("El nombre es obligatorio"),
        email: yup
          .string("Formato de correo inválido")
          .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Formato de correo inválido"
          )
          .required("El correo es obligatorio"),
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

module.exports = { authValidation };
