const User = (sequelize, DataTypes) => {

  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      defaultValue: ''
    },
    password: { 
      type: DataTypes.STRING(45),
      defaultValue: null
    },
    realname: { 
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    date_created:{
      type: DataTypes.DATE,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    profile: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: false
    },
    creation_session: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sign_prefix: {
      type: DataTypes.CHAR(5),
      allowNull: false
    },
  });
  return User;
};

module.exports = User;