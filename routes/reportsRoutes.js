const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { getRptSalesDate } = require('../controllers/reportsController')

const router = Router()

router.get( '/sales-by-date', [], getRptSalesDate )

module.exports = router