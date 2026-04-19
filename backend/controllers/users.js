const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const ForbiddenError = require("../errors/forbidden-error");
const ConflictError = require("../errors/conflict-error");

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}; //Verificado

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError("Id no coincide con ningún usuario"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Formato del Id inválido"));
      }
      return next(err);
    });
}; //Verificado//

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError(
            "Formato para la información del usuario invalido"
          )
        );
      }
      if (err.code === 11000) {
        return next(new ConflictError("El email ya está registrado"));
      }
      return next(err);
    });
}; //Verificado//

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  )
    .orFail(() => new NotFoundError("Id no coincide con ningún usuario"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Formato del Id inválido"));
      }
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("Datos inválidos para actualizar el usuario")
        );
      }
      return next(err);
    });
}; //Verificado//

module.exports.updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  )
    .orFail(() => new NotFoundError("Id no coincide con ningún usuario"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Formato del Id inválido"));
      }
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("El formato del link del avatar es inválido")
        );
      }
      return next(err);
    });
}; //Verificado//

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new UnauthorizedError("Contraseña o correo electrónico incorrecto")
      );
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(
        new UnauthorizedError("Contraseña o correo electrónico incorrecto")
      );
    }
    const token = jwt.sign({ _id: user._id }, "string-random", {
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (err) {
    return next(err);
  }
}; //Verificado//

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("Usuario inexistente"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Formato del Id inválido"));
      }
      return next(err);
    });
}; //Verificado
