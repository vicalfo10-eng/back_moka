const { Router } = require('express')
const { check } = require('express-validator')

//const { validationFiels } = require('../middlewares/validation-fields')
const { getCategoryStatus } = require('../controllers/categoryController')

const router = Router()

router.get( '/category_status', [], getCategoryStatus )

module.exports = router