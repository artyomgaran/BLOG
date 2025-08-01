module.exports = function (roles) {
  return (req, res, next) => {
    if (!req.user) {
      res.send({ error: "Unauthorized: no user" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.send({ error: "Access denied" });
      return;
    }

    next();
  };
};
