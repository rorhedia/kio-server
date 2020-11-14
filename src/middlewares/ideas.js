const yup = require("yup");

function formValidation(req, res, next) {
  try {
    yup
      .object()
      .shape({
        name: yup
          .string("Solo se aceptan letras en el nombre de la idea")
          .min(3, "El nombre debe contener almenos 3 letras")
          .max(60)
          .required("Debe agregar el nombre de la idea"),
        description: yup
          .string("No se aceptan caracteres extraños"),
        effect: yup
          .string("No se aceptan caracteres extraños"),
        image: yup.string("No se aceptan caracteres extraños"),
        file: yup.string("No se aceptan caracteres extraños"),
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
