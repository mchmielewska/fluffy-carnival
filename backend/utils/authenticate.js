var jwt = require('jsonwebtoken');
let config;
try {
  config = require('../config');
} catch (e) {
  if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("Can't load config (skipping)");
  else
      throw e;
}

exports.verifyToken = (req, res, next) => {
  var token = req.headers['token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SERVER_SECRET || config.server.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });

    loggedUserId = decoded.id;
    next();
  });
};
