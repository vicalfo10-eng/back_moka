const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { getInventoryRegister, postInventoryRegister } = require('../controllers/inventoryController')

const router = Router()

router.get( '/inventory_movements', [
    check( 'codigo', 'El código del producto es obligatorio.' ).not().isEmpty(),
    validationFiels
], getInventoryRegister )

router.post( '/inventory_register', [
    check( 'id_producto', 'El producto es obligatorio.' ).not().isEmpty(),
    check( 'id_usuario', 'El usuario es obligatorio.' ).not().isEmpty(),
    check('tipo')
        .not().isEmpty().withMessage('El tipo es obligatorio.')
        .isIn(['ENTRADA', 'SALIDA']).withMessage('El tipo debe ser ENTRADA o SALIDA.'),
    check('cantidad')
        .not().isEmpty().withMessage('La cantidad es obligatoria.')
        .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero mayor o igual a cero.'),
    validationFiels
], postInventoryRegister )

module.exports = router