const UserRoles = (sequelize, DataTypes) => {
sequelize.define('UserRoles', {
    userId: {
      type: DataTypes.INTEGER
    },
    roleId: {
      type: DataTypes.INTEGER
    }
  });
}
module.exports = UserRoles;