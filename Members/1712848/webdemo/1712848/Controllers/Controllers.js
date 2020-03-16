const express = require('express');
const router = express.Router();
const model = require('../Models/Models');

router.get('/', async (req, res) => {
    res.render('home'); 
});
router.get('/category/:IDcate', async (req, res) => {
    const lp = await model.GetAllProductsByCategory(req.params.IDcate); // xuất ra danh sách sản phẩm theo mã loại hàng
    res.render('categoryproduct',{listproducts : lp});
});
router.get('/detail/:IDproduct', async (req, res) => {
    const dtprod = await model.GetDetailProductByID(req.params.IDproduct); //trả về chi tiết một sản phẩm
    res.render('DetailProducts',{DetailProduct : dtprod[0]});
});

module.exports = router;