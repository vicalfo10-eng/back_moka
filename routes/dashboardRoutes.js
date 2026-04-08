const { Router } = require('express')
//const { check } = require('express-validator')

//const { validationFiels } = require('../middlewares/validation-fields')
const { getKpis, getcharts } = require('../controllers/dashboardController')

const router = Router()

router.get( '/dashboard_kpis', [], getKpis )

router.get( '/dashboard_charts', [], getcharts )

module.exports = router