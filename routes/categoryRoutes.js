const { Router } = require('express')
const { check } = require('express-validator')

const { validationFiels } = require('../middlewares/validation-fields')
const { getCategoryRegister,
        getCategoryStatus,
        postCategoryRegister,
        putCategoryRegister,
        deleteCategoryRegister,} = require('../controllers/categoryController')

const router = Router()

router.get( '/category_register', [
    check( 'nombre', 'El nombre de la categoría es obligatorio.' ).not().isEmpty(),
], getCategoryRegister )

router.get( '/category_status', [], getCategoryStatus )

router.post( '/category_register', [
    check( 'nombre', 'El nombre de la categoría es obligatorio.' ).not().isEmpty(),
    validationFiels
], postCategoryRegister )

router.put( '/category_update', [
    check( 'id_categoria', 'El código de la categoría es obligatorio.' ).not().isEmpty(),
    check( 'nombre', 'El nombre de la categoría es obligatorio.' ).not().isEmpty(),
    validationFiels
], putCategoryRegister )

router.delete( '/category_delete', [
    check( 'id_categoria', 'El código de la categoría es obligatorio.' ).not().isEmpty(),
    validationFiels
], deleteCategoryRegister)

module.exports = router