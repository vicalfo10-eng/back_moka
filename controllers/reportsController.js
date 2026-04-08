const { response } = require('express')
const db = require('../config/db')

const getRptSalesDate = async (req, res = response) => {

    const { fecha_inicio, fecha_fin } = req.query

    try {

        // Llamar procedimiento almacenado
        const [rows] = await db.query(
            "CALL sp_rpt_ventas_fechas(?, ?)",
            [ fecha_inicio, fecha_fin ]
        )

        const result = rows[0]

        // Construimos la respuesta unificada
        return res.status(200).json({
            ok: result.status === 200,
            result: result
        })
        
    } catch (error) {

        console.error("Error al obtener el reporte de ventas:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

module.exports = {
    getRptSalesDate
}
