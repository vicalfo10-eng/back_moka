const { Router } = require('express')
const { check } = require('express-validator')

//const { validationFiels } = require('../middlewares/validation-fields')
const { getRoles } = require('../controllers/rolesController')

const router = Router()

router.get( '/roles', [], getRoles )

module.exports = router