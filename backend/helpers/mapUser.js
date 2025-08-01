module.exports = function User(user) {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    registerAt: user.createdAt,
  };
};
