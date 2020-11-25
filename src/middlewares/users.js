const yup = require("yup");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const { auth, getUserById } = require("../usecases/users");

const { GG_CLIENT_ID, GG_CLIENT_SECRET, CALLBACK_URL } = process.env;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getUserById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GG_CLIENT_ID,
      clientSecret: GG_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, provider, _raw, _json } = profile;

      const user = {
        name: _json.name,
        email: _json.email,
        picture: _json.picture,
        googleId: id,
        provider: provider,
      };

      const result = await auth(user);

      return done(null, result);
    }
  )
);

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
