const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductbyID);
router.post('/', productController.createProduct);
router.put('/', productController.updateProduct);
router.put('/:id', productController.updateProduct);
router.delete('/', productController.deleteProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
