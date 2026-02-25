const { response } = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const postCustomerRegister = async (req, res = response) => {

    const { identificacion, nombre, telefono, correo, activo } = req.body;

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_registrar_cliente(?, ?, ?, ?, ?)",
            [ identificacion, nombre, telefono, correo, activo ]
        );

        const result = rows[0][0]; // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            msg: result.msg
        });

    } catch (error) {
        console.error("Error registrando cliente:", error);

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
}

module.exports = {
    postCustomerRegister
}
