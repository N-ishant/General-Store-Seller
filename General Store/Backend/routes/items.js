const express = require("express");
const router = express.Router();

const itemController = require('../controllers/items')

router.get('/get-items', itemController.getAllItems)
router.post('/add-item', itemController.postAddItem)
router.delete('/delete-item/:id', itemController.deleteItem)
router.put('/edit-item/:id', itemController.editItem)

module.exports = router;