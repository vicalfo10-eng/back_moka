const { response } = require('express')
const db = require('../config/db')

const postRoles = async (req, res = response) => {

    const { id_usuario, id_cliente, detalles } = req.body

    try {

        // Ejecutamos el SP enviando el array de objetos como un string JSON
        const [rows] = await db.query(
            "CALL sp_registrar_venta(?, ?, ?)",
            [
                id_usuario,
                id_cliente,
                JSON.stringify(detalles)
            ]
        )

        const sale = rows[0][0]

        if (sale.ok) {

            res.status(201).json({
                status: 201,
                sale
            })
        } else {

            res.status(400).json({
                status: 400,
                sale
            })
        }

    } catch (error) {
        console.error("Error en la Venta:", error)
        res.status(500).json({
            ok: false,
            msg: "Error de servidor al procesar la venta"
        })
    }
}

module.exports = {
    postRoles
}