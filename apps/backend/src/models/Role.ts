  const Role = (sequelize, DataTypes) => {
    sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          role: {
            type: DataTypes.STRING(255),
            defaultValue: null
          },
          role_name: {
            type: DataTypes.STRING(255),
            allowNull: false
          }
        });
    return Role;
  };

  module.exports = Role;