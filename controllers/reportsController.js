const { response } = require('express')
const db = require('../config/db')

const getRptSalesDate = async (req, res = response) => {

    const { tipo, fecha_inicio, fecha_fin, pagina } = req.query
    let query = ''
    let params = []

    const page = parseInt(pagina) || 1
    const limit = 10

    try {

        switch (tipo) {

            case 'VENTAS_FECHAS':
                query = 'CALL sp_rpt_ventas_fechas(?, ?, ?, ?)'
                params = [
                            fecha_inicio,
                            fecha_fin,
                            page,
                            limit
                        ]
                break

            case 'STOCK_BAJO':
                query = 'CALL sp_rpt_stock_bajo(?, ?)'
                params = [
                            page,
                            limit
                        ]
                break

            case 'MAS_VENDIDOS':
                query = 'CALL sp_rpt_top_vendidos()'
                break
        }

        const [result] = await db.query(query, params);

        return res.status(200).json({
            ok: result.status === 200,
            result: result[0]
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
