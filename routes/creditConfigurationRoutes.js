const { Router } = require('express')
//const { check } = require('express-validator')

//const { validationFiels } = require('../middlewares/validation-fields')
const { getCreditConfiguration } = require('../controllers/creditConfigurationController')

const router = Router()

router.get( '/credit_configuration', [], getCreditConfiguration )

module.exports = router