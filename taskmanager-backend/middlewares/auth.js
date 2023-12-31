const jwtService = require("../services/jwtService");
const userService = require("../services/userService");

module.exports = {
  ensureAuth(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization)
      return res
        .status(401)
        .json({ message: "Não autorizado: nenhum token foi encontrado." });

    const token = authorization.replace(/Bearer /, "");

    jwtService.verifyToken(token, async (err, decoded) => {
      if (err || typeof decoded === "undefined")
        return res
          .status(401)
          .json({ message: "Não autorizado: token inválido." });

      const user = await userService.findUser(decoded.email);
      req.user = user;
      next();
    });
  },
};
