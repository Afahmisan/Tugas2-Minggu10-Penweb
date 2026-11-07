const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductbyID);
router.post('/', productController.createProduct);
router.put('/', productController.updateProduct);
router.put('/:id', productController.updateProduct);

module.exports = router;
