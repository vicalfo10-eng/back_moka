const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { getReceivables,
        getInstallments } = require('../controllers/receivablesController')

const router = Router()

router.get( '/receivables/search', [
    check('id_cliente').isInt().withMessage('Código cliente no válido.'),
    check('id_venta').isInt().withMessage('Código venta no válido.'),
    validationFiels
], getReceivables )

router.get( '/receivables/installments', [
    check('id_cxc').isInt().withMessage('Código cuenta por cobrar no válido.'),
    validationFiels
], getInstallments )

module.exports = router