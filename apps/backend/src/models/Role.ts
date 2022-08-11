import {
    Model,
    Optional
  } from 'sequelize';
  
  type UserAttributes = {
    id: number;
    role: string;
    role_name: string;
  }
  
  type UserCreationAttributes = Optional<UserAttributes, 'id'>;
  
  module.exports = (sequelize, DataTypes) => {
    class User extends Model<UserAttributes, UserCreationAttributes>{
        declare id: number;
        declare role: string;
        declare role_name: string;
  
      static associate(models) {
        User.belongsToMany(models.User, {
          through: 'UserRoles'
        });
      }
    }
    User.init({
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
      modelName: 'User',
    });
    return User;
  };