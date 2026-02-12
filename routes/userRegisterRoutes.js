const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { postUserRegister } = require('../controllers/userRegisterController')

const router = Router()

router.post( '/user_register', [
    check( 'id_rol', 'El rol es obligatorio.' ).not().isEmpty(),
    check( 'identificacion', 'El número de documento es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    check( 'correo', 'El correo es obligatorio.' ).isEmail(),
    check( 'contrasena', 'La contraseña es obligatoria.' ).not().isEmpty(),
    check( 'contrasena', 'Mínimo 6 caracteres.' ).isLength({ min: 6 }),
    validationFiels
], postUserRegister )

module.exports = router