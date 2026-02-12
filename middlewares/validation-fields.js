const { validationResult } = require('express-validator')

const validationFiels = ( req, res, next ) => {
    
    const errors = validationResult( req )
    if( !errors.isEmpty() ){

        return res.status(400).json({
            status: 400,
            empty: true,
            data: errors,
        })

    }

    next()
}

module.exports = {
    validationFiels
}