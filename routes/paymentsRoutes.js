const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { postPayments } = require('../controllers/paymentsController')

const router = Router()

router.post('/payments/register', [
    check('installment_id', 'El código de la cuota es obligatorio y debe ser entero').isInt(),
    check('receivable_id', 'El código de la cuenta es obligatorio').isInt(),
    check('user_id', 'El ID de usuario es obligatorio').isInt(),
    check('amount', 'El monto debe ser un número decimal válido (ej: 100.50)')
        .isFloat({ min: 0.01 }), 
    check('payment_method', 'El método de pago es obligatorio')
        .not().isEmpty()
        .isLength({ max: 50 }),
    check('reference', 'El comprobante no puede exceder los 100 caracteres')
        .optional({ checkFalsy: true }) // Permite que sea null o string vacío
        .isLength({ max: 100 }),
    check('payment_date', 'La fecha de pago debe tener un formato válido (YYYY-MM-DD)')
        .isDate(),
    validationFiels
], postPayments)

module.exports = router