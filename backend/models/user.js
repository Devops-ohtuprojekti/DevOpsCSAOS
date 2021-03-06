const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User_answer, Survey_user_group, Industry }) {
      // define association here
      this.hasMany(User_answer, { foreignKey: 'userId' })
      this.belongsTo(Survey_user_group, { foreignKey: 'groupId' })
      this.belongsTo(Industry, { foreignKey: 'industryId' })
    }
    // eslint-disable-next-line prettier/prettier
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: { msg: "Email can't be empty" },
          isEmail: { msg: 'Provided info must be a valid email address' },
        },
      },
      groupId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      industryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
