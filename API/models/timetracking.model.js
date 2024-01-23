module.exports = (sequelize, Sequelize) => {
  const Timetracking = sequelize.define('Timetracking', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id',
      },
    },
    tracking_start: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    tracking_stop: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  });

  Timetracking.belongsTo(sequelize.models.Users, { foreignKey: 'user_id' });

  return Timetracking;
};
  