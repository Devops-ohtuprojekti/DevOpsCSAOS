const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Survey, Question_answer }) {
      // define association here
      this.belongsTo(Category, { foreignKey: 'categoryId' })
      this.belongsTo(Survey, { foreignKey: 'surveyId' })
      this.hasMany(Question_answer, { foreignKey: 'questionId' })
    }
  }
  Question.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question must have text' },
          notEmpty: { msg: "Question text can't be empty" },
        },
      },
      surveyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question must have surveyId' },
          notEmpty: { msg: "Question surveyId can't be empty" },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question must have categoryId' },
          notEmpty: { msg: "Question categoryId can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: 'Question',
    }
  )
  return Question
}
