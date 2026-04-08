const { response } = require('express')
const db = require('../config/db')

const getKpis = async (req, res = response) => {

    try {

        // Ejecutamos las 3 consultas en paralelo para mayor velocidad
        const [ventas] = await db.query('CALL sp_kpi_ventas_mes()')
        const [stock] = await db.query('CALL sp_kpi_stock_total()')
        const [movimientos] = await db.query('CALL sp_kpi_movimientos_hoy()')

        // Construimos la respuesta unificada
        return res.status(200).json({
            ventas_mes: ventas[0][0].total,
            stock_total: stock[0][0].total,
            movimientos_hoy: movimientos[0][0].total
        });
        
    } catch (error) {

        console.error("Error al obtener los KPIs:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

const getcharts = async (req, res = response) => {

    try {

        // Ejecutamos las 3 consultas en paralelo para mayor velocidad
        const [ventas] = await db.query('CALL sp_kpi_grafico_ventas()')
        const [productos] = await db.query('CALL sp_kpi_grafico_productos()')

        // Construimos la respuesta unificada
        return res.status(200).json({
            ventas_mes: ventas[0],
            top_productos: productos[0],
        })
        
    } catch (error) {

        console.error("Error al obtener los gráficos:", error)

        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

module.exports = {
    getKpis,
    getcharts
}
