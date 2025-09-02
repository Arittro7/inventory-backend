module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  });
  return Tag;
};
