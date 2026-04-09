const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { getRptSalesDate } = require('../controllers/reportsController')

const router = Router()

router.get( '/sales-by-date', [
    check( 'tipo')
        .not().isEmpty().withMessage('El tipo de reporte es obligatorio.')
        .isIn(['VENTAS_FECHAS', 'STOCK_BAJO', 'MAS_VENDIDOS']).withMessage('Tipo de reporte no válido.'),
    check( 'fecha_inicio')
        .if(check('tipo').custom(val => ['VENTAS_FECHAS'].includes(val)))
        .not().isEmpty().withMessage('La fecha de inicio es obligatoria.')
        .isDate().withMessage('La fecha de inicio debe tener formato YYYY-MM-DD.'),
    check( 'fecha_fin')
        .if(check('tipo').custom(val => ['VENTAS_FECHAS'].includes(val)))
        .not().isEmpty().withMessage('La fecha de fin es obligatoria.')
        .isDate().withMessage('La fecha de fin debe tener formato YYYY-MM-DD.')
        .custom((value, { req }) => {
            if (new Date(value) < new Date(req.query.fecha_inicio)) {

                throw new Error('La fecha fin no puede ser anterior a la fecha de inicio')
            }

            return true
        }),
    validationFiels
], getRptSalesDate )

module.exports = router