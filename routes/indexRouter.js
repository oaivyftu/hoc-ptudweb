const express = require('express')
let router = express.Router();

router.get('/', (req, res, next) => {
    const categoryController = require('../controllers/categoryController')
    categoryController.getAll()
        .then(data => {
            res.locals.categories = data
            res.render('index')
        })
        .catch(error => next(error))
})
module.exports = router;