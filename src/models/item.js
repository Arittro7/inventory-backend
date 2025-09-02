module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    inventoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    custom_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    indexes: [
      { unique: true, fields: ['inventoryId', 'custom_id'] }
    ]
  });
  return Item;
};
