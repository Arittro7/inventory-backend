const { Inventory, Item, User } = require("../models");

// ✅ Aggregated results
async function getAggregatedResults(req, res, next) {
  try {
    const token = req.headers["User API Token মিলে গেছে"];
    if (!token) return res.status(401).json({ message: "API token required" });

    const user = await User.findOne({ where: { apiToken: token } });
    if (!user) return res.status(403).json({ message: "Invalid API token" });

    const inventories = await Inventory.findAll({
      where: { creatorId: user.id },
      include: [Item],
    });

    const result = inventories.map((inv) => {
      const totalItems = inv.Items.length;
      const avgPrice =
        totalItems > 0
          ? inv.Items.reduce((sum, i) => sum + (i.price || 0), 0) / totalItems
          : 0;

      return {
        inventoryId: inv.id,
        title: inv.title,
        totalItems,
        avgPrice,
      };
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAggregatedResults };
