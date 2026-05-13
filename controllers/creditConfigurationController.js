const { response } = require('express')
const db = require('../config/db')

const getCreditConfiguration = async (req, res = response) => {
    
    //const { correo, contrasena } = req.body

    try {
        const [creditConfiguration] = await db.query(
            "SELECT * FROM configuracion_creditos WHERE activo = 1"
        )

        if (creditConfiguration.length === 0)

            return res.status(400).json({
                status: 400,
                msg: "Configuración de créditos no existe o está inactiva." 
            })

        res.status(200).json({
            status: 200,
            msg: "Configuración de créditos obtenida correctamente",
            creditConfiguration
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}

module.exports = {
    getCreditConfiguration
}
