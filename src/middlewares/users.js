const yup = require("yup");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/users");
const { auth } = require("../usecases/users");

const { GG_CLIENT_ID, GG_CLIENT_SECRET } = process.env;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById({ _id: id }).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GG_CLIENT_ID,
      clientSecret: GG_CLIENT_SECRET,
      callbackURL: "https://htj-kio.herokuapp.com/auth/callback",
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
