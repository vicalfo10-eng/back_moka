const { response } = require('express');
const db = require('../config/db');

const getSupplierRegister = async (req, res = response) => {

    const { identificacion } = req.query;

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_obtener_proveedor(?)",
            [ identificacion ]
        )

        const result = rows[0][0] // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            result: result
        })
        
    } catch (error) {

        console.error("Error obteniendo el proveedor:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const postSupplierRegister = async (req, res = response) => {

    const { identificacion, nombre, telefono, correo, direccion, activo } = req.body

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_registrar_proveedor(?, ?, ?, ?, ?, ?)",
            [ identificacion, nombre, telefono, correo, direccion, activo ]
        )

        const result = rows[0][0]; // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 201,
            msg: result.msg
        })

    } catch (error) {
        console.error("Error registrando el proveedor:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const putSupplierRegister = async (req, res = response) => {

    const { identificacion, nombre, telefono, correo, direccion, activo } = req.body

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_actualizar_proveedor(?, ?, ?, ?, ?, ?)",
            [ identificacion, nombre, telefono, correo, direccion, activo ]
        )

        const result = rows[0][0]; // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            msg: result.msg
        })

    } catch (error) {
        console.error("Error actualizando el proveedor:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const deleteSupplierRegister = async (req, res = response) => {

    const { identificacion } = req.query;

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_eliminar_proveedor(?)",
            [ identificacion ]
        )

        const result = rows[0][0] // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 200,
            result: result
        })
        
    } catch (error) {

        console.error("Error eliminando el proveedor:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

module.exports = {
    getSupplierRegister,
    postSupplierRegister,
    putSupplierRegister,
    deleteSupplierRegister
}
