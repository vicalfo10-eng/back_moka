const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { postLogin } = require('../controllers/authController')

const router = Router()

router.post( '/login', [
    check( 'correo', 'El correo es obligatorio.' ).isEmail(),
    check( 'contrasena', 'La contraseña es obligatoria.' ).not().isEmpty(),

    validationFiels
], postLogin )

module.exports = router