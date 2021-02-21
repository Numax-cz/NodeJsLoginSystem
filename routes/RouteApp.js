const express = require('express');
const router = express.Router();
const connection = require('../DatabaseConnection');









router.get('/new', (req, res) => {
    res.render('blog/new');
})


module.exports = router;