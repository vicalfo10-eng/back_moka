const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { getSupplierRegister, postSupplierRegister, putSupplierRegister, deleteSupplierRegister } = require('../controllers/suppliersRoutes')

const router = Router()

router.get( '/supplier_register', [
    check( 'identificacion', 'El número de identificación es obligatorio.' ).not().isEmpty(),
    validationFiels
], getSupplierRegister)

router.post( '/supplier_register', [
    check( 'identificacion', 'El número de identificación es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    validationFiels
], postSupplierRegister )

router.put( '/supplier_update', [
    check( 'identificacion', 'El número de identificación es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    validationFiels
], putSupplierRegister )

router.delete( '/supplier_delete', [
    check( 'identificacion', 'El número de identificación es obligatorio.' ).not().isEmpty(),
    validationFiels
], deleteSupplierRegister)

module.exports = router