const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const ForbiddenError = require("../errors/forbidden-error");
const ConflictError = require("../errors/conflict-error");

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate("owner")
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}; //Verificado//

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Datos inválidos"));
      }
      return next(err);
    });
}; //Verificado//

module.exports.removeCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError("Id no coincide con ninguna carta"))
    .then((card) => {
      if (card.owner.toString() !== userId) {
        return next(
          new ForbiddenError(
            "No tienes los permisos necesarios para eliminar esta tarjeta",
          ),
        );
      }
      return Card.findByIdAndDelete(req.params.cardId).then(() => {
        res.send({ data: card });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Formato del Id inválido"));
      }
      return next(err);
    });
}; //Verificado//

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Id no coincide con ninguna carta"))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Formato del Id inválido"));
      }
      return next(err);
    });
}; //Verificado//

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Id no coincide con ninguna carta"))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Formato del Id inválido"));
      }
      return next(err);
    });
}; //Verificado
