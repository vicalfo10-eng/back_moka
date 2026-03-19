const { Router } = require('express')
const { check } = require('express-validator')

//const { validationFiels } = require('../middlewares/validation-fields')
const { postRoles } = require('../controllers/salesController')

const router = Router()

router.post( '/sales_register', [], postRoles )

module.exports = router