module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
  return Inventory;
};
