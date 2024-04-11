const Item = require("../models/item");

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.status(200).json({ allItems: items });
  } catch (err) {
    console.log("Get Item is failing", JSON.stringify(err));
    res.status(500).json({ error: err });
  }
};

exports.postAddItem = async (req, res, next) => {
  try {
    const itemName = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const newItem = await Item.create({
      itemName: itemName,
      description: description,
      price: price,
      quantity: quantity,
    });

    res.status(201).json({ newUserItem: newItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    if (itemId == "undefined") {
      console.log("ID is missing");
      res.status(400).json({ err: "ID is missing" });
    }
    await Item.destroy({ where: { id: itemId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }
};

exports.editItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const updatedItemName = req.body.itemName;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const updatedQuantity = req.body.quantity;

    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.itemName = updatedItemName;
    item.description = updatedDescription;
    item.price = updatedPrice;
    item.quantity = updatedQuantity;

    const result = await item.save();
    console.log("UPDATED ITEM!");

    res
      .status(200)
      .json({ message: "Item updated successfully", item: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};