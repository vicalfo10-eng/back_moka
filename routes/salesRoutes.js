const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { postRoles } = require('../controllers/salesController')

const router = Router()

router.post( '/sales_register', [
    check('id_usuario').isInt().withMessage('Código usuario no válido.'),
    check('id_cliente').isInt().withMessage('Código cliente no válido.'),
    check('tipo_pago').isIn(['CONTADO', 'CREDITO']).withMessage('Tipo de pago inválido [CONTADO, CREDITO].'),
    check('detalles').isArray({ min: 1 }).withMessage('Debe incluir al menos un producto para la venta.'),
    check('id_config')
        .if(check('tipo_pago').equals('CREDITO'))
        .notEmpty().withMessage('El plan de crédito es obligatorio.')
        .isInt().withMessage('El código plan debe ser un número.'),
    check('fecha_primer_pago')
        .if(check('tipo_pago').equals('CREDITO'))
        .notEmpty().withMessage('Fecha de primer pago es obligatoria.')
        .isISO8601().withMessage('Formato de fecha inválido (YYYY-MM-DD).'),
    validationFiels
], postRoles )

module.exports = router