const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { getCustomerRegister, postCustomerRegister, putCustomerRegister, deleteCustomerRegister } = require('../controllers/customersController')

const router = Router()

router.get( '/customer_register', [
    check( 'identificacion', 'El número de identificación es obligatorio.' ).not().isEmpty(),
    validationFiels
], getCustomerRegister)

router.post( '/customer_register', [
    check( 'identificacion', 'El número de identificación es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    check( 'telefono', 'El teléfono es obligatorio.' ).not().isEmpty(),
    check( 'correo', 'El correo es obligatorio.' ).isEmail(),
    validationFiels
], postCustomerRegister )

router.put( '/customer_update', [
    check( 'identificacion', 'El número de identificación es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    check( 'telefono', 'El teléfono es obligatorio.' ).not().isEmpty(),
    check( 'correo', 'El correo es obligatorio.' ).isEmail(),
    validationFiels
], putCustomerRegister )

router.delete( '/customer_delete', [
    check( 'identificacion', 'El número de identificación es obligatorio.' ).not().isEmpty(),
    validationFiels
], deleteCustomerRegister)

module.exports = router