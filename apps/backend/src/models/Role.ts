import {
    Model,
    Optional
  } from 'sequelize';
  
  type RoleAttributes = {
    id: number;
    role: string;
    role_name: string;
  }
  
  type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;
  
  module.exports = (sequelize, DataTypes) => {
    class Role extends Model<RoleAttributes, RoleCreationAttributes>{
        declare id: number;
        declare role: string;
        declare role_name: string;
  
      static associate(models) {
        Role.belongsToMany(models.User, {
          through: 'UserRoles'
        });
      }
    }
    Role.init({
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
        },
    {
      sequelize,
      modelName: 'Role',
    });
    return Role;
  };