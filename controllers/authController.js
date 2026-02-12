const { response } = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const postLogin = async (req, res = response) => {
    
    const { correo, contrasena } = req.body

    try {
        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE correo = ? AND activo = 1",
            [correo]
        )

        if (rows.length === 0)

            return res.status(400).json({
                status: 400,
                msg: "Usuario no existe o esta inactivo." 
            })

        const usuario = rows[0]

        const valido = await bcrypt.compare(contrasena, usuario.contrasena)

        if (!valido)
            return res.status(400).json({
                status: 400, 
                msg: "Contraseña incorrecta."
            });

        res.status(200).json({
            status: 200,
            msg: "Login correcto",
            usuario: usuario.nombre,
            Correo: usuario.correo
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}

module.exports = {
    postLogin
}
