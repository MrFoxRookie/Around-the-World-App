const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).send({ message: "Usuario no autorizado" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: "Usuario no autorizado" });
  }
  req.user = payload;
  next();
};
