const { Model, DataTypes } = require("sequelize");
const bycrpt = require("bcrypt");
const sequelize = require("../config/connection");

// User model
class User extends Model {
  checkPassword(loginPw) {
    return bycrpt.compareSync(loginPw, this.password);
  }
}

// User model data
ser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
        notContains: this.email,
        notContains: this.username,
        // is: /^[a-z]+$/i // add regex for complex password
      },
    },
  },
  {
    hooks: {
      // beforeCreate hash password
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //   beforeUpdate hash password
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
