const express = require('express');
const router = express.Router();
const model = require('../Models/Models');

//router.use('../public',express.static('public'));

router.get('/', async (req, res) => {
    const la = await model.GetAllAuthors(); 
    res.render('../views/Home/Home',{listauthors : la});   //Trang chu khoa hoc
});

module.exports = router;