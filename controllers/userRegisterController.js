const { response } = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const postUserRegister = async (req, res = response) => {

    const { id_rol, identificacion, nombre, correo, contrasena } = req.body;

    try {

        // Hash de contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_registrar_usuario(?, ?, ?, ?, ?)",
            [id_rol, identificacion, nombre, correo, hashedPassword]
        );

        const result = rows[0][0]; // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            msg: result.msg
        });

    } catch (error) {
        console.error("Error registrando usuario:", error);

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
}

module.exports = {
    postUserRegister
}
