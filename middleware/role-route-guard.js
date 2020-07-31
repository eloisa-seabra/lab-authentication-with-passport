function roleRouteGuard(roles) {
  return function (req, res, next) {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      next(new Error('User is not authorized.'));
    }
  };
}

module.exports = roleRouteGuard;
