const { response } = require('express')
const db = require('../config/db')

const getSalesExpirationDate = async (req, res) => {

    const { id_venta } = req.query

    try {

        const [rows] = await db.query(
            "CALL sp_obtener_vencimiento_venta(?)",
            [id_venta]
        )
        
        const result = rows[0][0]

        if (result.ok) {

            res.status(200).json({
                status: 200,
                result
            })
        } else {

            res.status(400).json({
                status: 400,
                result
            })
        }

    } catch (error) {
        console.error("Error en la fecha último pago:", error)
        res.status(500).json({
            ok: false,
            msg: "Error de servidor al obtener la fecha de último pago"
        })
    }
}

const postSales = async (req, res = response) => {

    const { id_usuario, id_cliente, tipo_pago, id_config, fecha_primer_pago, detalles } = req.body

    try {

        const idConfig = (tipo_pago === 'CONTADO' || !id_config) ? null : parseInt(id_config);
        const fPrimerPago = (tipo_pago === 'CONTADO' || !fecha_primer_pago) ? null : fecha_primer_pago;

        // Ejecutamos el SP enviando el array de objetos como un string JSON
        const [rows] = await db.query(
            "CALL sp_registrar_venta(?, ?, ?, ?, ?, ?)",
            [
                id_usuario,
                id_cliente,
                tipo_pago,
                idConfig,
                fPrimerPago,
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
    getSalesExpirationDate,
    postSales
}