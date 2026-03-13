const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { getProductRegister,
        getProductStatus,
        postProductRegister,
        putProductRegister,
        deleteProductRegister } = require('../controllers/productsController')

const router = Router()

router.get( '/product_register', [
    check( 'codigo', 'El código es obligatorio.' ).not().isEmpty(),
    validationFiels
], getProductRegister)

router.get( '/product_status', [], getProductStatus )

router.post( '/product_register', [
    check( 'id_categoria', 'La categoría es obligatorio.' ).not().isEmpty(),
    check( 'id_proveedor', 'El proveedor es obligatorio.' ).not().isEmpty(),
    check( 'codigo', 'El código es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    check('precio')
        .not().isEmpty().withMessage('El precio es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número decimal mayor o igual a cero.'),
    check('impuesto')
        .not().isEmpty().withMessage('El impuesto es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El impuesto debe ser un número decimal mayor o igual a cero.'),
    check('stock')
        .not().isEmpty().withMessage('El stock es obligatorio.')
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a cero.'),
    check('stock_minimo')
        .not().isEmpty().withMessage('El stock mínimo es obligatorio.')
        .isInt({ min: 0 }).withMessage('El stock mínimo debe ser un número entero mayor o igual a cero.'),
    validationFiels
], postProductRegister )

router.put( '/product_update', [
    check( 'id_categoria', 'La categoría es obligatorio.' ).not().isEmpty(),
    check( 'id_proveedor', 'El proveedor es obligatorio.' ).not().isEmpty(),
    check( 'codigo', 'El código es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    check('precio')
        .not().isEmpty().withMessage('El precio es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número decimal mayor o igual a cero.'),
    check('impuesto')
        .not().isEmpty().withMessage('El impuesto es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El impuesto debe ser un número decimal mayor o igual a cero.'),
    check('stock')
        .not().isEmpty().withMessage('El stock es obligatorio.')
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a cero.'),
    check('stock_minimo')
        .not().isEmpty().withMessage('El stock mínimo es obligatorio.')
        .isInt({ min: 0 }).withMessage('El stock mínimo debe ser un número entero mayor o igual a cero.'),
    validationFiels
], putProductRegister )

router.delete( '/product_delete', [
    check( 'codigo', 'El código es obligatorio.' ).not().isEmpty(),
    validationFiels
], deleteProductRegister)

module.exports = router