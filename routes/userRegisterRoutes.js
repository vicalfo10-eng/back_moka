const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { 
        getUserRegister,
        postUserRegister,
        putUserRegister } = require('../controllers/userRegisterController')

const router = Router()

router.get( '/user_register', [
    check( 'identificacion', 'El número de documento es obligatorio.' ).not().isEmpty(),
    validationFiels
], getUserRegister)

router.post( '/user_register', [
    check( 'id_rol', 'El rol es obligatorio.' ).not().isEmpty(),
    check( 'identificacion', 'El número de documento es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    check( 'correo', 'El correo es obligatorio.' ).isEmail(),
    check( 'contrasena', 'La contraseña es obligatoria.' ).not().isEmpty(),
    check( 'contrasena', 'Mínimo 6 caracteres.' ).isLength({ min: 6 }),
    validationFiels
], postUserRegister )

router.put( '/user_update', [
    check( 'identificacion', 'El número de documento es obligatorio.' ).not().isEmpty(),
    check( 'id_rol', 'El rol es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    check( 'correo', 'El correo es obligatorio.' ).isEmail(),
    check( 'activo', 'El estado es obligatorio.' ).not().isEmpty(),
    validationFiels
], putUserRegister )

module.exports = router