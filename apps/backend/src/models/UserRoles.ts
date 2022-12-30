import {
  Model,
  Optional
} from 'sequelize';

type UserRoleAttributes = {
  id: number;
  user_id: number;
  role_id: number;
}

type UserRoleCreationAttributes = Optional<UserRoleAttributes, 'id'>;

export default (sequelize, DataTypes) => {
  class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes>{
      declare id: number;
      declare user_id: number;
      declare role_id: number;
    }
    UserRole.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false
      },
      role_id: {
        type: DataTypes.INTEGER(10),
        defaultValue: null
      }
    },
  {
    sequelize,
    modelName: 'UserRole',
    timestamps: false,
    underscored: true
  });
  return UserRole;
}; 