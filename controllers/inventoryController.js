const { response } = require('express')
const db = require('../config/db')

const getInventoryRegister = async (req, res = response) => {

    const { codigo, pagina } = req.query
    const page = parseInt(pagina) || 1
    const limit = 10

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_obtener_historial_inventario(?, ?, ?)",
            [
                codigo,
                page,
                limit
            ]
        )

        const result = rows[0] // Resultado del SELECT dentro del SP

        return res.status(200).json({
            result: result
        })
        
    } catch (error) {

        console.error("Error obteniendo el producto:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const postInventoryRegister = async (req, res = response) => {

    const { id_producto, id_usuario, tipo, cantidad, descripcion } = req.body

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_registrar_inventario(?, ?, ?, ?, ?)",
            [ 
                parseInt(id_producto),
                parseInt(id_usuario),
                tipo,
                parseInt(cantidad),
                descripcion
            ]
        )

        const result = rows[0][0]; // Resultado del SELECT dentro del SP

        return res.status(result.status).json({
            ok: result.status === 201,
            msg: result.msg
        })

    } catch (error) {
        console.error("Error registrando el inventario:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

module.exports = {
    getInventoryRegister,
    postInventoryRegister
}
