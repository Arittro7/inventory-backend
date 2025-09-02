module.exports = (sequelize, DataTypes) => {
  const ItemTag = sequelize.define('ItemTag', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    itemId: { type: DataTypes.UUID, allowNull: false },
    tagId: { type: DataTypes.UUID, allowNull: false }
  }, {
    indexes: [
      { unique: true, fields: ['itemId', 'tagId'] }
    ]
  });
  return ItemTag;
};
