const { response } = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const getRoles = async (req, res = response) => {
    
    //const { correo, contrasena } = req.body

    try {
        const [rol] = await db.query(
            "SELECT * FROM roles WHERE activo = 1"
        )

        if (rol.length === 0)

            return res.status(400).json({
                status: 400,
                msg: "Roles no existe o esta inactivo." 
            })

        res.status(200).json({
            status: 200,
            msg: "Roles obtenidos correctamente",
            rol
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}

module.exports = {
    getRoles
}