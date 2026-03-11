const { response } = require('express')
const db = require('../config/db')

const getCategoryStatus = async (req, res = response) => {
    
    try {
        const [category] = await db.query(
            "SELECT * FROM categorias WHERE activo = 1"
        )

        if (category.length === 0)

            return res.status(400).json({
                status: 400,
                msg: "Categorías no existe o esta inactivo." 
            })

        res.status(200).json({
            status: 200,
            msg: "Categorías obtenidas correctamente",
            category
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}

module.exports = {
    getCategoryStatus
}